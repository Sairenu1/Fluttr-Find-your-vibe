package com.sparkmate.dto.response;

import com.sparkmate.model.Profile;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MatchResponse {
    private Long matchId;
    private ProfileResponse matchedUser;
    private LocalDateTime matchedAt;
    private String lastMessage;
    private LocalDateTime lastMessageAt;
    private Long unreadCount;
    private Double compatibilityScore;
}