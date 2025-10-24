package com.eventure.backend.services;

import com.eventure.backend.entities.Org;
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

    public Org createOrg(Org org) {
        return orgRepo.save(org);
    }
    
    public List<Org> getAllOrgs() {
        return orgRepo.findAll();
    }
    
    public Optional<Org> getOrgById(Long id) {
        return orgRepo.findById(id);
    }
    
    public Org updateOrg(Org org) {
        return orgRepo.save(org);
    }
    
    public void deleteOrg(Long id) {
        orgRepo.deleteById(id);
    }
}

