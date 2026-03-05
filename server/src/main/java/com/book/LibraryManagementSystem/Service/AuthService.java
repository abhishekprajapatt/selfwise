package com.book.LibraryManagementSystem.Service;

import com.book.LibraryManagementSystem.Exception.LibraryException;
import com.book.LibraryManagementSystem.LibraryDTO.AuthResponse;
import com.book.LibraryManagementSystem.LibraryDTO.LoginRequest;
import com.book.LibraryManagementSystem.LibraryDTO.SignupRequest;
import com.book.LibraryManagementSystem.Model.Role;
import com.book.LibraryManagementSystem.Model.UserModel;
import com.book.LibraryManagementSystem.Repository.UserRepository;
import com.book.LibraryManagementSystem.Security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;

    @Value("${admin.code:selfwise-8080}")
    private String adminCode;

    @Autowired
    public AuthService(UserRepository userRepository, JwtTokenProvider jwtTokenProvider) {
        this.userRepository = userRepository;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    public AuthResponse signup(SignupRequest signupRequest) {
        // Check if email already exists
        if (userRepository.findByEmail(signupRequest.getEmail()).isPresent()) {
            throw new LibraryException("Email already registered", HttpStatus.BAD_REQUEST);
        }

        // Check if username already exists
        if (userRepository.findByUsername(signupRequest.getUsername()).isPresent()) {
            throw new LibraryException("Username already taken", HttpStatus.BAD_REQUEST);
        }

        // Determine role based on admin code
        Role userRole = Role.USER;
        if (signupRequest.getAdminCode() != null &&
                !signupRequest.getAdminCode().isEmpty() &&
                signupRequest.getAdminCode().equals(adminCode)) {
            userRole = Role.ADMIN;
        }

        // Create and save new user
        UserModel user = new UserModel();
        user.setUsername(signupRequest.getUsername());
        user.setEmail(signupRequest.getEmail());
        user.setPassword(signupRequest.getPassword()); // In production, hash this password!
        user.setRole(userRole);

        UserModel savedUser = userRepository.save(user);

        // Generate token
        String token = jwtTokenProvider.generateToken(savedUser.getId(), savedUser.getEmail());

        // Return response
        AuthResponse response = new AuthResponse();
        response.setUserId(savedUser.getId());
        response.setUsername(savedUser.getUsername());
        response.setEmail(savedUser.getEmail());
        response.setRole(savedUser.getRole());
        response.setToken(token);
        response.setMessage("User registered successfully");

        return response;
    }

    public AuthResponse login(LoginRequest loginRequest) {
        // Find user by email
        UserModel user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new LibraryException("User not found", HttpStatus.NOT_FOUND));

        // Check password (basic comparison - in production, use bcrypt or similar)
        if (!user.getPassword().equals(loginRequest.getPassword())) {
            throw new LibraryException("Invalid credentials", HttpStatus.UNAUTHORIZED);
        }

        // Generate token
        String token = jwtTokenProvider.generateToken(user.getId(), user.getEmail());

        // Return response
        AuthResponse response = new AuthResponse();
        response.setUserId(user.getId());
        response.setUsername(user.getUsername());
        response.setEmail(user.getEmail());
        response.setRole(user.getRole());
        response.setToken(token);
        response.setMessage("Login successful");

        return response;
    }

    public AuthResponse changeUserRole(Long userId, Role newRole) {
        UserModel user = userRepository.findById(userId)
                .orElseThrow(() -> new LibraryException("User not found", HttpStatus.NOT_FOUND));

        user.setRole(newRole);
        UserModel updatedUser = userRepository.save(user);

        AuthResponse response = new AuthResponse();
        response.setUserId(updatedUser.getId());
        response.setUsername(updatedUser.getUsername());
        response.setEmail(updatedUser.getEmail());
        response.setRole(updatedUser.getRole());
        response.setMessage("User role updated successfully");

        return response;
    }
}
