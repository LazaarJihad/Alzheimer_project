package com.example.alzheimerapp.request;

public class ReservationRequest {
    private Long assistantId;
    private String userEmail;

    // Getters and setters
    public Long getAssistantId() {
        return assistantId;
    }

    public void setAssistantId(Long assistantId) {
        this.assistantId = assistantId;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }
}
