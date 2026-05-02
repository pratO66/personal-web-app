package com.resume.controller;

import com.resume.model.Project;
import com.resume.service.ProjectService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {
    private final ProjectService svc;

    public ProjectController(ProjectService svc) { this.svc = svc; }

    @GetMapping
    public List<Project> list(@RequestParam(value = "featured", required = false, defaultValue = "false") boolean featured) {
        return svc.all(featured);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Project> byId(@PathVariable Long id) {
        return svc.byId(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
}
