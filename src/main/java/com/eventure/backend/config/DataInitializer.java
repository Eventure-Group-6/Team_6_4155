package com.eventure.backend.config;

import com.eventure.backend.entities.*;
import com.eventure.backend.repositories.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepo userRepo;
    private final OrgRepo orgRepo;
    private final FlyerRepo flyerRepo;

    public DataInitializer(UserRepo userRepo, OrgRepo orgRepo, FlyerRepo flyerRepo) {
        this.userRepo = userRepo;
        this.orgRepo = orgRepo;
        this.flyerRepo = flyerRepo;
    }

    @Override
    public void run(String... args) throws Exception {
        // Initialize sample data if database is empty
        if (userRepo.count() == 0) {
            // Create sample users
            Users user1 = new Users();
            user1.setUsername("John Doe");
            user1.setEmail("john@charlotte.edu");
            user1.setPassword("password123");
            userRepo.save(user1);

            Users user2 = new Users();
            user2.setUsername("Jane Smith");
            user2.setEmail("jane@charlotte.edu");
            user2.setPassword("password123");
            userRepo.save(user2);

            // Create sample organizations
            Org org1 = new Org();
            org1.setOrgName("ACM Club");
            org1.setOrgOwner("John Doe");
            orgRepo.save(org1);

            Org org2 = new Org();
            org2.setOrgName("Robotics Club");
            org2.setOrgOwner("Jane Smith");
            orgRepo.save(org2);

            // Create sample flyers
            Flyers flyer1 = new Flyers();
            flyer1.setOrgId(1L);
            flyer1.setFlyerAdvert("Join ACM for coding competitions!");
            flyer1.setPopularityScore(85);
            flyerRepo.save(flyer1);

            Flyers flyer2 = new Flyers();
            flyer2.setOrgId(2L);
            flyer2.setFlyerAdvert("Build robots with us every Thursday!");
            flyer2.setPopularityScore(92);
            flyerRepo.save(flyer2);

            System.out.println("Sample data initialized successfully!");
        }
    }
}