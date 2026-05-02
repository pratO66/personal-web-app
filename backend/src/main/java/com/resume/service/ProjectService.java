package com.resume.service;

import com.resume.model.Project;
import com.resume.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {
    private final ProjectRepository repo;

    public ProjectService(ProjectRepository repo) { this.repo = repo; }

    public List<Project> all(boolean featuredOnly) {
        return featuredOnly ? repo.findByFeaturedTrueOrderBySortOrderAsc() : repo.findAllByOrderBySortOrderAsc();
    }

    public Optional<Project> byId(Long id) { return repo.findById(id); }
}
