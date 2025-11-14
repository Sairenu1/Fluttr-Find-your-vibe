package com.sparkmate.service;

import com.sparkmate.dto.response.NotificationResponse;
import com.sparkmate.model.Notification;
import com.sparkmate.model.Profile;
import com.sparkmate.model.User;
import com.sparkmate.repository.NotificationRepository;
import com.sparkmate.repository.ProfileRepository;
import com.sparkmate.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;

    public void sendMatchNotification(Long userId, Long matchedUserId, Long matchId) {
        User user = userRepository.findById(userId).orElse(null);
        Profile matchedProfile = profileRepository.findByUserId(matchedUserId).orElse(null);

        if (user != null && matchedProfile != null) {
            Notification notification = Notification.builder()
                    .user(user)
                    .type(Notification.NotificationType.NEW_MATCH)
                    .title("New Match!")
                    .message("You matched with " + matchedProfile.getUser().getName())
                    .relatedUserId(matchedUserId)
                    .relatedMatchId(matchId)
                    .isRead(false)
                    .build();

            notificationRepository.save(notification);
        }
    }

    public void sendMessageNotification(Long userId, Long senderId, Long matchId) {
        User user = userRepository.findById(userId).orElse(null);
        User sender = userRepository.findById(senderId).orElse(null);

        if (user != null && sender != null) {
            Notification notification = Notification.builder()
                    .user(user)
                    .type(Notification.NotificationType.NEW_MESSAGE)
                    .title("New Message")
                    .message(sender.getName() + " sent you a message")
                    .relatedUserId(senderId)
                    .relatedMatchId(matchId)
                    .isRead(false)
                    .build();

            notificationRepository.save(notification);
        }
    }

    public List<NotificationResponse> getUserNotifications(Long userId) {
        List<Notification> notifications = notificationRepository.findByUserIdOrderByCreatedAtDesc(userId);

        return notifications.stream()
                .map(this::mapToNotificationResponse)
                .collect(Collectors.toList());
    }

    public Long getUnreadCount(Long userId) {
        return notificationRepository.countUnreadNotifications(userId);
    }

    public void markAsRead(Long notificationId) {
        Notification notification = notificationRepository.findById(notificationId).orElse(null);
        if (notification != null) {
            notification.setIsRead(true);
            notificationRepository.save(notification);
        }
    }

    private NotificationResponse mapToNotificationResponse(Notification notification) {
        Profile relatedProfile = null;
        if (notification.getRelatedUserId() != null) {
            relatedProfile = profileRepository.findByUserId(notification.getRelatedUserId()).orElse(null);
        }

        return NotificationResponse.builder()
                .id(notification.getId())
                .type(notification.getType().name())
                .title(notification.getTitle())
                .message(notification.getMessage())
                .relatedUserId(notification.getRelatedUserId())
                .relatedUserName(relatedProfile != null ? relatedProfile.getUser().getName() : null)
                .relatedUserPhoto(relatedProfile != null ? relatedProfile.getProfilePicture() : null)
                .relatedMatchId(notification.getRelatedMatchId())
                .isRead(notification.getIsRead())
                .createdAt(notification.getCreatedAt())
                .build();
    }
}