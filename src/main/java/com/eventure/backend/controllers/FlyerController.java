package com.eventure.backend.controllers;

import com.eventure.backend.entities.Flyers;
import com.eventure.backend.services.FlyerServices;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class FlyerController {
	
	private final FlyerServices flyerServices;
	
	public FlyerController(FlyerServices flyerServices){
		this.flyerServices = flyerServices;
	}
	
	@GetMapping("/flyers")
	public ResponseEntity<List<Flyers>> getAllFlyers() {
		return ResponseEntity.ok(flyerServices.getAllFlyers());
	}
	
	@GetMapping("/flyers/{id}")
	public ResponseEntity<Flyers> getFlyerById(@PathVariable Long id) {
		Optional<Flyers> flyer = flyerServices.getFlyerById(id);
		return flyer.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
	}
	
	@PostMapping("/flyers")
	public ResponseEntity<Flyers> createFlyer(@RequestBody Flyers flyer) {
		Flyers savedFlyer = flyerServices.createFlyer(flyer);
		return ResponseEntity.status(HttpStatus.CREATED).body(savedFlyer);
	}
	
	@PutMapping("/flyers/{id}")
	public ResponseEntity<Flyers> updateFlyer(@PathVariable Long id, @RequestBody Flyers flyer) {
		flyer.setId(id);
		Flyers updatedFlyer = flyerServices.updateFlyer(flyer);
		return ResponseEntity.ok(updatedFlyer);
	}
	
	@DeleteMapping("/flyers/{id}")
	public ResponseEntity<Void> deleteFlyer(@PathVariable Long id) {
		flyerServices.deleteFlyer(id);
		return ResponseEntity.noContent().build();
	}
	
	@GetMapping("/flyers/popular")
	public ResponseEntity<List<Flyers>> getPopularFlyers() {
		return ResponseEntity.ok(flyerServices.getPopularFlyers());
	}
	
	@PostMapping("/flyers/update-popularity")
	public ResponseEntity<String> updatePopularityScores() {
		flyerServices.updateAllPopularityScores();
		return ResponseEntity.ok("Popularity scores updated successfully");
	}
	
	@GetMapping("/flyers/trending")
	public ResponseEntity<List<Flyers>> getTrendingFlyers() {
		return ResponseEntity.ok(flyerServices.getTrendingFlyers());
	}
}