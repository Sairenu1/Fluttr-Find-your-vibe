package com.sparkmate.repository;

import com.sparkmate.model.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface ProfileRepository extends JpaRepository<Profile, Long> {
    Optional<Profile> findByUserId(Long userId);

    @Query("SELECT p FROM Profile p WHERE " +
            "p.user.id != :userId AND " +
            "p.user.isActive = true AND " +
            "p.profileCompleted = true AND " +
            "p.gender = :lookingForGender AND " +
            "p.lookingForGender = :userGender AND " +
            "p.user.id NOT IN (SELECT s.swiped.id FROM Swipe s WHERE s.swiper.id = :userId) AND " +
            "p.user.id NOT IN (SELECT b.blocked.id FROM Block b WHERE b.blocker.id = :userId) AND " +
            "p.user.id NOT IN (SELECT b.blocker.id FROM Block b WHERE b.blocked.id = :userId)")
    List<Profile> findPotentialMatches(
            @Param("userId") Long userId,
            @Param("lookingForGender") Profile.Gender lookingForGender,
            @Param("userGender") Profile.Gender userGender);
}
