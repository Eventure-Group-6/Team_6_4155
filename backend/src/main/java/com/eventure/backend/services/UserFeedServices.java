package com.eventure.backend.services;


import com.eventure.backend.repositories.UserFeedRepo;
import java.util.Optional;
import org.springframework.stereotype.Service;


@Service
public class UserFeedServices {
	
	private final UserFeedRepo userFeedRepo;
	
	public UserFeedServices(UserFeedRepo userFeedRepo) {
		this.userFeedRepo = userFeedRepo;
	}
	
	//services go here
	
}