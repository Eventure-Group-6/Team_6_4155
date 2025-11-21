package com.eventure.backend.services;

import com.eventure.backend.entities.SavedFlyers;
import com.eventure.backend.repositories.SavedFlyerRepo;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class SavedFlyerServices {
	
	private final SavedFlyerRepo savedFlyerRepo;
	
	public SavedFlyerServices(SavedFlyerRepo savedFlyerRepo){
		this.savedFlyerRepo = savedFlyerRepo;
	}
	
	public SavedFlyers saveFlyerForUser(Long userId, Long flyerId) {
		SavedFlyers savedFlyer = new SavedFlyers(userId, flyerId);
		return savedFlyerRepo.save(savedFlyer);
	}
	
	public List<SavedFlyers> getSavedFlyersByUserId(Long userId) {
		return savedFlyerRepo.findByUserId(userId);
	}
	
	public void removeSavedFlyer(Long userId, Long flyerId) {
		savedFlyerRepo.deleteByUserIdAndFlyerId(userId, flyerId);
	}
}
