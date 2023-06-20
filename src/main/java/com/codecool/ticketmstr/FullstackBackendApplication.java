package com.codecool.ticketmstr;

import com.codecool.ticketmstr.model.ApplicationUser;
import com.codecool.ticketmstr.model.Cart;
import com.codecool.ticketmstr.model.Favorites;
import com.codecool.ticketmstr.model.Role;
import com.codecool.ticketmstr.repository.RoleRepository;
import com.codecool.ticketmstr.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.HashSet;
import java.util.Set;


@SpringBootApplication
@CrossOrigin(origins = "http://localhost:5173")
public class FullstackBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(FullstackBackendApplication.class, args);
	}


	@Bean
	CommandLineRunner run(RoleRepository roleRepository, UserRepository userRepository, PasswordEncoder passwordEncode){
		return args ->{
			if(roleRepository.findByAuthority("ADMIN").isPresent()) return;
			Role adminRole = roleRepository.save(new Role("ADMIN"));
			roleRepository.save(new Role("USER"));

			Set<Role> roles = new HashSet<>();
			roles.add(adminRole);
			Set<Favorites> favoritesList = new HashSet<>();

			Set<Cart> cartList = new HashSet<>();


			ApplicationUser admin = new ApplicationUser(1, "admin", passwordEncode.encode("passwordP1."), roles,favoritesList,cartList);

			userRepository.save(admin);
		};
	}
}

