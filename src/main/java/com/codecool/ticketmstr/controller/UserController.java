package com.codecool.ticketmstr.controller;

import com.codecool.ticketmstr.model.ApplicationUser;
import com.codecool.ticketmstr.model.Cart;
import com.codecool.ticketmstr.model.Favorites;
import com.codecool.ticketmstr.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {


    @Autowired
    private UserService userService;

private PasswordEncoder encoder;

    public UserController(UserService userService, PasswordEncoder encoder) {
        this.userService = userService;
        this.encoder = encoder;
    }

    @PostMapping("/user")
   /* @PreAuthorize("hasRole('ROLE_ADMIN')")*/
    ApplicationUser newUser(@RequestBody ApplicationUser newUser) {
        newUser.setPassword(encoder.encode(newUser.getPassword()));
        return userService.newUser(newUser);
    }

    @GetMapping("/users")
   /* @PreAuthorize("hasRole('ROLE_USER')")*/
    List<ApplicationUser> getAllUsers() {
        return userService.getAllUsers();
    }
   /* @PreAuthorize("hasRole('ROLE_USER')")*/
    @GetMapping("/user/{id}")
    ApplicationUser getUserById(@PathVariable Integer id) {
        return userService.getUserById(id);
    }
   /* @PreAuthorize("hasRole('ROLE_ADMIN')")*/
    @PutMapping("/user/{id}")
    ApplicationUser updateUser(@RequestBody ApplicationUser newUser, @PathVariable Integer id) {
        return userService.updateUser(newUser,id);
    }
/*    @PreAuthorize("hasRole('ROLE_ADMIN')")*/
    @DeleteMapping("/user/{id}")
    String deleteUser(@PathVariable Integer id){
       return userService.deleteUser(id);
    }

    @PostMapping("/user/{userId}/favorite")
    public Favorites addFavoriteToUser(@PathVariable Integer userId, @RequestBody Favorites favorite) {
        return userService.addFavoriteToUser(userId, favorite);
    }

    @GetMapping("/user/{userId}/favorites")
    public List<Favorites> getUserFavorites(@PathVariable Integer userId) {
        return userService.getUserFavorites(userId);
    }

    @DeleteMapping("/user/{userId}/favorite/{favoriteId}")
    public String removeFavoriteFromUser(@PathVariable Integer userId, @PathVariable Long favoriteId) {
        return userService.removeFavoriteFromUser(userId, favoriteId);
    }

    @PostMapping("/user/{userId}/cart")
    public Cart addCartToUser(@PathVariable Integer userId, @RequestBody Cart cart) {
        return userService.addCartToUser(userId, cart);
    }

    @GetMapping("/user/{userId}/carts")
    public List<Cart> getUserCarts(@PathVariable Integer userId) {
        return userService.getUserCarts(userId);
    }

    @DeleteMapping("/user/{userId}/cart/{cartId}")
    public String removeCartFromUser(@PathVariable Integer userId, @PathVariable Long cartId) {
        return userService.removeFavoriteFromUser(userId, cartId);
    }
}
