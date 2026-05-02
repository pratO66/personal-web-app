package com.resume.controller;

import com.resume.model.Experience;
import com.resume.service.ExperienceService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/experience")
public class ExperienceController {
    private final ExperienceService svc;

    public ExperienceController(ExperienceService svc) { this.svc = svc; }

    @GetMapping
    public List<Experience> list() { return svc.all(); }
}
