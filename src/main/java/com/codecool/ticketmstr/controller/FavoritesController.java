package com.codecool.ticketmstr.controller;

import com.codecool.ticketmstr.model.Favorites;
import com.codecool.ticketmstr.service.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class FavoritesController {

    private final FavoriteService favoriteService;

    @Autowired
    public FavoritesController(FavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    @PostMapping("/favorite/{userId}")
    public Favorites newFavorite(@RequestBody Favorites newFavorite, @PathVariable Integer userId) {
        return favoriteService.newFavorite(newFavorite, userId);
    }

    @GetMapping("/favorites/{userId}")
    public List<Favorites> getAllFavorites(@PathVariable Integer userId) {
        return favoriteService.getAllFavorites(userId);
    }

    @DeleteMapping("/favorite/{userId}/{id}")
    public String deleteFavorite(@PathVariable Integer userId, @PathVariable Long id) {
        return favoriteService.deleteFavorite(userId, id);
    }
}