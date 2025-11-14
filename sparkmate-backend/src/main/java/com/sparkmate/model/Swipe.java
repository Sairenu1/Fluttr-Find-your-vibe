package com.sparkmate.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "swipes", uniqueConstraints = {
        @UniqueConstraint(columnNames = { "swiper_id", "swiped_id" })
})
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Swipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "swiper_id", nullable = false)
    private User swiper;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "swiped_id", nullable = false)
    private User swiped;

    @Enumerated(EnumType.STRING)
    private SwipeType type;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    public enum SwipeType {
        LIKE, PASS, SUPER_LIKE
    }
}