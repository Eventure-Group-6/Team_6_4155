package com.eventure.backend.controllers;

import com.eventure.backend.entities.Org;
import com.eventure.backend.entities.UserFeed;
import com.eventure.backend.services.OrgServices;
import com.eventure.backend.services.UserFeedServices;

import jakarta.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class OrgController {
	
	private final OrgServices orgServices;
	private final UserFeedServices userFeedServices;
	
	public OrgController(OrgServices orgServices, UserFeedServices userFeedServices){
		this.orgServices = orgServices;
		this.userFeedServices = userFeedServices;
	}
	
	@GetMapping("/orgs")
	public ResponseEntity<List<Org>> getAllOrgs() {
		return ResponseEntity.ok(orgServices.getAllOrgs());
	}
	
	@GetMapping("/orgs/{id}")
	public ResponseEntity<Org> getOrgById(@PathVariable Long id) {
		Optional<Org> org = orgServices.getOrgById(id);
		return org.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
	}
	
	@PostMapping("/orgs")
	public ResponseEntity<Org> createOrg(@RequestBody Org org) {
		Org savedOrg = orgServices.createOrg(org);
		return ResponseEntity.status(HttpStatus.CREATED).body(savedOrg);
	}
	
	@PutMapping("/orgs/{id}")
	public ResponseEntity<Org> updateOrg(@PathVariable Long id, @RequestBody Org org) {
		org.setId(id);
		Org updatedOrg = orgServices.updateOrg(org);
		return ResponseEntity.ok(updatedOrg);
	}
	
	@PostMapping("/orgs/{orgId}/follow")
	public ResponseEntity<Void> followOrg(@PathVariable Long orgId, HttpSession session) {
	    Long userId = (Long) session.getAttribute("userId");
	    if (userId == null) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
	    }

	    userFeedServices.followOrg(userId, orgId);
	    return ResponseEntity.ok().build();          
	}
	
	
	@DeleteMapping("/orgs/{orgId}/follow")
	public ResponseEntity<Void> unfollowOrg(@PathVariable Long orgId, HttpSession session) {
	    Long userId = (Long) session.getAttribute("userId");
	    if (userId == null) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
	    }

	    userFeedServices.unfollowOrg(userId, orgId); 
	    return ResponseEntity.noContent().build();
	}

	
	@DeleteMapping("/orgs/{id}")
	public ResponseEntity<Void> deleteOrg(@PathVariable Long id) {
		orgServices.deleteOrg(id);
		return ResponseEntity.noContent().build();
	}
	
	
}