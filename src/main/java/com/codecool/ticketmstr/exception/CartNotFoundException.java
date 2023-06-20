package com.codecool.ticketmstr.exception;

public class CartNotFoundException extends RuntimeException{
    public CartNotFoundException(Integer id){
        super("Could not found the user with id "+ id);
    }
}
