package com.eventure.backend.controllers;




import com.eventure.backend.entities.Org;
import com.eventure.backend.services.OrgServices;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api")
public class OrgController {
	
	private final OrgServices orgServices;
	

	
	public OrgController(OrgServices orgServices){
		this.orgServices = orgServices;

	}
	
	//Endpoints for frontend go here
	//GET		@GetMapping("/")
	//POST  	@PostMapping("/")
	//PUT   	@PutMapping("/")
	//DELETE	@DeleteMapping("/")
	
	
}