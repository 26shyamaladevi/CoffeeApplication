package com.example.CoffeeApp.services;

import com.example.CoffeeApp.repositories.UserRepo;
import com.example.CoffeeApp.domains.Role;
import com.example.CoffeeApp.domains.User;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/* Service class responsible for user-related operations.
Implements business logic for user management and interacts with UserRepo for data access */

@Service
public class UserService {
    public final UserRepo userrepo;
    public final RoleService roleService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Constructor injection of UserRepo,roleservice dependency
    public UserService(UserRepo userRepo, RoleService roleservice) {
        this.userrepo = userRepo;
        this.roleService = roleservice;
    }

    // Retrieve all users
    public List<User> viewUsers() {
        return (List<User>) userrepo.findAll();
    }

    // Add New User
    public void addUsers(User user) {
        if (user.getRole() != null && user.getRole().getRName() != null) {
            roleService.addRoles(user.getRole());
            User new_user = new User();
            new_user.setEmailId(user.getEmailId());
            new_user.setFirstName(user.getFirstName());
            new_user.setLastName(user.getLastName());
            new_user.setPassword(passwordEncoder.encode(user.getPassword()));

            userrepo.save(new_user);

        } else {
            Role userRole = null;
            roleService.addRoles(userRole);
            userrepo.save(user);

        }

    }

    // Check if a user with the given emailId already exists
    public boolean isexistsByEmail(String emailId) {
        return !userrepo.existsByEmailId(emailId);

    }

    // Check if a user with the given userId exists
    public boolean isexistsByUserId(long id) {
        return userrepo.existsById(id);
    }

    // loadUserByEmail

    public User loadUserByEmail(String email) {

        User user = userrepo.findByEmailId(email);
        return user;
    }

    // Update an existing user
    public String updateUser(User u) {

        userrepo.save(u);
        return "User " + u.getLastName() + " " + "with id:" + " " + u.getUserId() + " " + "is updated sucessfully.";
    }

    // Delete a user by ID
    public boolean deleteUser(Long id) {
        if (userrepo.existsById(id)) {
            userrepo.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    public User findById(Long id) {
        Optional<User> optionalUser = userrepo.findById(id);
        return optionalUser.orElse(null);
    }

    public org.apache.catalina.User loadUserByEmai(String userEmail) {
        return null;
    }

}
