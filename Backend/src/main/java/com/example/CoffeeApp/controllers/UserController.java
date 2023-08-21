package com.example.CoffeeApp.controllers;

import com.example.CoffeeApp.services.UserService;
import java.util.List;
import com.example.CoffeeApp.domains.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/user/{emailId}")
    public User getUser(@PathVariable("emailId") String emailId) {
        return userservice.viewUser(emailId);
    }

    @GetMapping("/user/{emailId}/{password}")
    public ResponseEntity<String> getpasswordMatch(@PathVariable("emailId") String emailId,
            @PathVariable("password") String password) {

        if (userservice.passwordMatch(emailId, password)) {
            return ResponseEntity.ok("Password Match");
        } else {
            return ResponseEntity.status(401).body("Current Password does not match. Please check!");
        }
    }

    // AddNewuser
    // @CrossOrigin(origins = "http://localhost:5173", exposedHeaders =
    // "X-Get-Header", maxAge = 300)
    @PostMapping("/users/add")
    public ResponseEntity<String> addNewUsers(@RequestBody User user) {
        if (userservice.isexistsByEmail(user.getEmailId())) {
            userservice.addUsers(user);
            return ResponseEntity.ok("Account Created Sucessfully!");
        } else {
            return ResponseEntity.status(409).body("User with emailId: " + user.getEmailId() + " already exsists!");
        }

    }

    // Update User
    @PutMapping("/user/update/{emailId}/{password}")
    public ResponseEntity<String> updateUsers(@PathVariable("emailId") String emailId,
            @PathVariable("password") String password) {

        User currUser = userservice.findByEmailId(emailId);

        if (currUser != null) {
            System.out.print(currUser + "InsidecurrUser");
            String msg = userservice.updateUser(currUser, password);
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(msg);

        } else {
            // Return custom error response with 404 status code
            String errorMsg = emailId + " does not exist";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMsg);
        }

    }

    // Delete User
    @DeleteMapping("/user/delete/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable("id") String id) {
        Long userId = Long.parseLong(id);
        boolean deleted = userservice.deleteUser(userId);
        if (deleted) {
            return ResponseEntity.ok("User deleted successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
