package com.codecool.ticketmstr.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name="cart")
public class Cart {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer cartId;
    private String name;
    private String location;
    private String eventHour;
    private String eventDate;
    private String city;
    private String state;
    private String country;
    private String street;
    private String priceRange;
    private String postalCode;
    private String promoter;
    private String eventType;
    private String attraction;
    private String upcomingEvents;
    private String imageUrl;
    private boolean child;
}
