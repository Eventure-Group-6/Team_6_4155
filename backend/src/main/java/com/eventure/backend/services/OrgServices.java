package com.eventure.backend.services;


import com.eventure.backend.repositories.OrgRepo;
import org.springframework.stereotype.Service;
import java.util.Optional;


@Service
public class OrgServices {

    private final OrgRepo orgRepo;

    
    public OrgServices(OrgRepo orgRepo) {
        this.orgRepo = orgRepo;
    }

    // services go here
}

