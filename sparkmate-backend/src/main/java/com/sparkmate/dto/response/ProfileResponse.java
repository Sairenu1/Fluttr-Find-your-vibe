package com.sparkmate.dto.response;

import com.sparkmate.model.Profile;
import lombok.*;
import java.util.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProfileResponse {
    private Long id;
    private Long userId;
    private String name;
    private Integer age;
    private Profile.Gender gender;
    private String bio;
    private String quote;
    private String occupation;
    private String education;
    private String location;
    private String city;
    private String profilePicture;
    private List<String> photos;
    private Set<String> interests;
    private Profile.Gender lookingForGender;
    private Integer minAgePreference;
    private Integer maxAgePreference;
    private Integer maxDistanceKm;
    private Integer vibeAdventurous;
    private Integer vibeIntellectual;
    private Integer vibeSocial;
    private Integer vibeCreative;
    private Integer vibeFitness;
    private Boolean profileCompleted;
    private Boolean vibeCheckCompleted;
    private Double compatibilityScore;
    private Double distance;
}
