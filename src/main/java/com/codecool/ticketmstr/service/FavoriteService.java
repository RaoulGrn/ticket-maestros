package com.codecool.ticketmstr.service;

import com.codecool.ticketmstr.exception.FavoriteNotFoundException;
import com.codecool.ticketmstr.exception.UserNotFoundException;
import com.codecool.ticketmstr.model.ApplicationUser;
import com.codecool.ticketmstr.model.Favorites;
import com.codecool.ticketmstr.repository.FavoritesRepository;
import com.codecool.ticketmstr.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;

@Service
public class FavoriteService {

    @Autowired
    private FavoritesRepository favoritesRepository;

    @Autowired
    private UserRepository userRepository;


    public FavoriteService(FavoritesRepository favoritesRepository, UserRepository userRepository) {
        this.favoritesRepository = favoritesRepository;
        this.userRepository = userRepository;
    }

    public Favorites newFavorite(@RequestBody Favorites newFavorite, Integer userId) {
        ApplicationUser user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));

        newFavorite = favoritesRepository.save(newFavorite);

        user.getFavoritesList().add(newFavorite);
        userRepository.save(user);

        return newFavorite;
    }

    public List<Favorites> getAllFavorites(Integer userId) {
        ApplicationUser user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));

        return new ArrayList<>(user.getFavoritesList());
    }
    public String deleteFavorite(Integer userId, Long favoriteId) {
        ApplicationUser user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));

        Favorites favorite = favoritesRepository.findById(favoriteId)
                .orElseThrow(() -> new FavoriteNotFoundException(Math.toIntExact(favoriteId)));

        user.getFavoritesList().remove(favorite);
        userRepository.save(user);

        favoritesRepository.deleteById(favoriteId);

        return "The favorite ticket with id " + favoriteId + " has been deleted successfully.";
    }
}
