package com.dhodduraaj.portfolio.dto;

import java.time.LocalDateTime;

public class ContactMessageDto {
    private Long id;
    private String name;
    private String email;
    private String subject;
    private String message;
    private LocalDateTime timestamp;

    public ContactMessageDto() {}

    public ContactMessageDto(Long id, String name, String email, String subject, String message, LocalDateTime timestamp) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.subject = subject;
        this.message = message;
        this.timestamp = timestamp;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}
