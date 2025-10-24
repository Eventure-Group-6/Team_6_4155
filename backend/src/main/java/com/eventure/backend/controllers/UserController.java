package com.eventure.backend.controllers;

import com.eventure.backend.entities.Users;
import com.eventure.backend.services.UserServices;
import com.eventure.backend.services.UserFeedServices;
import com.eventure.backend.services.SavedFlyerServices;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import jakarta.servlet.http.HttpSession;
import java.util.List;
import java.util.Optional;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class UserController {
	
	private final UserServices userServices;
	private final UserFeedServices userFeedServices;
	private final SavedFlyerServices savedFlyerServices;
	
	public UserController(UserServices userServices, UserFeedServices userFeedServices, SavedFlyerServices savedFlyerServices){
		this.userServices = userServices;
		this.userFeedServices = userFeedServices;
		this.savedFlyerServices = savedFlyerServices;
	}
	
	@PostMapping("/login")
	public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> credentials, HttpSession session) {
		String email = credentials.get("email");
		String password = credentials.get("password");
		
		Optional<Users> user = userServices.authenticateUser(email, password);
		Map<String, Object> response = new HashMap<>();
		
		if (user.isPresent()) {
			session.setAttribute("userId", user.get().getId());
			session.setAttribute("username", user.get().getUsername());
			response.put("success", true);
			response.put("user", user.get());
			return ResponseEntity.ok(response);
		} else {
			response.put("success", false);
			response.put("message", "Invalid credentials");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
		}
	}
	
	@PostMapping("/signup")
	public ResponseEntity<Map<String, Object>> signup(@RequestBody Users user) {
		Map<String, Object> response = new HashMap<>();
		
		if (userServices.existsByEmail(user.getEmail())) {
			response.put("success", false);
			response.put("message", "Email already exists");
			return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
		}
		
		Users savedUser = userServices.createUser(user);
		response.put("success", true);
		response.put("user", savedUser);
		return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}
	
	@PostMapping("/logout")
	public ResponseEntity<Map<String, String>> logout(HttpSession session) {
		session.invalidate();
		Map<String, String> response = new HashMap<>();
		response.put("message", "Logged out successfully");
		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/users")
	public ResponseEntity<List<Users>> getAllUsers() {
		return ResponseEntity.ok(userServices.getAllUsers());
	}
	
	@GetMapping("/users/{id}")
	public ResponseEntity<Users> getUserById(@PathVariable Long id) {
		Optional<Users> user = userServices.getUserById(id);
		return user.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
	}
	
	@PutMapping("/users/{id}")
	public ResponseEntity<Users> updateUser(@PathVariable Long id, @RequestBody Users user) {
		user.setId(id);
		Users updatedUser = userServices.updateUser(user);
		return ResponseEntity.ok(updatedUser);
	}
	
	@DeleteMapping("/users/{id}")
	public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
		userServices.deleteUser(id);
		return ResponseEntity.noContent().build();
	}
	
	@GetMapping("/session")
	public ResponseEntity<Map<String, Object>> getSession(HttpSession session) {
		Map<String, Object> response = new HashMap<>();
		Long userId = (Long) session.getAttribute("userId");
		
		if (userId != null) {
			response.put("authenticated", true);
			response.put("userId", userId);
			response.put("username", session.getAttribute("username"));
		} else {
			response.put("authenticated", false);
		}
		
		return ResponseEntity.ok(response);
	}
}
