package com.resume.controller;

import com.resume.dto.ApiResponse;
import com.resume.dto.ContactRequest;
import com.resume.service.ContactService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
public class ContactController {
    private final ContactService svc;

    public ContactController(ContactService svc) { this.svc = svc; }

    @PostMapping
    public ResponseEntity<ApiResponse> submit(@Valid @RequestBody ContactRequest req) {
        svc.handle(req);
        return ResponseEntity.ok(new ApiResponse(true, "Message received. I'll get back to you soon."));
    }
}
