package com.sparkmate.dto.response;

import lombok.*;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NotificationResponse {
    private Long id;
    private String type;
    private String title;
    private String message;
    private Long relatedUserId;
    private String relatedUserName;
    private String relatedUserPhoto;
    private Long relatedMatchId;
    private Boolean isRead;
    private LocalDateTime createdAt;
}