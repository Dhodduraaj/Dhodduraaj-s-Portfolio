package com.dhodduraaj.portfolio.controller;

import com.dhodduraaj.portfolio.dto.ContactMessageDto;
import com.dhodduraaj.portfolio.service.ContactService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ContactController {

    private final ContactService service;

    public ContactController(ContactService service) {
        this.service = service;
    }

    @PostMapping("/contact")
    public ResponseEntity<ContactMessageDto> sendContactMessage(@RequestBody ContactMessageDto dto) {
        ContactMessageDto saved = service.saveMessage(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
}
