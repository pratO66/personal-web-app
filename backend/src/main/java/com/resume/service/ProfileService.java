package com.resume.service;

import com.resume.model.Profile;
import com.resume.repository.ProfileRepository;
import org.springframework.stereotype.Service;

@Service
public class ProfileService {
    private final ProfileRepository repo;

    public ProfileService(ProfileRepository repo) { this.repo = repo; }

    public Profile get() {
        return repo.findAll().stream().findFirst().orElse(null);
    }
}
