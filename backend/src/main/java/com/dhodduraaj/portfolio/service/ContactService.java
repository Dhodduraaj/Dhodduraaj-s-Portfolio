package com.dhodduraaj.portfolio.service;

import com.dhodduraaj.portfolio.dto.ContactMessageDto;

public interface ContactService {
    ContactMessageDto saveMessage(ContactMessageDto messageDto);
}
