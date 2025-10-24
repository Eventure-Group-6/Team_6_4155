package com.eventure.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "user_feed")
public class UserFeed {

    public UserFeed() {}

    public UserFeed(Long id, Long userId, Long flyerId) {
        this.id = id;
        this.userId = userId;
        this.flyerId = flyerId;
    }

    @Override
    public String toString() {
        return "UserFeed [id=" + id +
                ", userId=" + userId +
                ", flyerId=" + flyerId + "]";
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "flyer_id", nullable = false)
    private Long flyerId;

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

	public Long getFlyerId() {
		return flyerId;
	}

	public void setFlyerId(Long flyerId) {
		this.flyerId = flyerId;
	}

    
}
