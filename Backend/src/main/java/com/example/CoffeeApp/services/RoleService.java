package com.example.CoffeeApp.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import com.example.CoffeeApp.domains.Role;
import com.example.CoffeeApp.repositories.RoleRepo;

@Service
public class RoleService {
    private RoleRepo rolerepo;

    // Constructor Dependency
    public RoleService(RoleRepo roleRepo) {
        this.rolerepo = roleRepo;
    }

    // Retrieve all Roles
    public List<Role> viewRoles() {
        return (List<Role>) rolerepo.findAll();
    }

    public boolean isexistsByRole(String role) {
        return rolerepo.existsByRName(role);
    }

    // add New Roles
    public Optional<Role> addRoles(Role role) {
        if (role.getRName().isEmpty()) {
            Role user_role = new Role();
            String USER = "USER";
            user_role.setRName(USER);
            user_role.setR_id(USER.hashCode());
            rolerepo.save(user_role);
            return Optional.of(user_role);
        } else {
            long uniqueId = role.getRName().hashCode();
            System.out.println("Role: " + role.getRName());
            if (!rolerepo.existsById(uniqueId)) {
                Role new_role = new Role();
                new_role.setR_id(uniqueId);
                new_role.setRName(role.getRName());
                rolerepo.save(new_role);
                // System.out.println("saved");
                return Optional.of(new_role);
            } else {
                return rolerepo.findById(uniqueId);
            }
        }
    }

}
