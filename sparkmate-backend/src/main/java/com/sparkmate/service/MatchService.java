package com.sparkmate.service;

import com.sparkmate.dto.request.SwipeRequest;
import com.sparkmate.dto.response.MatchResponse;
import com.sparkmate.dto.response.ProfileResponse;
import com.sparkmate.dto.response.SwipeResultResponse;
import com.sparkmate.exception.BadRequestException;
import com.sparkmate.exception.ResourceNotFoundException;
import com.sparkmate.model.*;
import com.sparkmate.repository.*;
import com.sparkmate.util.MatchingAlgorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MatchService {

    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;
    private final SwipeRepository swipeRepository;
    private final MatchRepository matchRepository;
    private final BlockRepository blockRepository;
    private final UserAnalyticsRepository analyticsRepository;
    private final NotificationService notificationService;
    private final MatchingAlgorithm matchingAlgorithm;

    public List<ProfileResponse> getPotentialMatches(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Profile userProfile = profileRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Profile not found"));

        if (!userProfile.getProfileCompleted()) {
            throw new BadRequestException("Please complete your profile first");
        }

        List<Profile> potentialMatches = profileRepository.findPotentialMatches(
                userId,
                userProfile.getLookingForGender(),
                userProfile.getGender());

        // Calculate compatibility scores and filter by distance
        return potentialMatches.stream()
                .map(profile -> {
                    ProfileResponse response = mapToProfileResponse(profile);

                    // Calculate compatibility
                    double compatibility = matchingAlgorithm.calculateCompatibility(userProfile, profile);
                    response.setCompatibilityScore(compatibility);

                    // Calculate distance if both have coordinates
                    if (userProfile.getLatitude() != null && profile.getLatitude() != null) {
                        double distance = matchingAlgorithm.calculateDistance(
                                userProfile.getLatitude(), userProfile.getLongitude(),
                                profile.getLatitude(), profile.getLongitude());
                        response.setDistance(distance);

                        // Filter by max distance preference
                        if (distance > userProfile.getMaxDistanceKm()) {
                            return null;
                        }
                    }

                    return response;
                })
                .filter(profile -> profile != null)
                .sorted((p1, p2) -> Double.compare(p2.getCompatibilityScore(), p1.getCompatibilityScore()))
                .limit(20)
                .collect(Collectors.toList());
    }

    @Transactional
    public SwipeResultResponse swipe(Long userId, SwipeRequest request) {
        User swiper = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        User swiped = userRepository.findById(request.getTargetUserId())
                .orElseThrow(() -> new ResourceNotFoundException("Target user not found"));

        // Check if already swiped
        if (swipeRepository.findBySwiperIdAndSwipedId(userId, request.getTargetUserId()).isPresent()) {
            throw new BadRequestException("You have already swiped on this user");
        }

        // Check if blocked
        if (blockRepository.existsByBlockerIdAndBlockedId(userId, request.getTargetUserId()) ||
                blockRepository.existsByBlockerIdAndBlockedId(request.getTargetUserId(), userId)) {
            throw new BadRequestException("Cannot swipe on this user");
        }

        // Create swipe
        Swipe.SwipeType swipeType;
        try {
            swipeType = Swipe.SwipeType.valueOf(request.getSwipeType().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Invalid swipe type");
        }

        Swipe swipe = Swipe.builder()
                .swiper(swiper)
                .swiped(swiped)
                .type(swipeType)
                .build();

        swipeRepository.save(swipe);

        // Update analytics
        updateSwipeAnalytics(userId, request.getTargetUserId(), swipeType);

        // Check if it's a match (both users liked each other)
        if (swipeType == Swipe.SwipeType.LIKE || swipeType == Swipe.SwipeType.SUPER_LIKE) {
            boolean isMatch = swipeRepository.existsBySwiperIdAndSwipedIdAndType(
                    request.getTargetUserId(), userId, Swipe.SwipeType.LIKE)
                    || swipeRepository.existsBySwiperIdAndSwipedIdAndType(
                            request.getTargetUserId(), userId, Swipe.SwipeType.SUPER_LIKE);

            if (isMatch) {
                // Create match
                Profile userProfile = profileRepository.findByUserId(userId).orElse(null);
                Profile swipedProfile = profileRepository.findByUserId(request.getTargetUserId()).orElse(null);

                double compatibility = 0.0;
                if (userProfile != null && swipedProfile != null) {
                    compatibility = matchingAlgorithm.calculateCompatibility(userProfile, swipedProfile);
                }

                Match match = Match.builder()
                        .user1(swiper)
                        .user2(swiped)
                        .isActive(true)
                        .compatibilityScore(compatibility)
                        .build();

                match = matchRepository.save(match);

                // Update analytics
                updateMatchAnalytics(userId, request.getTargetUserId());

                // Send notifications
                notificationService.sendMatchNotification(userId, request.getTargetUserId(), match.getId());
                notificationService.sendMatchNotification(request.getTargetUserId(), userId, match.getId());

                // Return match result
                ProfileResponse matchedProfile = mapToProfileResponse(swipedProfile);
                matchedProfile.setCompatibilityScore(compatibility);

                return SwipeResultResponse.builder()
                        .isMatch(true)
                        .matchId(match.getId())
                        .matchedProfile(matchedProfile)
                        .message("It's a match! 🎉")
                        .build();
            }
        }

        return SwipeResultResponse.builder()
                .isMatch(false)
                .message(swipeType == Swipe.SwipeType.LIKE ? "Like sent!" : "Passed")
                .build();
    }

    public List<MatchResponse> getMatches(Long userId) {
        List<Match> matches = matchRepository.findActiveMatchesByUserId(userId);

        return matches.stream()
                .map(match -> {
                    // Determine which user is the matched user
                    User matchedUser = match.getUser1().getId().equals(userId) ? match.getUser2() : match.getUser1();

                    Profile matchedProfile = profileRepository.findByUserId(matchedUser.getId()).orElse(null);

                    ProfileResponse profileResponse = matchedProfile != null ? mapToProfileResponse(matchedProfile)
                            : null;

                    return MatchResponse.builder()
                            .matchId(match.getId())
                            .matchedUser(profileResponse)
                            .matchedAt(match.getMatchedAt())
                            .lastMessageAt(match.getLastMessageAt())
                            .compatibilityScore(match.getCompatibilityScore())
                            .build();
                })
                .collect(Collectors.toList());
    }

    private void updateSwipeAnalytics(Long swiperId, Long swipedId, Swipe.SwipeType type) {
        if (type == Swipe.SwipeType.LIKE || type == Swipe.SwipeType.SUPER_LIKE) {
            // Update swiper analytics
            UserAnalytics swiperAnalytics = analyticsRepository.findByUserId(swiperId).orElse(null);
            if (swiperAnalytics != null) {
                swiperAnalytics.setTotalLikesSent(swiperAnalytics.getTotalLikesSent() + 1);
                analyticsRepository.save(swiperAnalytics);
            }

            // Update swiped user analytics
            UserAnalytics swipedAnalytics = analyticsRepository.findByUserId(swipedId).orElse(null);
            if (swipedAnalytics != null) {
                swipedAnalytics.setTotalLikesReceived(swipedAnalytics.getTotalLikesReceived() + 1);
                if (type == Swipe.SwipeType.SUPER_LIKE) {
                    swipedAnalytics.setSuperLikesReceived(swipedAnalytics.getSuperLikesReceived() + 1);
                }
                analyticsRepository.save(swipedAnalytics);
            }
        }
    }

    private void updateMatchAnalytics(Long user1Id, Long user2Id) {
        UserAnalytics analytics1 = analyticsRepository.findByUserId(user1Id).orElse(null);
        if (analytics1 != null) {
            analytics1.setTotalMatches(analytics1.getTotalMatches() + 1);
            analyticsRepository.save(analytics1);
        }

        UserAnalytics analytics2 = analyticsRepository.findByUserId(user2Id).orElse(null);
        if (analytics2 != null) {
            analytics2.setTotalMatches(analytics2.getTotalMatches() + 1);
            analyticsRepository.save(analytics2);
        }
    }

    private ProfileResponse mapToProfileResponse(Profile profile) {
        return ProfileResponse.builder()
                .id(profile.getId())
                .userId(profile.getUser().getId())
                .name(profile.getUser().getName())
                .age(profile.getAge())
                .gender(profile.getGender())
                .bio(profile.getBio())
                .quote(profile.getQuote())
                .occupation(profile.getOccupation())
                .education(profile.getEducation())
                .location(profile.getLocation())
                .city(profile.getCity())
                .profilePicture(profile.getProfilePicture())
                .photos(profile.getPhotos())
                .interests(profile.getInterests())
                .vibeAdventurous(profile.getVibeAdventurous())
                .vibeIntellectual(profile.getVibeIntellectual())
                .vibeSocial(profile.getVibeSocial())
                .vibeCreative(profile.getVibeCreative())
                .vibeFitness(profile.getVibeFitness())
                .build();
    }
}