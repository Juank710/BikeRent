package BikeRent.RentalHistory;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name="rental_history")
public class RentalHistory {
    @Id
    @Column(name = "id")
    private String id;
    
    @Column(name = "user_id")
    private String userId;
    
    @Column(name = "rental_id")
    private String rentalId;
    
    @Column(name = "action")
    private String action;
    
    @Column(name = "details")
    private String details;
    
    @Column(name = "changed_at")
    private LocalDateTime changedAt;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getRentalId() {
        return rentalId;
    }

    public void setRentalId(String rentalId) {
        this.rentalId = rentalId;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public LocalDateTime getChangedAt() {
        return changedAt;
    }

    public void setChangedAt(LocalDateTime changedAt) {
        this.changedAt = changedAt;
    }
}