package com.eventure.backend.repositories;

import com.eventure.backend.entities.Flyers;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface FlyerRepo extends JpaRepository<Flyers, Long> {

    Optional<Flyers> findById(Long id);
    List<Flyers> findByOrgId(Long OrgId);
    long count();
    <S extends Flyers> S save(S entity);
}

