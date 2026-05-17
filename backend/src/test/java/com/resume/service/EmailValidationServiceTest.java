package com.resume.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class EmailValidationServiceTest {

    private EmailValidationService svc;

    @BeforeEach
    void setUp() { svc = new EmailValidationService(); }

    @Test
    void rejects_null_email() {
        assertFalse(svc.validate(null).valid());
    }

    @Test
    void rejects_email_without_at() {
        assertFalse(svc.validate("notanemail").valid());
    }

    @Test
    void rejects_disposable_mailinator() {
        var result = svc.validate("user@mailinator.com");
        assertFalse(result.valid());
        assertNotNull(result.reason());
        assertTrue(result.reason().contains("throwaway"));
    }

    @Test
    void rejects_disposable_tempmail() {
        assertFalse(svc.validate("test@tempmail.com").valid());
    }

    @Test
    void rejects_disposable_guerrillamail() {
        assertFalse(svc.validate("anon@guerrillamail.com").valid());
    }

    @Test
    void rejects_disposable_10minutemail() {
        assertFalse(svc.validate("anon@10minutemail.com").valid());
    }

    @Test
    void rejects_suspicious_keyboard_mash_domain() {
        // "asdf.com" matches the keyboard-mash pattern
        var result = svc.validate("user@asdf.com");
        // pattern match catches it
        assertFalse(result.valid());
    }

    @Test
    void rejects_suspicious_test_domain() {
        assertFalse(svc.validate("user@test.com").valid());
    }

    @Test
    void rejects_suspicious_fake_domain() {
        assertFalse(svc.validate("user@fake.com").valid());
    }

    @Test
    void allows_gmail() {
        // gmail.com has MX records; DNS may not resolve in unit test but should fail-open
        var result = svc.validate("someone@gmail.com");
        // Either passes (MX found) or is allowed through on DNS failure
        // We just verify it doesn't reject for disposable/pattern reasons
        // (MX may resolve to valid in CI, so we accept both outcomes)
        assertTrue(result.valid() || (result.reason() != null && !result.reason().contains("throwaway")));
    }

    @Test
    void allows_corporate_looking_domain() {
        // Something that looks like a real corporate email
        // Will fail MX in offline tests but should fail-open
        var result = svc.validate("pratham@nightcity.dev");
        // Not disposable, not suspicious pattern — may be valid or DNS inconclusive
        if (!result.valid()) {
            // Only acceptable reason is DNS/domain not existing, not blocklist
            assertFalse(result.reason().contains("throwaway"), "Should not flag as throwaway");
            assertFalse(result.reason().contains("suspicious"), "Should not flag as suspicious");
        }
    }

    @Test
    void reason_is_non_null_when_invalid() {
        var result = svc.validate("u@mailinator.com");
        assertFalse(result.valid());
        assertNotNull(result.reason());
        assertFalse(result.reason().isBlank());
    }
}
