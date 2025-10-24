package com.eventure.backend.repositories;

import com.eventure.backend.entities.UserFeed;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface UserFeedRepo extends JpaRepository<UserFeed, Long> {

    Optional<UserFeed> findById(Long id);
    List<UserFeed> findByUserId(Long userId);
    List<UserFeed> findByFlyerId(Long flyerId);
    long count();
    <S extends UserFeed> S save(S entity);
}

