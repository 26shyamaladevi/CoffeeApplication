package com.example.CoffeeApp.controllers;

import com.example.CoffeeApp.services.UserService;
import java.util.List;
import com.example.CoffeeApp.domains.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

// Controller for managing user-related operations
// Handles requests related to users, such as retrieval, creation, update, and deletion

@RestController
// @CrossOrigin(origins = "http://localhost:5173", allowedHeaders = {
// "Authorization", "Origin" }, exposedHeaders = {
// "Access-Control-Allow-Origin",
// "Access-Control-Allow-Credentials" })

public class UserController {
    @Autowired
    private UserService userservice;

    // View Users
    @GetMapping("/users")
    public List<User> getUsers() {
        return userservice.viewUsers();
    }

    // AddNewuser
    @CrossOrigin(origins = "http://localhost:5173", exposedHeaders = "X-Get-Header", maxAge = 300)
    @PostMapping("/users/add")
    public String addNewUsers(@RequestBody User user) {
        if (userservice.isexistsByEmail(user.getEmailId())) {
            userservice.addUsers(user);
            return "New User Added";
        } else {
            return "User already exsists";
        }

    }

    // Update User
    @PutMapping(value = "/users/update")
    public ResponseEntity<String> updateUsers(@RequestBody User user) {
        boolean isId = userservice.isexistsByUserId(user.getUserId());

        if (isId) {
            String msg = userservice.updateUser(user);
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(msg);

        } else {
            // Return custom error response with 404 status code
            String errorMsg = user.getUserId() + " does not exist";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMsg);
        }

    }

    // Delete User
    @DeleteMapping("/users/delete/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id) {
        boolean deleted = userservice.deleteUser(id);
        if (deleted) {
            return ResponseEntity.ok("User deleted successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
