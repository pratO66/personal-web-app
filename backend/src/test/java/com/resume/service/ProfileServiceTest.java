package com.resume.service;

import com.resume.model.Profile;
import com.resume.repository.ProfileRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ProfileServiceTest {

    @Mock private ProfileRepository repo;
    @InjectMocks private ProfileService service;

    @Test
    void get_returnsFirstProfile_whenRepoHasOne() {
        Profile p = new Profile();
        p.setName("V");
        when(repo.findAll()).thenReturn(List.of(p));

        Profile result = service.get();

        assertThat(result).isNotNull();
        assertThat(result.getName()).isEqualTo("V");
    }

    @Test
    void get_returnsNull_whenRepoIsEmpty() {
        when(repo.findAll()).thenReturn(Collections.emptyList());

        Profile result = service.get();

        assertThat(result).isNull();
    }
}
