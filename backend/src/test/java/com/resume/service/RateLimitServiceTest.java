package com.resume.service;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class RateLimitServiceTest {

    @Test
    void allows_within_limit() {
        RateLimitService svc = new RateLimitService(3, 3600);
        assertTrue(svc.isAllowed("1.2.3.4"));
        assertTrue(svc.isAllowed("1.2.3.4"));
        assertTrue(svc.isAllowed("1.2.3.4"));
    }

    @Test
    void blocks_over_limit() {
        RateLimitService svc = new RateLimitService(2, 3600);
        assertTrue(svc.isAllowed("5.5.5.5"));
        assertTrue(svc.isAllowed("5.5.5.5"));
        assertFalse(svc.isAllowed("5.5.5.5")); // 3rd within window → blocked
    }

    @Test
    void different_ips_are_independent() {
        RateLimitService svc = new RateLimitService(1, 3600);
        assertTrue(svc.isAllowed("1.1.1.1"));
        assertFalse(svc.isAllowed("1.1.1.1")); // over limit
        assertTrue(svc.isAllowed("2.2.2.2")); // different IP — fine
    }

    @Test
    void null_ip_is_always_allowed() {
        RateLimitService svc = new RateLimitService(1, 3600);
        assertTrue(svc.isAllowed(null));
        assertTrue(svc.isAllowed(null)); // null never rate-limited
    }

    @Test
    void blank_ip_is_always_allowed() {
        RateLimitService svc = new RateLimitService(1, 3600);
        assertTrue(svc.isAllowed(""));
        assertTrue(svc.isAllowed("  "));
    }
}
