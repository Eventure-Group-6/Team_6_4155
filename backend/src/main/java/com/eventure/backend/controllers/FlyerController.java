package com.eventure.backend.controllers;

import com.eventure.backend.entities.Flyers;
import com.eventure.backend.services.FlyerServices;
import com.eventure.backend.services.UserFeedServices;

import jakarta.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class FlyerController {
	
	private final FlyerServices flyerServices;
	private final UserFeedServices userFeedServices;
	
	public FlyerController(FlyerServices flyerServices, UserFeedServices userFeedServices){
		this.flyerServices = flyerServices;
		this.userFeedServices = userFeedServices;
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
	public ResponseEntity<Flyers> createFlyer(@RequestBody Flyers flyer, @RequestParam("file") MultipartFile file) throws IOException {
		Flyers createdFlyer = flyerServices.createFlyer(flyer, file);
		return ResponseEntity.status(HttpStatus.CREATED).body(createdFlyer);
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
	
	@GetMapping("/flyers/popularPage")
	public ResponseEntity<List<Flyers>> getPopularFlyers( @RequestParam int page, @RequestParam int size) {

	    List<Flyers> flyers = flyerServices.getPopularFlyers(page, size);
	    return ResponseEntity.ok(flyers);
	}

	
	@PostMapping("/flyers/{flyerId}/save")
	public ResponseEntity<String> saveFlyer(@PathVariable Long flyerId, HttpSession session) {
	    Long userId = (Long) session.getAttribute("userId");
	    if (userId == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
	    flyerServices.saveFlyer(userId, flyerId);
	    return ResponseEntity.ok("Flyer saved");
	}
	
	@DeleteMapping("/flyers/{flyerId}/save")
	public ResponseEntity<String> unsaveFlyer(@PathVariable Long flyerId, HttpSession session) {
	    Long userId = (Long) session.getAttribute("userId");
	    if (userId == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
	    flyerServices.unsaveFlyer(userId, flyerId);
	    return ResponseEntity.ok("Flyer unsaved");
	}
	
	@GetMapping("/flyers/saved")
	public ResponseEntity<List<Flyers>> getSavedFlyers(HttpSession session) {
	    Long userId = (Long) session.getAttribute("userId");
	    if (userId == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
	    return ResponseEntity.ok(flyerServices.getSavedFlyers(userId));
	}
	
    @GetMapping("/favorites")
    public ResponseEntity<List<Flyers>> getFavoriteFeed(HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        
        List<Long> orgIds = userFeedServices.getFollowedOrgs(userId);
        List<Flyers> flyers = userFeedServices.getFlyerList(orgIds);

        return ResponseEntity.ok(flyers);
    }
    
    @GetMapping("/flyers/{flyerId}/image")
    public ResponseEntity<Resource> getFlyerImage(@PathVariable Long flyerId) throws IOException {

        Flyers flyer = flyerServices.getFlyerById(flyerId).orElseThrow(() -> new RuntimeException("Flyer not found"));

        Path path = flyerServices.getFlyerPath(flyer); 

        Resource file = new UrlResource(path.toUri());
        if (!file.exists()) {
            return ResponseEntity.notFound().build();
        }

        String contentType = Files.probeContentType(path);
        if (contentType == null) {
            contentType = "application/octet-stream";
        }
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .body(file);
    }



}