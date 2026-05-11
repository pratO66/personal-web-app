package com.resume.security;

import io.jsonwebtoken.JwtException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.*;

class JwtUtilTest {

    private JwtUtil jwtUtil;

    @BeforeEach
    void setUp() {
        // secret must be at least 256 bits for HS256
        jwtUtil = new JwtUtil(
                "test-secret-key-min-256-bits-long-aaaaaaaaaaaaaaaaaaa",
                3_600_000L
        );
    }

    @Test
    void generate_returnsNonNullToken() {
        String token = jwtUtil.generate("admin");
        assertThat(token).isNotNull().isNotBlank();
    }

    @Test
    void validateAndGetSubject_returnsCorrectSubject() {
        String token = jwtUtil.generate("admin");
        String subject = jwtUtil.validateAndGetSubject(token);
        assertThat(subject).isEqualTo("admin");
    }

    @Test
    void validateAndGetSubject_invalidToken_throwsException() {
        assertThatThrownBy(() -> jwtUtil.validateAndGetSubject("not.a.valid.token"))
                .isInstanceOf(Exception.class);
    }

    @Test
    void validateAndGetSubject_tamperedToken_throwsException() {
        String token = jwtUtil.generate("admin");
        // tamper the signature
        String tampered = token.substring(0, token.lastIndexOf('.') + 1) + "invalidsig";
        assertThatThrownBy(() -> jwtUtil.validateAndGetSubject(tampered))
                .isInstanceOf(Exception.class);
    }
}
