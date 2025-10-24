package com.eventure.backend.controllers;

import com.eventure.backend.entities.Org;
import com.eventure.backend.services.OrgServices;
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
	
	public OrgController(OrgServices orgServices){
		this.orgServices = orgServices;
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
	
	@DeleteMapping("/orgs/{id}")
	public ResponseEntity<Void> deleteOrg(@PathVariable Long id) {
		orgServices.deleteOrg(id);
		return ResponseEntity.noContent().build();
	}
}