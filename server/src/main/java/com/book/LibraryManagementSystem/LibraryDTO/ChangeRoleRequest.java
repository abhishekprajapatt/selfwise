package com.book.LibraryManagementSystem.LibraryDTO;

import com.book.LibraryManagementSystem.Model.Role;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ChangeRoleRequest {
    @NotNull(message = "User ID is required")
    private Long userId;

    @NotNull(message = "New role is required")
    private Role newRole;
}
