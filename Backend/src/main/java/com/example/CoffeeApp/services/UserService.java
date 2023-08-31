package com.example.CoffeeApp.services;

import com.example.CoffeeApp.repositories.UserRepo;
import com.example.CoffeeApp.domains.Role;
import com.example.CoffeeApp.domains.User;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.CoffeeApp.dto.UserDto;
import com.example.CoffeeApp.dto.CredentialDto;
import com.example.CoffeeApp.mappers.UserMapper;
import com.example.CoffeeApp.exception.AppException;

/* Service class responsible for user-related operations.
Implements business logic for user management and interacts with UserRepo for data access */

@Service
public class UserService {
    public final UserRepo userrepo;
    public final RoleService roleService;
    private final UserMapper userMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Constructor injection of UserRepo,roleservice dependency
    public UserService(UserRepo userRepo, RoleService roleservice, UserMapper userMapper) {
        this.userrepo = userRepo;
        this.roleService = roleservice;
        this.userMapper = userMapper;
    }

    // Retrieve all users
    public List<User> viewUsers() {
        return (List<User>) userrepo.findAll();
    }

    // Retrive the specified User
    public User viewUser(String emailId) {

        return userrepo.findByEmailId(emailId);

    }

    // Password Match
    public Boolean passwordMatch(String emailId, String password) {
        User currentUser = userrepo.findByEmailId(emailId);
        String currentUserPassword = currentUser.getPassword();
        if (passwordEncoder.matches(password, currentUserPassword)) {
            return true;
        } else {
            return false;

        }

    }

    // Add New User
    public void addUsers(User user) {
        if (user.getRole() != null && user.getRole().getRName() != null) {
            Optional<Role> role = roleService.addRoles(user.getRole());

            User new_user = new User();
            new_user.setEmailId(user.getEmailId());
            new_user.setFirstName(user.getFirstName());
            new_user.setLastName(user.getLastName());
            new_user.setPassword(passwordEncoder.encode(user.getPassword()));
            new_user.setRole(role.orElse(null));
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
        if (user != null) {
            user.setRole(user.getRole());
        }
        return user;
    }

    // Update an existing user
    public String updateUser(User u, String password) {

        u.setPassword(passwordEncoder.encode(password));
        userrepo.save(u);
        return "Password updated sucessfully!";
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

    public User findByEmailId(String EmailId) {
        User user = userrepo.findByEmailId(EmailId);
        return user;

    }

    public UserDto findByLogin(String login) {
        User user = userrepo.findByEmailId(login);
        if (user == null) {
            throw new AppException("Unknown user", HttpStatus.NOT_FOUND);
        }
        return userMapper.toUserDto(user);

    }

    public UserDto login(CredentialDto credentialDto) {

        User user = userrepo.findByEmailId(credentialDto.getEmailId());
        if (user == null) {
            throw new AppException("Unknown user", HttpStatus.NOT_FOUND);
        }

        else if (passwordEncoder.matches(credentialDto.getPassword(), user.getPassword())) {
            return userMapper.toUserDto(user);
        }

        else {
            throw new AppException("Invalid Password", HttpStatus.BAD_REQUEST);
        }

    }

}
