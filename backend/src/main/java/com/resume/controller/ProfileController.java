package com.resume.controller;

import com.resume.model.Profile;
import com.resume.service.ProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {
    private final ProfileService svc;

    public ProfileController(ProfileService svc) { this.svc = svc; }

    @GetMapping
    public ResponseEntity<Profile> get() {
        Profile p = svc.get();
        return p == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(p);
    }
}
