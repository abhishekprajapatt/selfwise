package com.book.LibraryManagementSystem.Service;

import com.book.LibraryManagementSystem.Exception.LibraryException;
import com.book.LibraryManagementSystem.LibraryDTO.UserRequest;
import com.book.LibraryManagementSystem.LibraryDTO.UserResponse;
import com.book.LibraryManagementSystem.Model.Role;
import com.book.LibraryManagementSystem.Model.UserModel;
import com.book.LibraryManagementSystem.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private Optional<UserModel> findUserById(Long userId) {
        Optional<UserModel> user = userRepository.findById(userId);
        if (!user.isPresent()) {
            throw new LibraryException("User", "id", userId, HttpStatus.NOT_FOUND);
        }
        return user;
    }

    public UserResponse createUser(UserRequest userRequest) {
        if (userRequest.getUsername() == null || userRequest.getEmail() == null) {
            throw new LibraryException("Username and Email cannot be null", HttpStatus.BAD_REQUEST);
        }

        UserModel user = new UserModel();
        user.setUsername(userRequest.getUsername());
        user.setEmail(userRequest.getEmail());
        user.setPassword(userRequest.getPassword());
        user.setRole(userRequest.getRole());

        UserModel newUser = userRepository.save(user);
        return mapToUserResponse(newUser);
    }

    public List<UserResponse> getAllUsers() {
        List<UserModel> allUsers = userRepository.findAll();
        return allUsers.stream()
                .map(this::mapToUserResponse)
                .collect(Collectors.toList());
    }

    public UserResponse getUserById(Long userId) {
        UserModel user = findUserById(userId).get();
        return mapToUserResponse(user);
    }

    public String updateRole(String changedRole, Long userId) {
        UserModel user = findUserById(userId).get();

        // Convert String to Enum (Role)
        Role newRole;
        try {
            newRole = Role.valueOf(changedRole.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new LibraryException("Invalid role: " + changedRole, HttpStatus.BAD_REQUEST);
        }

        if (user.getRole().equals(newRole)) {
            return "User  already has the role of " + changedRole;
        }

        user.setRole(newRole);
        userRepository.save(user);
        return "User  role updated to " + changedRole;
    }

    public String updateUserInfo(UserRequest userRequest, Long userId) {
        UserModel user = findUserById(userId).get();

        user.setUsername(userRequest.getUsername());
        user.setEmail(userRequest.getEmail());
        user.setPassword(userRequest.getPassword());
        user.setRole(userRequest.getRole());

        userRepository.save(user);
        return "User  information updated successfully";
    }

    public String deleteUser(Long userId) {
        UserModel user = findUserById(userId).get();
        userRepository.deleteById(userId);
        return "User  deleted successfully";
    }

    private UserResponse mapToUserResponse(UserModel user) {
        return new UserResponse(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getPassword(),
                user.getRole().name());
    }
}
