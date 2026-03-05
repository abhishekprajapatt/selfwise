package com.book.LibraryManagementSystem.LibraryDTO;

import jakarta.validation.constraints.*;
import lombok.*;
import com.book.LibraryManagementSystem.Model.Role;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Data
public class UserRequest {

    @NotBlank(message = "Username is required")
    @Size(min = 3, max = 20, message = "Username must be between 3 and 20 characters")
    private String username;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 6, max = 15, message = "Password must be between 6 and 15 characters")
    private String password;

    private Role role;
}
