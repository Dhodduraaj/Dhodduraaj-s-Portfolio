package com.dhodduraaj.portfolio.service.impl;

import com.dhodduraaj.portfolio.dto.ContactMessageDto;
import com.dhodduraaj.portfolio.model.ContactMessage;
import com.dhodduraaj.portfolio.repository.ContactMessageRepository;
import com.dhodduraaj.portfolio.service.ContactService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ContactServiceImpl implements ContactService {

    private final ContactMessageRepository repository;

    public ContactServiceImpl(ContactMessageRepository repository) {
        this.repository = repository;
    }

    @Override
    public ContactMessageDto saveMessage(ContactMessageDto dto) {
        if (dto.getName() == null || dto.getName().trim().isEmpty() ||
            dto.getEmail() == null || dto.getEmail().trim().isEmpty() ||
            dto.getMessage() == null || dto.getMessage().trim().isEmpty()) {
            throw new IllegalArgumentException("Fields Name, Email, and Message are mandatory.");
        }

        ContactMessage entity = new ContactMessage(
                dto.getName(),
                dto.getEmail(),
                dto.getSubject() == null ? "" : dto.getSubject(),
                dto.getMessage()
        );

        ContactMessage saved = repository.save(entity);
        return new ContactMessageDto(
                saved.getId(),
                saved.getName(),
                saved.getEmail(),
                saved.getSubject(),
                saved.getMessage(),
                saved.getTimestamp()
        );
    }
}
