package com.example.CoffeeApp.repositories;

import org.springframework.data.repository.CrudRepository;

import com.example.CoffeeApp.domains.Role;

public interface RoleRepo extends CrudRepository<Role, Long> {
    boolean existsByRName(String role);

    boolean existsById(long id);
    // Role findAll(Role role);
}
