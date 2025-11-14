package com.sparkmate.repository;

import com.sparkmate.model.UserAnalytics;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserAnalyticsRepository extends JpaRepository<UserAnalytics, Long> {
    Optional<UserAnalytics> findByUserId(Long userId);
}