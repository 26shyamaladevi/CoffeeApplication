package com.example.CoffeeApp.controllers;

import java.util.Map;

import com.example.CoffeeApp.domains.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.CoffeeApp.services.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = {
        "Authorization", "Origin" }, exposedHeaders = {
                "Access-Control-Allow-Origin",
                "Access-Control-Allow-Credentials" })
public class LoginController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/l/get")
    public ResponseEntity<String> check() {
        return ResponseEntity.ok("Hey Inside get Login");
    }

    @PostMapping("/log-in")
    // @CrossOrigin(origins = "http://localhost:5173", exposedHeaders =
    // "X-Get-Header", maxAge = 3600)
    public ResponseEntity<String> login(@RequestBody Map<String, String> requestBody) {
        // Perform authentication by checking the provided credentials against the user
        // database
        String userEmail = requestBody.get("emailId");
        String password = requestBody.get("password");
        User user = userService.loadUserByEmail(userEmail);

        System.out.println(user);

        // return ResponseEntity.ok("Hey Inside Login");

        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            // Authentication successful
            return ResponseEntity.ok("Login Successful");
        } else {
            // Authentication failed
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login Failed");
        }
    }
}
