package com.book.LibraryManagementSystem.LibraryDTO;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Data
public class UserResponse {

    private Long id;
    private String username;
    private String email;
    private String password;
    private String role;
}
