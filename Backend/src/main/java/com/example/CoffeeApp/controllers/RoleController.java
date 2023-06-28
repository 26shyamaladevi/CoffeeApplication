package com.example.CoffeeApp.controllers;

import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RestController;

import com.example.CoffeeApp.domains.Role;
import com.example.CoffeeApp.services.RoleService;

// Controller for managing role-related operations
@RestController
public class RoleController {
    @Autowired
    private RoleService roleservice;

    @GetMapping("/roles")
    public List<Role> getRoles() {
        return roleservice.viewRoles();
    }

    @PostMapping("/roles/add")
    public String addRoles(@RequestBody Role role) {
        // NullPointerException
        Objects.requireNonNull(role, "Role cannot be null");
        String rName = role.getRName();
        if (!(roleservice.isexistsByRole(rName))) {
            roleservice.addRoles(role);
            return "new role added";
        } else {
            return "Role already exsists";
        }

    }

}
