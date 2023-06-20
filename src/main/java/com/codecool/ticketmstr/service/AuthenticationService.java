package com.codecool.ticketmstr.service;

import com.codecool.ticketmstr.model.*;
import com.codecool.ticketmstr.repository.RoleRepository;
import com.codecool.ticketmstr.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;

@Service
@Transactional
public class AuthenticationService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenService tokenService;



    public ApplicationUser registerUser(String username, String password, String email){

        String encodedPassword = passwordEncoder.encode(password);
        Role userRole = roleRepository.findByAuthority("USER").get();
        Set<Role> authorities = new HashSet<>();
        authorities.add(userRole);
        Set<Favorites> favoritesList = new HashSet<>();
        Set<Cart> cartList = new HashSet<>();

        ApplicationUser newUser = userRepository.save(new ApplicationUser(0, username, encodedPassword, email, authorities,favoritesList,cartList));
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password)
        );
        // Generate token for the registered user
        String token = tokenService.generateJwt( auth);

        // Update the user's token

        userRepository.save(newUser);

        return newUser;
    }

    public LoginResponseDTO loginUser(String username, String password){
        try{
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );
            String token = tokenService.generateJwt(auth);
            return new LoginResponseDTO(userRepository.findByUsername(username).get(), token);
        } catch(AuthenticationException e){
            return new LoginResponseDTO(null, "");
        }
    }

}