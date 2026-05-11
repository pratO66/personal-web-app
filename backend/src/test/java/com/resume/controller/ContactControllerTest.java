package com.resume.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.resume.dto.ContactRequest;
import com.resume.model.Message;
import com.resume.security.JwtFilter;
import com.resume.security.JwtUtil;
import com.resume.service.ContactService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ContactController.class)
@AutoConfigureMockMvc(addFilters = false)
class ContactControllerTest {

    @Autowired MockMvc mockMvc;
    @Autowired ObjectMapper objectMapper;
    @MockBean ContactService contactService;
    @MockBean JwtUtil jwtUtil;
    @MockBean JwtFilter jwtFilter;

    @Test
    void postContact_withValidBody_returns200WithSuccessTrue() throws Exception {
        when(contactService.handle(any(ContactRequest.class))).thenReturn(new Message());

        String body = objectMapper.writeValueAsString(
                new ContactRequest("Alice", "alice@example.com", "Hello", "World payload here"));

        mockMvc.perform(post("/api/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").isString());
    }

    @Test
    void postContact_withBlankName_returns400() throws Exception {
        String body = "{\"name\":\"\",\"email\":\"alice@example.com\",\"subject\":\"Hi\",\"body\":\"Payload content here\"}";

        mockMvc.perform(post("/api/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isBadRequest());
    }

    @Test
    void postContact_withInvalidEmail_returns400() throws Exception {
        String body = "{\"name\":\"Alice\",\"email\":\"not-an-email\",\"subject\":\"Hi\",\"body\":\"Payload content here\"}";

        mockMvc.perform(post("/api/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isBadRequest());
    }
}
