package com.codecool.ticketmstr.controller;

import com.codecool.ticketmstr.model.ApplicationUser;
import com.codecool.ticketmstr.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin("*")
public class AdminController {

    @Autowired
    private UserService userService;
    @GetMapping("/")
    public String helloAdminController(){
        return "Admin access level";
    }


    @GetMapping("/users")
        /* @PreAuthorize("hasRole('ROLE_USER')")*/
    List<ApplicationUser> getAllUsers() {
        return userService.getAllUsers();
    }
}