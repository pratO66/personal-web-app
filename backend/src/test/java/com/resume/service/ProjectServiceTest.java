package com.resume.service;

import com.resume.model.Project;
import com.resume.repository.ProjectRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ProjectServiceTest {

    @Mock private ProjectRepository repo;
    @InjectMocks private ProjectService service;

    @Test
    void all_false_delegatesToFindAllByOrderBySortOrderAsc() {
        Project p = new Project();
        p.setTitle("Neon Dashboard");
        when(repo.findAllByOrderBySortOrderAsc()).thenReturn(List.of(p));

        List<Project> result = service.all(false);

        assertThat(result).hasSize(1);
        assertThat(result.get(0).getTitle()).isEqualTo("Neon Dashboard");
        verify(repo).findAllByOrderBySortOrderAsc();
    }

    @Test
    void all_true_delegatesToFindByFeaturedTrueOrderBySortOrderAsc() {
        Project p = new Project();
        p.setTitle("Featured Project");
        p.setFeatured(true);
        when(repo.findByFeaturedTrueOrderBySortOrderAsc()).thenReturn(List.of(p));

        List<Project> result = service.all(true);

        assertThat(result).hasSize(1);
        assertThat(result.get(0).isFeatured()).isTrue();
        verify(repo).findByFeaturedTrueOrderBySortOrderAsc();
    }

    @Test
    void byId_returnsOptionalWithValue() {
        Project p = new Project();
        p.setId(1L);
        when(repo.findById(1L)).thenReturn(Optional.of(p));

        Optional<Project> result = service.byId(1L);

        assertThat(result).isPresent();
        assertThat(result.get().getId()).isEqualTo(1L);
    }

    @Test
    void byId_returnsEmptyOptional_whenNotFound() {
        when(repo.findById(99L)).thenReturn(Optional.empty());

        Optional<Project> result = service.byId(99L);

        assertThat(result).isEmpty();
    }
}
