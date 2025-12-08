package com.sparkmate.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.*;

@Entity
@Table(name = "profiles")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Profile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private Integer age;
    private LocalDate dateOfBirth;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column(length = 2000)
    private String bio;

    @Column(length = 500)
    private String quote;

    private String occupation;
    private String education;
    private String location;
    private String city;
    private String country;

    private Double latitude;
    private Double longitude;

    private String profilePicture;

    @ElementCollection
    @CollectionTable(name = "profile_photos", joinColumns = @JoinColumn(name = "profile_id"))
    @Column(name = "photo_url")
    @Builder.Default
    private List<String> photos = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "profile_interests", joinColumns = @JoinColumn(name = "profile_id"))
    @Column(name = "interest")
    @Builder.Default
    private Set<String> interests = new HashSet<>();

    @Enumerated(EnumType.STRING)
    private Gender lookingForGender;

    @Builder.Default
    private Integer minAgePreference = 18;

    @Builder.Default
    private Integer maxAgePreference = 99;

    @Builder.Default
    private Integer maxDistanceKm = 50;

    private Integer vibeAdventurous;
    private Integer vibeIntellectual;
    private Integer vibeSocial;
    private Integer vibeCreative;
    private Integer vibeFitness;

    @Builder.Default
    private Boolean profileCompleted = false;

    @Builder.Default
    private Boolean vibeCheckCompleted = false;

    public Integer calculateAge() {
        if (dateOfBirth == null) {
            return null;
        }
        return java.time.Period.between(dateOfBirth, java.time.LocalDate.now()).getYears();
    }

    public enum Gender {
        MALE, FEMALE, NON_BINARY, OTHER
    }
}
