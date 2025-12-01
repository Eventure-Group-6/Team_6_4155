package com.eventure.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "saved_flyers")
public class SavedFlyers {

    public SavedFlyers() {}

    public SavedFlyers(Long userId, Long flyerId) {
        this.userId = userId;
        this.flyerId = flyerId;
    }

    @Override
    public String toString() {
        return "SavedFlyer [userId=" + userId +
                ", flyerId=" + flyerId + "]";
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "flyer_id")
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

