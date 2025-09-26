package com.eventure.backend.services;

import com.eventure.backend.repositories.UserRepo;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class UserServices {
	
	private final UserRepo userRepo;
	
	public UserServices(UserRepo userRepo) {
		this.userRepo = userRepo;
	}
	
	//services go here
	
}
