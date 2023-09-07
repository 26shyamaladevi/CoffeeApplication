package com.example.CoffeeApp.security;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.CoffeeApp.domains.Role;
import com.example.CoffeeApp.dto.UserDto;

import jakarta.servlet.ServletException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final UserAuthProvider userAuthProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
            FilterChain filterChain) throws IOException, ServletException {

        String header = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (header != null) {
            String[] elements = header.split(" ");

            if (elements.length == 2 && "Bearer".equals(elements[0])) {
                try {
                    Authentication authentication = userAuthProvider.validateToken(elements[1]);

                    if (authentication != null && authentication.isAuthenticated()) {
                        UserDto user = (UserDto) authentication.getPrincipal();
                        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
                        Role role = user.getRole();
                        authorities.add(new SimpleGrantedAuthority(role.getRName()));
                        UsernamePasswordAuthenticationToken updatedAuthentication = new UsernamePasswordAuthenticationToken(
                                user, null, authorities);
                        updatedAuthentication.setDetails(authentication.getDetails());
                        SecurityContextHolder.getContext().setAuthentication(updatedAuthentication);
                    }

                } catch (RuntimeException e) {
                    SecurityContextHolder.clearContext();
                    throw e;
                }
            }
        }

        filterChain.doFilter(request, response);
    }

}
