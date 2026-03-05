package com.book.LibraryManagementSystem.Model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Data
@Table(name = "checkout")
public class BookCheckoutModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Book ID is required")
    @Column(nullable = false)
    private Long bookId;

    @NotNull(message = "Requested quantity is required")
    @Min(value = 1, message = "Requested quantity must be at least 1")
    @Column(nullable = false)
    private Integer requestedQuantity;

    @NotNull(message = "User ID is required")
    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false, updatable = false)
    private LocalDate issuedAt = LocalDate.now();

    @Column(nullable = false, updatable = false)
    private LocalDate dueDate = LocalDate.now().plusDays(30);
}
