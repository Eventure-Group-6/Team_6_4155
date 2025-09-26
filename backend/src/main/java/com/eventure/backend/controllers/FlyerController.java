package com.eventure.backend.controllers;




import com.eventure.backend.entities.Flyers;
import com.eventure.backend.services.FlyerServices;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api")
public class FlyerController {
	
	private final FlyerServices flyerServices;
	

	
	public FlyerController(FlyerServices flyerServices){
		this.flyerServices = flyerServices;

	}
	
	//Endpoints for frontend go here
	//GET		@GetMapping("/")
	//POST  	@PostMapping("/")
	//PUT   	@PutMapping("/")
	//DELETE	@DeleteMapping("/")
	
	
}