package com.sparkmate.dto.request;

import com.sparkmate.model.Profile;
import lombok.*;
import java.time.LocalDate;
import java.util.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProfileUpdateRequest {
    private String name;
    private LocalDate dateOfBirth;
    private Profile.Gender gender;
    private String bio;
    private String quote;
    private String occupation;
    private String education;
    private String location;
    private String city;
    private String country;
    private Double latitude;
    private Double longitude;
    private String profilePicture;
    private List<String> photos;
    private Set<String> interests;
    private Profile.Gender lookingForGender;
    private Integer minAgePreference;
    private Integer maxAgePreference;
    private Integer maxDistanceKm;
}
