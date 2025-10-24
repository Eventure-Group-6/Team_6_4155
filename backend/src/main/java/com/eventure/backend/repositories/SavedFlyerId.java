package com.eventure.backend.repositories;

import java.io.Serializable;
import java.util.Objects;

public class SavedFlyerId implements Serializable {
    private Long userId;
    private Long flyerId;
    
    public SavedFlyerId() {}
    
    public SavedFlyerId(Long userId, Long flyerId) {
        this.userId = userId;
        this.flyerId = flyerId;
    }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SavedFlyerId that = (SavedFlyerId) o;
        return Objects.equals(userId, that.userId) && Objects.equals(flyerId, that.flyerId);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(userId, flyerId);
    }
}

