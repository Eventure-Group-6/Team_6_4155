package com.eventure.backend.services;

import com.eventure.backend.entities.Org;
import com.eventure.backend.entities.Users;
import com.eventure.backend.repositories.UserRepo;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UserServices {
	
	private final UserRepo userRepo;
	
	public UserServices(UserRepo userRepo) {
		this.userRepo = userRepo;
	}
	
	public Users createUser(Users user) {
		return userRepo.save(user);
	}
	
	public List<Users> getAllUsers() {
		return userRepo.findAll();
	}
	
	public Optional<Users> getUserById(Long id) {
		return userRepo.findById(id);
	}
	
	public Users updateUser(Users user) {
		return userRepo.save(user);
	}
	
	public void deleteUser(Long id) {
		userRepo.deleteById(id);
	}
	
	public boolean signUpErrorUsername(Users user) {
		return userRepo.existsByUsername(user.getUsername());
	}
	
	public boolean signUpErrorEmail(Users user) {
		return userRepo.existsByEmail(user.getEmail());
	}
	
	
	public Optional<Users> authenticateUser(String email, String password) {
		Optional<Users> user = userRepo.findByEmail(email);
		if (user.isPresent() && user.get().getPassword().equals(password)) {
			return user;
		}
		return Optional.empty();
	}
	
	public Boolean existsByEmail(String email) {
		return userRepo.existsByEmail(email);
	}
	
	
	
}
