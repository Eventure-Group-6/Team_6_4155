package com.eventure.backend.repositories;

import com.eventure.backend.entities.SavedFlyers;
import com.eventure.backend.entities.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.eventure.backend.repositories.SavedFlyerId;






public interface SavedFlyerRepo extends JpaRepository<SavedFlyers, SavedFlyerId> {


   /// repo goes here
    
}

