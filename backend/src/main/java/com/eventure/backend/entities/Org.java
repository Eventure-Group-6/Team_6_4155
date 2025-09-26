package com.eventure.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "org")
public class Org {

    public Org(Long id, String orgName, String orgOwner) {
        this.id = id;
        this.orgName = orgName;
        this.orgOwner = orgOwner;
    }

    @Override
    public String toString() {
        return "Org [id=" + id +
                ", orgName=" + orgName +
                ", orgOwner=" + orgOwner + "]";
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "org_name", nullable = false, length = 255)
    private String orgName;

    @Column(name = "org_owner", nullable = false, length = 255)
    private String orgOwner;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getOrgName() {
		return orgName;
	}

	public void setOrgName(String orgName) {
		this.orgName = orgName;
	}

	public String getOrgOwner() {
		return orgOwner;
	}

	public void setOrgOwner(String orgOwner) {
		this.orgOwner = orgOwner;
	}

    
}


