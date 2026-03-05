package com.book.LibraryManagementSystem.Controller;

import com.book.LibraryManagementSystem.LibraryDTO.UserRequest;
import com.book.LibraryManagementSystem.LibraryDTO.UserResponse;
import com.book.LibraryManagementSystem.Service.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@Tag(name = "UserController",description = "RestApi for User Controller")

public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<UserResponse> createUser(@RequestBody UserRequest userRequest)
    {
        UserResponse user= userService.createUser(userRequest);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/getAllUsers")
    public ResponseEntity<List<UserResponse>> getAllUsers()
    {
        List<UserResponse> users= userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/getUserById/{userId}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable Long userId)
    {
        UserResponse users= userService.getUserById(userId);
        return ResponseEntity.ok(users);
    }

    @PutMapping("/update/role/{role}/{userId}")
    public ResponseEntity<String> updateRole(@PathVariable String role,@PathVariable Long userId)
    {
        String message= userService.updateRole(role,userId);
        return ResponseEntity.ok(message);
    }

    @PutMapping("/update/{userId}")
    public ResponseEntity<String> updateUserInfo(@RequestBody UserRequest userRequest, @PathVariable Long userId)
    {
        String message= userService.updateUserInfo(userRequest,userId);
        return ResponseEntity.ok(message);
    }


    @DeleteMapping("/deleteUserById/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable Long userId)
    {
        String message= userService.deleteUser(userId);
        return ResponseEntity.ok(message);
    }
}
