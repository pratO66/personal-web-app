package com.resume.service;

import com.resume.model.Experience;
import com.resume.repository.ExperienceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExperienceService {
    private final ExperienceRepository repo;

    public ExperienceService(ExperienceRepository repo) { this.repo = repo; }

    public List<Experience> all() { return repo.findAllByOrderBySortOrderAsc(); }
}
