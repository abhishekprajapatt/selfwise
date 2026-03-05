package com.book.LibraryManagementSystem.Model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;
import java.math.BigDecimal;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Data
@Table(name = "fines")
public class FineModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "User ID is required")
    @Column(nullable = false)
    private Long userId;

    @NotNull(message = "Checkout ID is required")
    @Column(nullable = false)
    private Long checkoutId;

    @NotNull(message = "Fine amount is required")
    @Min(value = 0, message = "Fine amount must be positive")
    @Column(nullable = false)
    private BigDecimal amount;

    @Column(nullable = false)
    private LocalDate createdDate = LocalDate.now();

    @Column(nullable = false)
    private LocalDate dueDate;

    @Column
    private LocalDate paidDate;

    @Column(nullable = false)
    private String status = "PENDING"; // PENDING, PAID, WAIVED
}
