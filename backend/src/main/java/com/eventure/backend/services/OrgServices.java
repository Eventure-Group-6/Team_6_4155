package com.eventure.backend.services;

import com.eventure.backend.entities.Org;
import com.eventure.backend.entities.Users;
import com.eventure.backend.repositories.OrgRepo;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class OrgServices {
	
    private final OrgRepo orgRepo;

    public OrgServices(OrgRepo orgRepo) {
        this.orgRepo = orgRepo;
    }

    public Org createOrg(Org org, String username) {
        org.setOrgOwner(username);
        return orgRepo.save(org);
    }

    
    public List<Org> getAllOrgs() {
        return orgRepo.findAll();
    }
    
    public Org getOrgById(Long id) {
        return  orgRepo.findById(id).orElse(null);

    }
    
    public Org updateOrg(Org org) {
        return orgRepo.save(org);
    }
    
    public void deleteOrg(Long id) {
        orgRepo.deleteById(id);
    }
    
    public void orgFollowed(Org org)
    {
    	org.orgFollowed();
    }
    
    public void orgUnfollowed(Org org)
    {
    	org.orgUnfollowed();
    }
    
    
}

