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
@Table(name="favorites")
public class Favorites {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name="fav_id")
    private Long favId;
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
