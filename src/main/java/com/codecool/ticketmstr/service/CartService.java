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
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserRepository userRepository;


    public CartService(CartRepository cartRepository, UserRepository userRepository) {
        this.cartRepository = cartRepository;
        this.userRepository = userRepository;
    }

    public Cart newCart(@RequestBody Cart newCart, Integer userId) {
        ApplicationUser user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));

        newCart = cartRepository.save(newCart);

        user.getCartList().add(newCart);
        userRepository.save(user);

        return newCart;
    }

    public List<Cart> getAllCarts(Integer userId) {
        ApplicationUser user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));

        return new ArrayList<>(user.getCartList());
    }
    public String deleteCart(Integer userId, Long cartId) {
        ApplicationUser user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));

        Cart cart = cartRepository.findById(Math.toIntExact(cartId))
                .orElseThrow(() -> new FavoriteNotFoundException(Math.toIntExact(cartId)));

        user.getCartList().remove(cart);
        userRepository.save(user);

        cartRepository.deleteById(Math.toIntExact(cartId));

        return "The favorite ticket with id " + cartId + " has been deleted successfully.";
    }

    public String deleteAllItems(Integer userId) {
        ApplicationUser user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));

        Set<Cart> cartList = user.getCartList();
        cartList.clear();

        userRepository.save(user);

        return "All items in the cart have been deleted successfully.";
    }
}
