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
            Role userRole = new Role();
            String user = "USER";
            userRole.setRName(user);
            userRole.setR_id(user.hashCode());
            rolerepo.save(userRole);
            return Optional.of(userRole);
        } else {
            long uniqueId = role.getRName().hashCode();
            if (!rolerepo.existsById(uniqueId)) {
                Role newRole = new Role();
                newRole.setR_id(uniqueId);
                newRole.setRName(role.getRName());
                rolerepo.save(newRole);
                return Optional.of(newRole);
            } else {
                return rolerepo.findById(uniqueId);
            }
        }
    }

}
