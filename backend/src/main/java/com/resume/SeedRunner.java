package com.resume;

import com.resume.model.*;
import com.resume.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Component
@Profile("dev")
public class SeedRunner implements CommandLineRunner {
    private static final Logger log = LoggerFactory.getLogger(SeedRunner.class);

    private final ProfileRepository profiles;
    private final ProjectRepository projects;
    private final ExperienceRepository experiences;

    public SeedRunner(ProfileRepository profiles, ProjectRepository projects, ExperienceRepository experiences) {
        this.profiles = profiles;
        this.projects = projects;
        this.experiences = experiences;
    }

    @Override
    public void run(String... args) {
        if (profiles.count() == 0) seedProfile();
        if (projects.count() == 0) seedProjects();
        if (experiences.count() == 0) seedExperience();
        log.info("Seed check complete. profiles={} projects={} experience={}",
                profiles.count(), projects.count(), experiences.count());
    }

    private void seedProfile() {
        com.resume.model.Profile p = new com.resume.model.Profile();
        p.setName("V");
        p.setTagline("Night City Developer");
        p.setBio("Full-stack engineer wiring chrome to silicon. Java on the back, React on the front, neon all over.");
        p.setEmail("v@nightcity.dev");
        p.setLocation("Night City, NC");
        p.setAvatarUrl("");
        p.setCvUrl("/cv.pdf");
        p.setTechStack(List.of("Java", "Spring Boot", "TypeScript", "Next.js", "Postgres", "Docker"));
        p.setSocials(Map.of(
                "github", "https://github.com/yourhandle",
                "linkedin", "https://linkedin.com/in/yourhandle",
                "twitter", "https://twitter.com/yourhandle"
        ));
        p.setSkills(List.of(
                new Skill("React",        "Frontend", 90),
                new Skill("Next.js",      "Frontend", 85),
                new Skill("TypeScript",   "Frontend", 88),
                new Skill("Tailwind CSS", "Frontend", 92),
                new Skill("Java",         "Backend",  90),
                new Skill("Spring Boot",  "Backend",  85),
                new Skill("Postgres",     "Backend",  78),
                new Skill("REST APIs",    "Backend",  88),
                new Skill("Docker",       "DevOps",   72),
                new Skill("AWS",          "DevOps",   65),
                new Skill("CI/CD",        "DevOps",   70),
                new Skill("Figma",        "Other",    60)
        ));
        profiles.save(p);
    }

    private void seedProjects() {
        projects.saveAll(List.of(
                project("Neon Dashboard", "Real-time metrics with cyberpunk flair",
                        "A reactive admin console pulling from Kafka streams, with WebGL particle effects on every alert.",
                        List.of("React", "WebSockets", "WebGL"), List.of("Next.js", "TypeScript", "Three.js"),
                        "https://example.com/demo1", "https://github.com/you/neon-dash", "", true, 1),
                project("Quickhack CLI", "Encrypted ops tool for the wired",
                        "Rust-based CLI for managing encrypted secrets across machines. Uses age + signed manifests.",
                        List.of("Rust", "CLI", "Security"), List.of("Rust", "Tokio", "age"),
                        "", "https://github.com/you/quickhack", "", true, 2),
                project("Braindance Player", "Spatial audio web experience",
                        "Immersive audio-visual demo running entirely in the browser with WebAudio + Three.js.",
                        List.of("WebAudio", "Three.js"), List.of("Vite", "TypeScript", "Three.js"),
                        "https://example.com/demo3", "https://github.com/you/braindance", "", false, 3),
                project("Trauma Team API", "On-call rotation manager",
                        "Spring Boot service managing on-call schedules with PagerDuty + Slack integration.",
                        List.of("Spring Boot", "Java", "Integrations"), List.of("Java 21", "Spring Boot", "Postgres"),
                        "", "https://github.com/you/trauma-team", "", false, 4),
                project("Scanner Net", "Distributed port scanner",
                        "Go-powered concurrent scanner with rate-limited probing and Slack alerts on new exposures.",
                        List.of("Go", "Networking"), List.of("Go", "Cobra", "Slack API"),
                        "", "https://github.com/you/scanner-net", "", false, 5)
        ));
    }

    private Project project(String title, String desc, String longDesc, List<String> tags, List<String> stack,
                            String demo, String repo, String img, boolean featured, int sort) {
        Project p = new Project();
        p.setTitle(title);
        p.setDescription(desc);
        p.setLongDescription(longDesc);
        p.setTags(tags);
        p.setStack(stack);
        p.setDemoUrl(demo);
        p.setRepoUrl(repo);
        p.setImageUrl(img);
        p.setFeatured(featured);
        p.setSortOrder(sort);
        return p;
    }

    private void seedExperience() {
        experiences.saveAll(List.of(
                exp("Arasaka", "Senior Engineer", "Night City",
                        LocalDate.of(2024, 3, 1), null, true,
                        "Leading core platform team building zero-trust infrastructure.",
                        List.of("Cut deploy time 40% via Spinnaker pipeline overhaul",
                                "Designed cross-region failover for a fleet of 200 services",
                                "Mentored 4 mid-level engineers"),
                        List.of("Java", "Kubernetes", "AWS", "Spring Boot"), 1),
                exp("Militech", "Backend Engineer", "Watson",
                        LocalDate.of(2022, 1, 1), LocalDate.of(2024, 2, 28), false,
                        "Built and maintained internal trading APIs handling 10k req/sec.",
                        List.of("Reduced p99 latency from 800ms to 120ms",
                                "Migrated legacy SOAP services to gRPC"),
                        List.of("Go", "Postgres", "gRPC", "Redis"), 2),
                exp("Kang Tao", "Software Engineer", "Westbrook",
                        LocalDate.of(2020, 6, 1), LocalDate.of(2021, 12, 31), false,
                        "Frontend lead on consumer-facing storefront serving 2M MAUs.",
                        List.of("Shipped React-Native app rated 4.8 on App Store",
                                "Set up Storybook + visual regression CI"),
                        List.of("React", "TypeScript", "GraphQL"), 3),
                exp("NetWatch", "Junior Developer", "Pacifica",
                        LocalDate.of(2019, 8, 1), LocalDate.of(2020, 5, 31), false,
                        "First role. Built internal tooling for incident response.",
                        List.of("Authored Slack bot used by 30+ analysts daily"),
                        List.of("Python", "Django", "Slack API"), 4)
        ));
    }

    private Experience exp(String company, String role, String location, LocalDate start, LocalDate end, boolean current,
                           String desc, List<String> highlights, List<String> tech, int sort) {
        Experience e = new Experience();
        e.setCompany(company);
        e.setRole(role);
        e.setLocation(location);
        e.setStartDate(start);
        e.setEndDate(end);
        e.setCurrent(current);
        e.setDescription(desc);
        e.setHighlights(highlights);
        e.setTechnologies(tech);
        e.setSortOrder(sort);
        return e;
    }
}
