package com.codecool.ticketmstr.controller;

import com.codecool.ticketmstr.model.Cart;
import com.codecool.ticketmstr.model.Favorites;
import com.codecool.ticketmstr.service.CartService;
import com.codecool.ticketmstr.service.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class CartController {

    private final CartService cartService;

    @Autowired
    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping("/cart/{userId}")
    public Cart newCart(@RequestBody Cart newCart, @PathVariable Integer userId) {
        return cartService.newCart(newCart, userId);
    }

    @GetMapping("/carts/{userId}")
    public List<Cart> getAllCarts(@PathVariable Integer userId) {
        return cartService.getAllCarts(userId);
    }

    @DeleteMapping("/cart/{userId}/{id}")
    public String deleteCart(@PathVariable Integer userId, @PathVariable Long id) {
        return cartService.deleteCart(userId, id);
    }

    @DeleteMapping("/cart/{userId}")
    public String deleteAllItems(@PathVariable Integer userId){
        return cartService.deleteAllItems(userId);
    }
}
