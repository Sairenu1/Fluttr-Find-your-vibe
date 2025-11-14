package com.sparkmate.repository;

import com.sparkmate.model.Match;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface MatchRepository extends JpaRepository<Match, Long> {
    @Query("SELECT m FROM Match m WHERE " +
            "(m.user1.id = :userId OR m.user2.id = :userId) AND " +
            "m.isActive = true ORDER BY m.lastMessageAt DESC NULLS LAST")
    List<Match> findActiveMatchesByUserId(@Param("userId") Long userId);

    @Query("SELECT m FROM Match m WHERE " +
            "((m.user1.id = :user1Id AND m.user2.id = :user2Id) OR " +
            "(m.user1.id = :user2Id AND m.user2.id = :user1Id)) AND " +
            "m.isActive = true")
    Optional<Match> findMatchBetweenUsers(@Param("user1Id") Long user1Id, @Param("user2Id") Long user2Id);
}
