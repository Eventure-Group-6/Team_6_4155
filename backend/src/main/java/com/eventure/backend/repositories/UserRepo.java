package com.eventure.backend.repositories;

import com.eventure.backend.entities.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepo extends JpaRepository<Users, Long> {
	
	Optional<Users> findById(Long id);
	Optional<Users>	findByUsername(String username);
	Boolean existsByEmail(String email);
	long count();
	<S extends Users> S save(S entity);

	
}
