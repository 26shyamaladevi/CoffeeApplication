package com.example.CoffeeApp.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.CoffeeApp.dto.CredentialDto;
import com.example.CoffeeApp.dto.UserDto;
import com.example.CoffeeApp.security.UserAuthProvider;
import com.example.CoffeeApp.services.UserService;

@RestController
public class LoginController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserAuthProvider userAuthProvider;

    @PostMapping("/log-in")

    public ResponseEntity<UserDto> login(@RequestBody CredentialDto credentialDto) {
        UserDto user = userService.login(credentialDto);
        user.setToken(userAuthProvider.createToken(user.getEmailId()));
        return ResponseEntity.ok(user);
    }

    SecurityContextLogoutHandler logoutHandler = new SecurityContextLogoutHandler();

}
