package com.codecool.ticketmstr.controller;

import com.codecool.ticketmstr.model.ApplicationUser;
import com.codecool.ticketmstr.model.LoginDTO;
import com.codecool.ticketmstr.model.LoginResponseDTO;
import com.codecool.ticketmstr.model.RegistrationDTO;
import com.codecool.ticketmstr.service.AuthenticationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import com.codecool.ticketmstr.service.TokenService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/register")
    public ApplicationUser registerUser(@RequestBody RegistrationDTO body){
        return authenticationService.registerUser(body.getUsername(),body.getPassword(),body.getEmail());
    }

    @PostMapping("/login")
    public LoginResponseDTO loginUser(@RequestBody LoginDTO body){
        return authenticationService.loginUser(body.getUsername(),body.getPassword());
    }

}