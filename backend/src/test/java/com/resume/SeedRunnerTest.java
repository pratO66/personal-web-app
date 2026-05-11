package com.resume;

import com.resume.repository.ExperienceRepository;
import com.resume.repository.ProfileRepository;
import com.resume.repository.ProjectRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class SeedRunnerTest {

    @Mock private ProfileRepository profiles;
    @Mock private ProjectRepository projects;
    @Mock private ExperienceRepository experiences;

    @InjectMocks private SeedRunner seedRunner;

    @Test
    void run_seedsData_whenReposAreEmpty() throws Exception {
        when(profiles.count()).thenReturn(0L);
        when(projects.count()).thenReturn(0L);
        when(experiences.count()).thenReturn(0L);

        seedRunner.run();

        verify(profiles).save(any());
        verify(projects).saveAll(anyList());
        verify(experiences).saveAll(anyList());
    }

    @Test
    void run_skipsSeeding_whenReposAlreadyHaveData() throws Exception {
        when(profiles.count()).thenReturn(1L);
        when(projects.count()).thenReturn(5L);
        when(experiences.count()).thenReturn(4L);

        seedRunner.run();

        verify(profiles, never()).save(any());
        verify(projects, never()).saveAll(anyList());
        verify(experiences, never()).saveAll(anyList());
    }
}
