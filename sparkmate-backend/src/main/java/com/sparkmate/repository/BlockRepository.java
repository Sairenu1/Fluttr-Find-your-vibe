package com.sparkmate.repository;

import com.sparkmate.model.Block;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface BlockRepository extends JpaRepository<Block, Long> {
    Boolean existsByBlockerIdAndBlockedId(Long blockerId, Long blockedId);

    List<Block> findByBlockerId(Long blockerId);

    Optional<Block> findByBlockerIdAndBlockedId(Long blockerId, Long blockedId);
}