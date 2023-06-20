package com.codecool.ticketmstr.service;

import com.codecool.ticketmstr.exception.FavoriteNotFoundException;
import com.codecool.ticketmstr.exception.UserNotFoundException;
import com.codecool.ticketmstr.model.ApplicationUser;
import com.codecool.ticketmstr.model.Cart;
import com.codecool.ticketmstr.model.Favorites;
import com.codecool.ticketmstr.repository.CartRepository;
import com.codecool.ticketmstr.repository.FavoritesRepository;
import com.codecool.ticketmstr.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;


import java.util.ArrayList;
import java.util.List;

@Service
public class UserService implements UserDetailsService {
@Autowired
    private  PasswordEncoder encoder;
    @Autowired
    private  UserRepository userRepository;
    @Autowired
    private  FavoritesRepository favoritesRepository;
    @Autowired
    private CartRepository cartRepository;

    @Autowired
    public UserService(UserRepository userRepository, FavoritesRepository favoritesRepository,CartRepository cartRepository, PasswordEncoder encoder) {
        this.userRepository = userRepository;
        this.favoritesRepository = favoritesRepository;
        this.cartRepository = cartRepository;
        this.encoder = encoder;
    }

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;

    }

    public ApplicationUser newUser(@RequestBody ApplicationUser newUser) {

        return userRepository.save(newUser);
    }


    public List<ApplicationUser> getAllUsers() {
        return userRepository.findAll();
    }


    public ApplicationUser getUserById(@PathVariable Integer id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
    }


    public ApplicationUser updateUser(@RequestBody ApplicationUser newUser, @PathVariable Integer id) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setUsername(newUser.getUsername());
                    user.setEmail(newUser.getEmail());
                    return userRepository.save(user);
                }).orElseThrow(() -> new UserNotFoundException(id));
    }


    public String deleteUser(@PathVariable Integer id){
        if(!userRepository.existsById(id)){
            throw new UserNotFoundException(id);
        }
        userRepository.deleteById(id);
        return  "User with id "+id+" has been deleted success.";
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("In the user details service");

        return userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("user is not valid"));
    }

    public Favorites addFavoriteToUser(Integer userId, Favorites favorite) {
        ApplicationUser user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));

        favorite = favoritesRepository.save(favorite);

        user.getFavoritesList().add(favorite);
        userRepository.save(user);

        return favorite;
    }
    public List<Favorites> getUserFavorites(Integer userId) {
        ApplicationUser user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));

        return new ArrayList<>(user.getFavoritesList());
    }

    public String removeFavoriteFromUser(Integer userId, Long favoriteId) {
        ApplicationUser user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));

        Favorites favorite = favoritesRepository.findById(favoriteId)
                .orElseThrow(() -> new FavoriteNotFoundException(Math.toIntExact(favoriteId)));

        user.getFavoritesList().remove(favorite);
        userRepository.save(user);

        favoritesRepository.deleteById(favoriteId);

        return "The favorite ticket with id " + favoriteId + " has been removed from the user's favorites successfully.";
    }

    public Cart addCartToUser(Integer userId, Cart cart) {
        ApplicationUser user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));

        cart = cartRepository.save(cart);

        user.getCartList().add(cart);
        userRepository.save(user);

        return cart;
    }
    public List<Cart> getUserCarts(Integer userId) {
        ApplicationUser user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));

        return new ArrayList<>(user.getCartList());
    }

    public String removeCartFromUser(Integer userId, Long cartId) {
        ApplicationUser user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));

        Cart cart = cartRepository.findById(Math.toIntExact(cartId))
                .orElseThrow(() -> new FavoriteNotFoundException(Math.toIntExact(cartId)));

        user.getCartList().remove(cart);
        userRepository.save(user);

        favoritesRepository.deleteById(cartId);

        return "The favorite ticket with id " + cartId + " has been removed from the user's favorites successfully.";
    }
}
