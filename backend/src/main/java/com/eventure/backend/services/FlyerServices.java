package com.eventure.backend.services;

import com.eventure.backend.repositories.FlyerRepo;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class FlyerServices {

    private final FlyerRepo flyerRepo;

    public FlyerServices(FlyerRepo flyerRepo) {
        this.flyerRepo = flyerRepo;
    }

    // services go here
    
}
