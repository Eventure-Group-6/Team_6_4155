package com.eventure.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "flyers")
public class Flyers {

    public Flyers() {}

    public Flyers(Long id, Long orgId, String flyerAdvert, int popularityScore) {    
        this.id = id;
        this.orgId = orgId;
        this.flyerAdvert = flyerAdvert;
        this.popularityScore = popularityScore;
    }

    @Override
    public String toString() {
        return "Flyer [id=" + id + 
                ", orgId=" + orgId +
                ", flyerAdvert=" + flyerAdvert +
                ", popularityScore=" + popularityScore + "]";
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "org_id", nullable = false)
    private Long orgId;

    @Column(name = "flyer_advert", nullable = false, length = 255)
    private String flyerAdvert;

    @Column(name = "popularity_score", nullable = false)
    private int popularityScore;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getOrgId() {
		return orgId;
	}

	public void setOrgId(Long orgId) {
		this.orgId = orgId;
	}

	public String getFlyerAdvert() {
		return flyerAdvert;
	}

	public void setFlyerAdvert(String flyerAdvert) {
		this.flyerAdvert = flyerAdvert;
	}

	public int getPopularityScore() {
		return popularityScore;
	}

	public void setPopularityScore(int popularityScore) {
		this.popularityScore = popularityScore;
	}

   
}

