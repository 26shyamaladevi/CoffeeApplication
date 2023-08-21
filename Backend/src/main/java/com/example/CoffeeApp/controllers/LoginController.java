package com.example.CoffeeApp.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.CoffeeApp.dto.CredentialDto;
import com.example.CoffeeApp.dto.UserDto;
import com.example.CoffeeApp.security.UserAuthProvider;
import com.example.CoffeeApp.services.UserService;

@RestController
// @CrossOrigin(origins = "http://localhost:5173", allowedHeaders = {
// "Authorization", "Origin" }, exposedHeaders = {
// "Access-Control-Allow-Origin",
// "Access-Control-Allow-Credentials" })
public class LoginController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserAuthProvider userAuthProvider;

    @PostMapping("/log-in")

    public ResponseEntity<UserDto> login(@RequestBody CredentialDto credentialDto) {
        UserDto user = userService.login(credentialDto);
        user.setToken(userAuthProvider.createToken(user.getEmailId()));
        System.out.println("Inside log in ");
        return ResponseEntity.ok(user);
    }

    SecurityContextLogoutHandler logoutHandler = new SecurityContextLogoutHandler();

    // @PostMapping("/log-out")
    // public String performLogout(Authentication authentication,
    // HttpServletRequest request, HttpServletResponse response) {

    // System.out.println("Inside logout");
    // System.out.println("Before logout - Is authenticated: " +
    // authentication.isAuthenticated());

    // // .. perform logout
    // this.logoutHandler.logout(request, response, authentication);
    // System.out.println("After logout - Is authenticated: " +
    // authentication.isAuthenticated());
    // System.out.println("Authentication after logout: " +
    // SecurityContextHolder.getContext().getAuthentication());String
    // return "/";
    // }
    @GetMapping("/admin")
    public String isAdmin() {
        return "Sucess Admin";
    }
}
