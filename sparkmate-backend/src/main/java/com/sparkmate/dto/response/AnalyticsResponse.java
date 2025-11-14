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
public class AnalyticsResponse {
    private Integer totalLikesSent;
    private Integer totalLikesReceived;
    private Integer totalMatches;
    private Integer totalMessagesSent;
    private Integer totalMessagesReceived;
    private Integer profileViews;
    private Integer superLikesReceived;
}