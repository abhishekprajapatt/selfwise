package com.book.LibraryManagementSystem.LibraryDTO;

import com.book.LibraryManagementSystem.Model.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AuthResponse {
    private Long userId;
    private String username;
    private String email;
    private Role role;
    private String token;
    private String message;
}
