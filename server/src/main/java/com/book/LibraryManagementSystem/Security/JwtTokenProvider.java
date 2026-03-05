package com.book.LibraryManagementSystem.Security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.util.Date;

@Component
public class JwtTokenProvider {

    private static final long JWT_EXPIRATION = 86400000; // 24 hours in milliseconds

    @Value("${jwt.secret:selfwise-jwt-secret-key-do-not-use-in-production-use-strong-key}")
    private String jwtSecret;

    public String generateToken(Long userId, String email) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + JWT_EXPIRATION);

        // Simple JWT token format: header.payload.signature
        // For this basic implementation, we'll use a simple token format
        String header = encodeBase64("{\n\"typ\": \"JWT\",\n\"alg\": \"HS256\"}");
        String payload = encodeBase64("{\n\"userId\": " + userId + ",\n\"email\": \"" + email + "\",\n\"iat\": "
                + now.getTime() + ",\n\"exp\": " + expiryDate.getTime() + "}");
        String signature = generateSignature(header + "." + payload);

        return header + "." + payload + "." + signature;
    }

    public boolean validateToken(String token) {
        try {
            if (token == null || !token.contains(".")) {
                return false;
            }
            String[] parts = token.split("\\.");
            if (parts.length != 3) {
                return false;
            }
            String payload = parts[1];
            String decodedPayload = decodeBase64(payload);

            // Extract expiration time
            int expIndex = decodedPayload.indexOf("\"exp\": ");
            if (expIndex != -1) {
                int endIndex = decodedPayload.indexOf(",", expIndex);
                if (endIndex == -1) {
                    endIndex = decodedPayload.indexOf("}", expIndex);
                }
                String expStr = decodedPayload.substring(expIndex + 7, endIndex).trim();
                long expiryTime = Long.parseLong(expStr);
                return System.currentTimeMillis() <= expiryTime;
            }
            return false;
        } catch (Exception e) {
            return false;
        }
    }

    public Long getUserIdFromToken(String token) {
        try {
            String[] parts = token.split("\\.");
            String payload = decodeBase64(parts[1]);

            int userIdIndex = payload.indexOf("\"userId\": ");
            if (userIdIndex != -1) {
                int startIndex = userIdIndex + 10;
                int endIndex = payload.indexOf(",", startIndex);
                String userIdStr = payload.substring(startIndex, endIndex).trim();
                return Long.parseLong(userIdStr);
            }
        } catch (Exception e) {
            // Log error if needed
        }
        return null;
    }

    public String getEmailFromToken(String token) {
        try {
            String[] parts = token.split("\\.");
            String payload = decodeBase64(parts[1]);

            int emailIndex = payload.indexOf("\"email\": \"");
            if (emailIndex != -1) {
                int startIndex = emailIndex + 10;
                int endIndex = payload.indexOf("\"", startIndex);
                return payload.substring(startIndex, endIndex);
            }
        } catch (Exception e) {
            // Log error if needed
        }
        return null;
    }

    private String generateSignature(String message) {
        try {
            return encodeBase64(jwtSecret);
        } catch (Exception e) {
            return "";
        }
    }

    private String encodeBase64(String input) {
        return java.util.Base64.getEncoder().encodeToString(input.getBytes());
    }

    private String decodeBase64(String input) {
        return new String(java.util.Base64.getDecoder().decode(input));
    }
}
