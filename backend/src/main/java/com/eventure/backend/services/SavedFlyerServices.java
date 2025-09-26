package com.eventure.backend.services;
import com.eventure.backend.repositories.SavedFlyerRepo;
import java.util.Optional;
import org.springframework.stereotype.Service;




@Service
public class SavedFlyerServices {
	
	
	private final SavedFlyerRepo savedFlyerRepo;
	
	public SavedFlyerServices(SavedFlyerRepo savedFlyerRepo){
		this.savedFlyerRepo = savedFlyerRepo;
	}
	
	
	//services go here
	
}
