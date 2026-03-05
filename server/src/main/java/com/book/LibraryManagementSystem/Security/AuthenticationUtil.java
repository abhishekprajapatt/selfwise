package com.book.LibraryManagementSystem.Security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import jakarta.servlet.http.HttpServletRequest;

@Component
public class AuthenticationUtil {

    private final JwtTokenProvider jwtTokenProvider;

    @Autowired
    public AuthenticationUtil(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    public Long getUserIdFromRequest(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return null;
        }

        String token = authHeader.substring(7); // Remove "Bearer " prefix

        if (!jwtTokenProvider.validateToken(token)) {
            return null;
        }

        return jwtTokenProvider.getUserIdFromToken(token);
    }

    public String getEmailFromRequest(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return null;
        }

        String token = authHeader.substring(7);

        if (!jwtTokenProvider.validateToken(token)) {
            return null;
        }

        return jwtTokenProvider.getEmailFromToken(token);
    }
}
