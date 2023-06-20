package com.codecool.ticketmstr.model;

import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import com.codecool.ticketmstr.repository.FavoritesRepository;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="users")
public class ApplicationUser implements UserDetails {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer userId;
    @Column(unique=true)
    private String username;
    private String password;
    private String email;

    @ManyToMany(fetch=FetchType.EAGER)
    @JoinTable(
            name="user_role_junction",
            joinColumns = {@JoinColumn(name="user_id")},
            inverseJoinColumns = {@JoinColumn(name="role_id")}
    )
    private Set<Role> authorities;
    @ManyToMany(fetch=FetchType.EAGER)
    @JoinTable(
            name="user_favorites_junction",
            joinColumns = {@JoinColumn(name="user_id")},
            inverseJoinColumns = {@JoinColumn(name="fav_id")}
    )
    private Set<Favorites> favoritesList;

    @ManyToMany(fetch=FetchType.EAGER)
    @JoinTable(
            name="user_cart_junction",
            joinColumns = {@JoinColumn(name="user_id")},
            inverseJoinColumns = {@JoinColumn(name="cart_id")}
    )
    private Set<Cart> cartList;


    public ApplicationUser() {
        super();
        authorities = new HashSet<>();
        favoritesList = new HashSet<>();
        cartList = new HashSet<>();
    }

    public ApplicationUser(Integer userId, String username, String password, Set<Role> authorities,Set<Favorites> favoritesList, Set<Cart> cartList) {
        super();
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.authorities = authorities;
        this.favoritesList = favoritesList;
        this.cartList = cartList;

    }

    public ApplicationUser(Integer userId, String username, String password, String email, Set<Role> authorities, Set<Favorites> favoritesList,Set<Cart> cartList) {
        super();
        this.userId = userId;
        this.username = username;
        this.password = password;

        this.email = email;
        this.authorities = authorities;
        this.favoritesList = favoritesList;
        this.cartList = cartList;
    }
    public Set<Favorites> getFavoritesList() {
        return favoritesList;
    }

    public void setFavoritesList(Set<Favorites> favoritesList) {
        this.favoritesList = favoritesList;
    }
    public Integer getUserId() {
        return this.userId;
    }

    public void setId(Integer userId) {
        this.userId = userId;
    }

    public void setAuthorities(Set<Role> authorities) {
        this.authorities = authorities;
    }

    public Set<Cart> getCartList() {
        return cartList;
    }

    public void setCartList(Set<Cart> cartList) {
        this.cartList = cartList;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // TODO Auto-generated method stub
        return this.authorities;
    }

    @Override
    public String getPassword() {
        // TODO Auto-generated method stub
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String getUsername() {
        // TODO Auto-generated method stub
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }



    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    /* If you want account locking capabilities create variables and ways to set them for the methods below */
    @Override
    public boolean isAccountNonExpired() {
        // TODO Auto-generated method stub
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        // TODO Auto-generated method stub
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        // TODO Auto-generated method stub
        return true;
    }

    @Override
    public boolean isEnabled() {
        // TODO Auto-generated method stub
        return true;
    }

}