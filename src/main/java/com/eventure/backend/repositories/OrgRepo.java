package com.eventure.backend.repositories;

import com.eventure.backend.entities.Org;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface OrgRepo extends JpaRepository<Org, Long> {

    Optional<Org> findById(Long id);
    Optional<Org> findByOrgName(String orgName);
    Boolean existsByOrgName(String orgName);
    long count();
    <S extends Org> S save(S entity);
}

