package com.sparkmate.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user_analytics")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserAnalytics {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Builder.Default
    private Integer totalLikesSent = 0;

    @Builder.Default
    private Integer totalLikesReceived = 0;

    @Builder.Default
    private Integer totalMatches = 0;

    @Builder.Default
    private Integer totalMessagesSent = 0;

    @Builder.Default
    private Integer totalMessagesReceived = 0;

    @Builder.Default
    private Integer profileViews = 0;

    @Builder.Default
    private Integer superLikesReceived = 0;
}