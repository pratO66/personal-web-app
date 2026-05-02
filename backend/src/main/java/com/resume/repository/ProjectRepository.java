package com.resume.repository;

import com.resume.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findAllByOrderBySortOrderAsc();
    List<Project> findByFeaturedTrueOrderBySortOrderAsc();
}
