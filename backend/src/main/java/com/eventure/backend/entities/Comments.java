package com.eventure.backend.entities;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "comments")
public class Comments {

    public Comments() {}

    public Comments(Long userId, Long flyerId, String content) {
        this.userId = userId;
        this.flyerId = flyerId;
        this.content = content;
        this.timestamp = Instant.now();
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "flyer_id", nullable = false)
    private Long flyerId;

    @Column(name = "content", nullable = false, length = 500) 
    private String content;

    @Column(name = "timestamp", nullable = false)
    private Instant timestamp;

    

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

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Instant getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
    }
}