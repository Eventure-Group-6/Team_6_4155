package com.eventure.backend.services;

import com.eventure.backend.entities.Flyers;
import com.eventure.backend.entities.Org;
import com.eventure.backend.entities.UserFeed;
import com.eventure.backend.entities.Users;
import com.eventure.backend.services.FlyerServices;
import com.eventure.backend.services.*;
import com.eventure.backend.repositories.FlyerRepo;
import com.eventure.backend.repositories.OrgRepo;
import com.eventure.backend.repositories.UserFeedRepo;
import com.eventure.backend.services.PopularityService;
import com.eventure.backend.services.OrgServices;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
public class UserFeedServices {
	
	private final FlyerServices flyerServices;
	private final UserFeedRepo userFeedRepo;
    private final OrgRepo orgRepo;
    private final OrgServices orgServices;

   
	public UserFeedServices(UserFeedRepo userFeedRepo, FlyerServices flyerServices, OrgRepo orgRepo, OrgServices orgServices) {
		this.userFeedRepo = userFeedRepo;
		this.flyerServices = flyerServices;
		this.orgRepo = orgRepo;
		this.orgServices = orgServices;
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
		Org org = orgServices.getOrgById(orgId);
		
		org.orgFollowed();

		return userFeedRepo.save(userFeed);
	}
	
	public void unfollowOrg(Long userId, Long orgId) {
	    userFeedRepo.deleteByUserIdAndOrgId(userId, orgId);
	    
	    Org org = orgServices.getOrgById(orgId);
		
		org.orgUnfollowed();
	}

	
	public List<Long> getFollowedOrgs(Long userId) {
	    return getUserFeedByUserId(userId)
	           .stream()
	           .map(UserFeed::getOrgId)
	           .toList();
	}
	
	
	public List<Org> getFollowedOrgEntities(Long userId) {
	    List<Long> orgIds = getFollowedOrgs(userId);
	    return orgRepo.findAllById(orgIds);
	}

	 
	public List<Flyers> getFlyerList(List<Long> orgList){
		List<Flyers> flyerList = new ArrayList<>();
		for(Long orgIds : orgList) {
			flyerList.addAll(flyerServices.getFlyerByOrgId(orgIds));
		}
		
		//sorts descending
		flyerList.sort(Comparator.comparingLong(Flyers::getId).reversed());
		
		return flyerList;
		
	}
	
	
	
	

}