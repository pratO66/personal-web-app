package com.resume.controller;

import com.resume.dto.LoginRequest;
import com.resume.model.Message;
import com.resume.repository.MessageRepository;
import com.resume.security.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    private final JwtUtil jwt;
    private final PasswordEncoder encoder;
    private final MessageRepository messages;
    private final String adminUser;
    private final String adminPassHash;

    public AdminController(JwtUtil jwt,
                           PasswordEncoder encoder,
                           MessageRepository messages,
                           @Value("${admin.username:admin}") String adminUser,
                           @Value("${admin.password-hash:}") String adminPassHash) {
        this.jwt = jwt;
        this.encoder = encoder;
        this.messages = messages;
        this.adminUser = adminUser;
        this.adminPassHash = adminPassHash;
    }

    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest req) {
        if (adminPassHash == null || adminPassHash.isBlank()) {
            return ResponseEntity.status(503).body(Map.of("error", "Admin not configured"));
        }
        if (!adminUser.equals(req.username()) || !encoder.matches(req.password(), adminPassHash)) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
        }
        return ResponseEntity.ok(Map.of("token", jwt.generate(adminUser)));
    }

    @GetMapping("/messages")
    public List<Message> messages() { return messages.findAllByOrderBySentAtDesc(); }

    @PatchMapping("/messages/{id}/read")
    public ResponseEntity<Message> markRead(@PathVariable Long id) {
        return messages.findById(id).map(m -> {
            m.setRead(!m.isRead());
            return ResponseEntity.ok(messages.save(m));
        }).orElse(ResponseEntity.notFound().build());
    }
}
