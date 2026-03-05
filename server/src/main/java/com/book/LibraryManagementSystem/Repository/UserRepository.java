package com.book.LibraryManagementSystem.Repository;

import com.book.LibraryManagementSystem.Model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserModel, Long> {
    Optional<UserModel> findByEmail(String email);

    Optional<UserModel> findByUsername(String username);
}
