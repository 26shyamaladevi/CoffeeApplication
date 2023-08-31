package com.example.CoffeeApp.security;

import java.sql.Date;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Base64;
import java.util.Collections;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Component;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import com.example.CoffeeApp.dto.UserDto;
import com.example.CoffeeApp.services.UserService;

@RequiredArgsConstructor
@Component
public class UserAuthProvider {

    @Value("${security.jwt.tokesecret-key:mysecretkey}")
    private String secretKey;

    private final UserService userService;

    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public String createToken(String login) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime validity = now.plusMinutes(3);

        java.util.Date nowDate = Date.from(now.atZone(ZoneId.systemDefault()).toInstant());
        java.util.Date validDate = Date.from(validity.atZone(ZoneId.systemDefault()).toInstant());

        return JWT.create()
                .withJWTId(UUID.randomUUID().toString())
                .withSubject(login)
                .withIssuedAt(nowDate)
                .withExpiresAt(validDate)
                .sign(Algorithm.HMAC256(secretKey));

    }

    public Authentication validateToken(String token) {
        JWTVerifier verifier = JWT.require(Algorithm.HMAC256(secretKey)).build();

        DecodedJWT decoded = verifier.verify(token);
        String login = decoded.getSubject();
        UserDto user = userService.findByLogin(login);

        return new UsernamePasswordAuthenticationToken(user, null, Collections.emptyList());

    }

}
