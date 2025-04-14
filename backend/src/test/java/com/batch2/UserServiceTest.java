package com.batch2;

import com.pcbuilder.model.User;
import com.pcbuilder.repository.UserRepository;
import com.pcbuilder.security.services.UserDetailsServiceImpl;
import com.pcbuilder.payload.request.LoginRequest;
import com.pcbuilder.payload.request.SignupRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.junit.jupiter.api.Assertions.*;

public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserDetailsServiceImpl userDetailsService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testLoadUserByUsername() {
        User user = new User();
        user.setUsername("testuser");
        user.setPassword("encodedPassword");
        user.setEmail("test@example.com");

        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));

        UserDetails userDetails = userDetailsService.loadUserByUsername("testuser");
        
        assertNotNull(userDetails);
        assertEquals("testuser", userDetails.getUsername());
    }

    @Test
    void testLoadUserByUsernameNotFound() {
        when(userRepository.findByUsername("nonexistentuser")).thenReturn(Optional.empty());

        assertThrows(UsernameNotFoundException.class, () -> {
            userDetailsService.loadUserByUsername("nonexistentuser");
        });
    }

    @Test
    void testUserExists() {
        when(userRepository.existsByUsername("existinguser")).thenReturn(true);
        when(userRepository.existsByEmail("existing@example.com")).thenReturn(true);

        assertTrue(userRepository.existsByUsername("existinguser"));
        assertTrue(userRepository.existsByEmail("existing@example.com"));
    }

    @Test
    void testUserDoesNotExist() {
        when(userRepository.existsByUsername("newuser")).thenReturn(false);
        when(userRepository.existsByEmail("new@example.com")).thenReturn(false);

        assertFalse(userRepository.existsByUsername("newuser"));
        assertFalse(userRepository.existsByEmail("new@example.com"));
    }
} 