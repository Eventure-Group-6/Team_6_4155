package com.eventure.backend.services;

import com.eventure.backend.entities.Org;
import com.eventure.backend.entities.UserFeed;
import com.eventure.backend.entities.Users;
import com.eventure.backend.repositories.UserFeedRepo;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UserFeedServices {
	
	private final UserFeedRepo userFeedRepo;
	
	public UserFeedServices(UserFeedRepo userFeedRepo) {
		this.userFeedRepo = userFeedRepo;
	}
	
	public UserFeed createUserFeed(UserFeed userFeed) {
		return userFeedRepo.save(userFeed);
	}
	
	public List<UserFeed> getUserFeedByUserId(Long userId) {
		return userFeedRepo.findByUserId(userId);
	}
	
	public void deleteUserFeed(Long id) {
		userFeedRepo.deleteById(id);
	}
	
	public UserFeed followOrg(Long userId, Long orgId) {
		UserFeed userFeed = new UserFeed(userId, orgId); 
		return userFeedRepo.save(userFeed);
	}
}