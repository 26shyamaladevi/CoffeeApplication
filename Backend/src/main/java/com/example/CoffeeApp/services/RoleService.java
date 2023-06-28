package com.example.CoffeeApp.services;

import java.util.List;
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
    public void addRoles(Role role) {
        if (role.getRName().isEmpty()) {
            Role user_role = role;
            String USER = "USER";
            user_role.setRName(USER);
            user_role.setR_id(USER.hashCode());
            rolerepo.save(user_role);

        } else {
            long uniqueId = role.getRName().hashCode();

            if (rolerepo.existsById(uniqueId) == false) {
                Role new_role = role;
                new_role.setR_id(uniqueId);
                rolerepo.save(new_role);
                System.out.println("saved");
            }

        }

    }

}
