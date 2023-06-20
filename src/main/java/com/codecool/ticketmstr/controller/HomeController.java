package com.codecool.ticketmstr.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@CrossOrigin("*")
public class HomeController {

    @GetMapping("/dashboard")
    public String home(Principal principal){
        return "Hello, " + principal.getName();
    }

    @PreAuthorize("hasAuthority('SCOPE_read')")
    @GetMapping("/secure")
    public String secure(){
        return "This is secured!";
    }

}
