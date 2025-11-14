package com.sparkmate.controller;

import com.sparkmate.model.Profile;
import com.sparkmate.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UserController {

    private final ProfileRepository profileRepository;

    @GetMapping("/{userId}/profile")
    public ResponseEntity<?> getProfile(@PathVariable Long userId) {
        Profile profile = profileRepository.findByUserId(userId).orElse(null);

        if (profile == null) {
            return ResponseEntity.ok(Map.of(
                    "success", false,
                    "message", "Profile not found"));
        }

        return ResponseEntity.ok(Map.of(
                "success", true,
                "data", Map.of(
                        "id", profile.getId(),
                        "age", profile.getAge() != null ? profile.getAge() : 0,
                        "gender", profile.getGender() != null ? profile.getGender() : "",
                        "bio", profile.getBio() != null ? profile.getBio() : "",
                        "location", profile.getLocation() != null ? profile.getLocation() : "",
                        "profileCompleted", profile.getProfileCompleted())));
    }
}