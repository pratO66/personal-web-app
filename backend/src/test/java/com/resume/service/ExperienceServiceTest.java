package com.resume.service;

import com.resume.model.Experience;
import com.resume.repository.ExperienceRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ExperienceServiceTest {

    @Mock private ExperienceRepository repo;
    @InjectMocks private ExperienceService service;

    @Test
    void all_delegatesToFindAllByOrderBySortOrderAsc() {
        Experience e = new Experience();
        e.setCompany("Arasaka");
        when(repo.findAllByOrderBySortOrderAsc()).thenReturn(List.of(e));

        List<Experience> result = service.all();

        assertThat(result).hasSize(1);
        assertThat(result.get(0).getCompany()).isEqualTo("Arasaka");
        verify(repo).findAllByOrderBySortOrderAsc();
    }
}
