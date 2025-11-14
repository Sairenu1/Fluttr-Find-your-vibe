package com.sparkmate.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ✅ Added email field for repository and login
    @Column(unique = true, nullable = false)
    private String email;

    // ✅ Email verification flag
    @Builder.Default
    @Column(nullable = false)
    private Boolean emailVerified = false;

    // ✅ Password (store hashed with BCrypt)
    @Column(nullable = false)
    private String password;

    // ✅ User name
    @Column(nullable = false)
    private String name;

    // ✅ User role (USER or ADMIN)
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Role role = Role.USER;

    // ✅ Active status
    @Builder.Default
    private Boolean isActive = true;

    // ✅ Timestamps
    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    // ✅ Last active timestamp
    private LocalDateTime lastActive;

    // ✅ Profile mapping
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Profile profile;

    // ✅ Enum for roles
    public enum Role {
        USER, ADMIN
    }
}
