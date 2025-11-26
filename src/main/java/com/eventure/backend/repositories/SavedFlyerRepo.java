package com.eventure.backend.repositories;

import com.eventure.backend.entities.SavedFlyers;
import com.eventure.backend.entities.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.eventure.backend.repositories.SavedFlyerId;






public interface SavedFlyerRepo extends JpaRepository<SavedFlyers, Long> {

    List<SavedFlyers> findByUserId(Long userId);
    List<SavedFlyers> findByFlyerId(Long flyerId);
    void deleteByUserIdAndFlyerId(Long userId, Long flyerId);
    long count();
    <S extends SavedFlyers> S save(S entity);
}

