package com.eventure.backend.services;

import com.eventure.backend.entities.Flyers;
import com.eventure.backend.repositories.FlyerRepo;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class FlyerServices {

    private final FlyerRepo flyerRepo;
    private final PopularityService popularityService;

    public FlyerServices(FlyerRepo flyerRepo, PopularityService popularityService) {
        this.flyerRepo = flyerRepo;
        this.popularityService = popularityService;
    }

    public Flyers createFlyer(Flyers flyer, MultipartFile file) throws IOException{
       
    	String path = "C:/flyerFolder/";
        File folder = new File(path);
        
        if (!folder.exists()) {
        	folder.mkdirs();
        }
        
        //creates random ids for storage so no overwrites
        String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
        File out = new File(path + filename );
        
        //writes to disk
        file.transferTo(out);
        
    	
    	return flyerRepo.save(flyer);
    }
    
    public List<Flyers> getAllFlyers() {
        return flyerRepo.findAll();
    }
    
    public Optional<Flyers> getFlyerById(Long id) {
        return flyerRepo.findById(id);
    }
    
    public Flyers updateFlyer(Flyers flyer) {
        return flyerRepo.save(flyer);
    }
    
    public void deleteFlyer(Long id) {
        flyerRepo.deleteById(id);
    }
    
    public List<Flyers> getPopularFlyers() {
        return flyerRepo.findAll().stream()
            .sorted((f1, f2) -> Integer.compare(f2.getPopularityScore(), f1.getPopularityScore()))
            .limit(10)
            .collect(Collectors.toList());
    }
    
    public void updateAllPopularityScores() {
        popularityService.updateAllPopularityScores();
    }
    
    public List<Flyers> getTrendingFlyers() {
        return popularityService.getTrendingFlyers();
    }
}
