package com.resume.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.resume.repository.MessageRepository;
import com.resume.security.JwtFilter;
import com.resume.security.JwtUtil;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AdminController.class)
@AutoConfigureMockMvc(addFilters = false)
@TestPropertySource(properties = {
        "admin.username=admin",
        "admin.password-hash=",      // empty hash → 503 path
        "jwt.secret=test-secret-key-min-256-bits-long-aaaaaaaaaaaaaaaaaaa",
        "jwt.expiry-ms=3600000"
})
class AdminControllerNoHashTest {

    @Autowired MockMvc mockMvc;
    @Autowired ObjectMapper objectMapper;
    @MockBean MessageRepository messageRepository;
    @MockBean JwtUtil jwtUtil;
    @MockBean JwtFilter jwtFilter;
    @MockBean PasswordEncoder passwordEncoder;

    @Test
    void login_whenAdminPassHashEmpty_returns503() throws Exception {
        String body = objectMapper.writeValueAsString(Map.of("username", "admin", "password", "anypassword"));

        mockMvc.perform(post("/api/admin/auth/login")
                        .contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isServiceUnavailable());
    }
}
