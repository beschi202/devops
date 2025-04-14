package com.pcbuilder.security.services;

import com.pcbuilder.model.User;
import com.pcbuilder.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(login)
                .orElseGet(() -> userRepository.findByEmail(login)
                        .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username/email: " + login)));

        return UserDetailsImpl.build(user);
    }
} 