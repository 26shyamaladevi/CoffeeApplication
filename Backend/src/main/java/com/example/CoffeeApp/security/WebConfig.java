package com.example.CoffeeApp.security;

import org.springframework.security.config.Customizer;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import org.springframework.web.cors.CorsConfiguration;

import lombok.RequiredArgsConstructor;

import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;

import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
public class WebConfig {

        private final UserAuthenticationEntryPoint userAuthenticationEntryPoint;
        private final UserAuthProvider userAuthProvider;

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
                // UrlBasedCorsConfigurationSource src = new
                // UrlBasedCorsConfigurationSource(null);
                CorsConfiguration corsConfiguration = new CorsConfiguration();
                corsConfiguration.setAllowedHeaders(List.of("Authorization", "Cache-Control", "Content-Type"));
                corsConfiguration.setAllowedOrigins(List.of("http://localhost:5173"));
                corsConfiguration
                                .setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PUT", "OPTIONS", "PATCH",
                                                "DELETE"));
                corsConfiguration.setAllowCredentials(true);
                corsConfiguration.setExposedHeaders(List.of("Authorization"));
                corsConfiguration.setMaxAge(3600L);
                http
                                .exceptionHandling(exceptionHandling -> exceptionHandling
                                                .authenticationEntryPoint(userAuthenticationEntryPoint))
                                .cors(Customizer.withDefaults())
                                .addFilterBefore(new JwtAuthFilter(userAuthProvider), BasicAuthenticationFilter.class)
                                .csrf((csrf) -> csrf.disable())
                                // .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                                .sessionManagement((session) -> session
                                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                                .authorizeHttpRequests((requests) -> requests
                                                .requestMatchers(HttpMethod.POST, "/log-in", "/users/add").permitAll()
                                                .anyRequest().authenticated()

                                )
                                .logout(logout -> logout
                                                .logoutUrl("/logout")
                                                .invalidateHttpSession(true)
                                                .clearAuthentication(true)
                                                .logoutSuccessHandler((new HttpStatusReturningLogoutSuccessHandler(
                                                                HttpStatus.OK))));

                return http.build();
        }

        @Bean
        public PasswordEncoder passwordEncoder() {
                return new BCryptPasswordEncoder();
        }

}
