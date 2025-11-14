package com.sparkmate.service;

import com.sparkmate.dto.request.ProfileUpdateRequest;
import com.sparkmate.dto.request.VibeCheckRequest;
import com.sparkmate.dto.response.ProfileResponse;
import com.sparkmate.exception.ResourceNotFoundException;
import com.sparkmate.model.Profile;
import com.sparkmate.model.User;
import com.sparkmate.repository.ProfileRepository;
import com.sparkmate.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;

    public ProfileResponse getProfile(Long userId) {
        Profile profile = profileRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Profile not found"));

        return mapToProfileResponse(profile);
    }

    @Transactional
    public ProfileResponse updateProfile(Long userId, ProfileUpdateRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Profile profile = profileRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Profile not found"));

        // Update user name if provided
        if (request.getName() != null) {
            user.setName(request.getName());
            userRepository.save(user);
        }

        // Update profile fields
        if (request.getDateOfBirth() != null) {
            profile.setDateOfBirth(request.getDateOfBirth());
            profile.setAge(profile.calculateAge());
        }
        if (request.getGender() != null)
            profile.setGender(request.getGender());
        if (request.getBio() != null)
            profile.setBio(request.getBio());
        if (request.getQuote() != null)
            profile.setQuote(request.getQuote());
        if (request.getOccupation() != null)
            profile.setOccupation(request.getOccupation());
        if (request.getEducation() != null)
            profile.setEducation(request.getEducation());
        if (request.getLocation() != null)
            profile.setLocation(request.getLocation());
        if (request.getCity() != null)
            profile.setCity(request.getCity());
        if (request.getCountry() != null)
            profile.setCountry(request.getCountry());
        if (request.getLatitude() != null)
            profile.setLatitude(request.getLatitude());
        if (request.getLongitude() != null)
            profile.setLongitude(request.getLongitude());
        if (request.getProfilePicture() != null)
            profile.setProfilePicture(request.getProfilePicture());
        if (request.getPhotos() != null)
            profile.setPhotos(request.getPhotos());
        if (request.getInterests() != null)
            profile.setInterests(request.getInterests());

        // Update preferences
        if (request.getLookingForGender() != null)
            profile.setLookingForGender(request.getLookingForGender());
        if (request.getMinAgePreference() != null)
            profile.setMinAgePreference(request.getMinAgePreference());
        if (request.getMaxAgePreference() != null)
            profile.setMaxAgePreference(request.getMaxAgePreference());
        if (request.getMaxDistanceKm() != null)
            profile.setMaxDistanceKm(request.getMaxDistanceKm());

        // Check if profile is completed
        boolean isCompleted = profile.getGender() != null &&
                profile.getDateOfBirth() != null &&
                profile.getLookingForGender() != null &&
                profile.getBio() != null && !profile.getBio().isEmpty();

        profile.setProfileCompleted(isCompleted);

        profile = profileRepository.save(profile);

        return mapToProfileResponse(profile);
    }

    @Transactional
    public ProfileResponse completeVibeCheck(Long userId, VibeCheckRequest request) {
        Profile profile = profileRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Profile not found"));

        profile.setVibeAdventurous(request.getVibeAdventurous());
        profile.setVibeIntellectual(request.getVibeIntellectual());
        profile.setVibeSocial(request.getVibeSocial());
        profile.setVibeCreative(request.getVibeCreative());
        profile.setVibeFitness(request.getVibeFitness());
        profile.setVibeCheckCompleted(true);

        profile = profileRepository.save(profile);

        return mapToProfileResponse(profile);
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
                .lookingForGender(profile.getLookingForGender())
                .minAgePreference(profile.getMinAgePreference())
                .maxAgePreference(profile.getMaxAgePreference())
                .maxDistanceKm(profile.getMaxDistanceKm())
                .vibeAdventurous(profile.getVibeAdventurous())
                .vibeIntellectual(profile.getVibeIntellectual())
                .vibeSocial(profile.getVibeSocial())
                .vibeCreative(profile.getVibeCreative())
                .vibeFitness(profile.getVibeFitness())
                .profileCompleted(profile.getProfileCompleted())
                .vibeCheckCompleted(profile.getVibeCheckCompleted())
                .build();
    }
}
