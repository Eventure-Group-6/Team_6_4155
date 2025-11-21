package com.eventure.backend.services;

import com.eventure.backend.entities.Flyers;
import com.eventure.backend.repositories.FlyerRepo;
import com.eventure.backend.repositories.SavedFlyerRepo;
import com.eventure.backend.repositories.CommentRepo;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PopularityService {

    private final FlyerRepo flyerRepo;
    private final SavedFlyerRepo savedFlyerRepo;
    private final CommentRepo commentRepo;

    public PopularityService(FlyerRepo flyerRepo, SavedFlyerRepo savedFlyerRepo, CommentRepo commentRepo) {
        this.flyerRepo = flyerRepo;
        this.savedFlyerRepo = savedFlyerRepo;
        this.commentRepo = commentRepo;
    }

    /**
     * Compute popularity score based on saves and comments
     * Formula: (saves * 10) + (comments * 5) + base_score
     */
    public int calculatePopularityScore(Long flyerId) {
        try {
            long saveCount = savedFlyerRepo.findByFlyerId(flyerId).size();
            long commentCount = commentRepo.findByFlyerId(flyerId).size();
            
            // Base score of 50, saves worth 10 points, comments worth 5 points
            int popularityScore = 50 + (int)(saveCount * 10) + (int)(commentCount * 5);
            
            // Cap at 100
            return Math.min(popularityScore, 100);
        } catch (Exception e) {
            return 50; // Default score if calculation fails
        }
    }

    /**
     * Update popularity scores for all flyers
     */
    public void updateAllPopularityScores() {
        List<Flyers> allFlyers = flyerRepo.findAll();
        
        for (Flyers flyer : allFlyers) {
            int newScore = calculatePopularityScore(flyer.getId());
            flyer.setPopularityScore(newScore);
            flyerRepo.save(flyer);
        }
    }

    /**
     * Get trending flyers (top 5 by popularity)
     */
    public List<Flyers> getTrendingFlyers() {
        return flyerRepo.findAll().stream()
            .sorted((f1, f2) -> Integer.compare(f2.getPopularityScore(), f1.getPopularityScore()))
            .limit(5)
            .toList();
    }
}