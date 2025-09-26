package com.eventure.backend.controllers;

import com.eventure.backend.entities.Users;
import com.eventure.backend.services.UserServices;
import com.eventure.backend.services.UserFeedServices;
import com.eventure.backend.services.SavedFlyerServices;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api")
public class UserController {
	
	private final UserServices userServices;
	private final UserFeedServices userFeedServices;
	private final SavedFlyerServices savedFlyerServices;
	
	public UserController(UserServices userServices, UserFeedServices userFeedServices, SavedFlyerServices savedFlyerServices){
		this.userServices = userServices;
		this.userFeedServices = userFeedServices;
		this.savedFlyerServices = savedFlyerServices;
	}
	
	//Endpoints for frontend go here
	//GET		@GetMapping("/")
	//POST  	@PostMapping("/")
	//PUT   	@PutMapping("/")
	//DELETE	@DeleteMapping("/")
	
	
}
