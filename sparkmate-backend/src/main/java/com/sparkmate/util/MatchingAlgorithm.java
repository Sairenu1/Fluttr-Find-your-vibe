package com.sparkmate.util;

import com.sparkmate.model.Profile;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
public class MatchingAlgorithm {

    /**
     * Calculate compatibility score between two profiles (0-100)
     */
    public double calculateCompatibility(Profile profile1, Profile profile2) {
        double score = 0.0;

        // Interest matching (40%)
        score += calculateInterestMatch(profile1.getInterests(), profile2.getInterests()) * 0.4;

        // Vibe matching (40%)
        score += calculateVibeMatch(profile1, profile2) * 0.4;

        // Location proximity (20%)
        if (profile1.getLatitude() != null && profile2.getLatitude() != null) {
            double distance = calculateDistance(
                    profile1.getLatitude(), profile1.getLongitude(),
                    profile2.getLatitude(), profile2.getLongitude());
            score += calculateDistanceScore(distance) * 0.2;
        } else {
            score += 50 * 0.2; // Neutral score if location unknown
        }

        return Math.round(score * 10.0) / 10.0;
    }

    private double calculateInterestMatch(Set<String> interests1, Set<String> interests2) {
        if (interests1 == null || interests2 == null || interests1.isEmpty() || interests2.isEmpty()) {
            return 50.0; // Neutral score
        }

        Set<String> common = interests1.stream()
                .filter(interests2::contains)
                .collect(java.util.stream.Collectors.toSet());

        int totalUnique = interests1.size() + interests2.size() - common.size();

        return totalUnique > 0 ? (common.size() * 100.0) / totalUnique : 0.0;
    }

    private double calculateVibeMatch(Profile profile1, Profile profile2) {
        if (!profile1.getVibeCheckCompleted() || !profile2.getVibeCheckCompleted()) {
            return 50.0; // Neutral score
        }

        double adventurousDiff = Math.abs(profile1.getVibeAdventurous() - profile2.getVibeAdventurous());
        double intellectualDiff = Math.abs(profile1.getVibeIntellectual() - profile2.getVibeIntellectual());
        double socialDiff = Math.abs(profile1.getVibeSocial() - profile2.getVibeSocial());
        double creativeDiff = Math.abs(profile1.getVibeCreative() - profile2.getVibeCreative());
        double fitnessDiff = Math.abs(profile1.getVibeFitness() - profile2.getVibeFitness());

        double avgDiff = (adventurousDiff + intellectualDiff + socialDiff + creativeDiff + fitnessDiff) / 5.0;

        // Lower difference = higher score (inverted scale)
        return 100.0 - (avgDiff * 10.0);
    }

    private double calculateDistanceScore(double distanceKm) {
        // Closer = better score
        if (distanceKm <= 5)
            return 100.0;
        if (distanceKm <= 10)
            return 90.0;
        if (distanceKm <= 25)
            return 70.0;
        if (distanceKm <= 50)
            return 50.0;
        if (distanceKm <= 100)
            return 30.0;
        return 10.0;
    }

    /**
     * Calculate distance between two points using Haversine formula
     * Returns distance in kilometers
     */
    public double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        final int R = 6371; // Radius of the Earth in km

        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);

        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                        * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c;
    }
}