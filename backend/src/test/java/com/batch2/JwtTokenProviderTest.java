package com.batch2;

import com.pcbuilder.security.jwt.JwtUtils;
import com.pcbuilder.security.services.UserDetailsImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.Collections;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.junit.jupiter.api.Assertions.*;

public class JwtTokenProviderTest {

    private JwtUtils jwtUtils;

    @BeforeEach
    void setUp() {
        jwtUtils = new JwtUtils();
        // Set test secret key using reflection - using a secure key for testing
        ReflectionTestUtils.setField(jwtUtils, "jwtSecret", "5367566B59703373367639792F423F4528482B4D6251655468576D5A71347437");
        ReflectionTestUtils.setField(jwtUtils, "jwtExpirationMs", 3600000); // 1 hour
    }

    @Test
    void testGenerateJwtToken() {
        Authentication authentication = mock(Authentication.class);
        UserDetailsImpl userDetails = new UserDetailsImpl(1L, "testuser", "test@example.com", "password",
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")));
        
        when(authentication.getPrincipal()).thenReturn(userDetails);

        String token = jwtUtils.generateJwtToken(authentication);
        
        assertNotNull(token);
        assertTrue(token.length() > 0);
    }

    @Test
    void testGetUserNameFromJwtToken() {
        Authentication authentication = mock(Authentication.class);
        UserDetailsImpl userDetails = new UserDetailsImpl(1L, "testuser", "test@example.com", "password",
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")));
        
        when(authentication.getPrincipal()).thenReturn(userDetails);

        String token = jwtUtils.generateJwtToken(authentication);
        String username = jwtUtils.getUserNameFromJwtToken(token);
        
        assertEquals("testuser", username);
    }

    @Test
    void testValidateJwtToken() {
        Authentication authentication = mock(Authentication.class);
        UserDetailsImpl userDetails = new UserDetailsImpl(1L, "testuser", "test@example.com", "password",
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")));
        
        when(authentication.getPrincipal()).thenReturn(userDetails);

        String token = jwtUtils.generateJwtToken(authentication);
        
        assertTrue(jwtUtils.validateJwtToken(token));
    }

    @Test
    void testValidateJwtTokenWithInvalidToken() {
        String invalidToken = "invalid.token.here";
        
        assertFalse(jwtUtils.validateJwtToken(invalidToken));
    }
} 