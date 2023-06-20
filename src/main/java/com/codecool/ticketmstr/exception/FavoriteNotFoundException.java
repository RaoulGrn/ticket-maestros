package com.codecool.ticketmstr.exception;

public class FavoriteNotFoundException extends RuntimeException{
    public FavoriteNotFoundException(Integer id){
        super("Could not found the user with id "+ id);
    }
}
