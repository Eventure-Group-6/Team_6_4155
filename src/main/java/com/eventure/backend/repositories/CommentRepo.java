package com.eventure.backend.repositories;

import com.eventure.backend.entities.Comments;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface CommentRepo extends JpaRepository<Comments, Long> {
    
    Optional<Comments> findById(Long id);
    List<Comments> findByFlyerId(Long flyerId);
    List<Comments> findByUserId(Long userId);
    long count();
    <S extends Comments> S save(S entity);
}