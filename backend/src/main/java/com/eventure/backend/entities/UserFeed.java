package com.eventure.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "user_feed")
public class UserFeed {

    public UserFeed() {}

    public UserFeed(Long userId, Long orgId) {
        
        this.userId = userId;
        this.orgId = orgId;
    }

    @Override
    public String toString() {
        return "UserFeed [id=" + id +
                ", userId=" + userId +
                ", orgId=" + orgId + "]";
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "org_id", nullable = false)
    private Long orgId;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}
	
	public Long getOrgId() {
		return orgId;
		
	}

}
