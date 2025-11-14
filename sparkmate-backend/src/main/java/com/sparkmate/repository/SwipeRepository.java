package com.sparkmate.repository;

import com.sparkmate.model.Swipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface SwipeRepository extends JpaRepository<Swipe, Long> {
    Optional<Swipe> findBySwiperIdAndSwipedId(Long swiperId, Long swipedId);

    Boolean existsBySwiperIdAndSwipedIdAndType(Long swiperId, Long swipedId, Swipe.SwipeType type);
}