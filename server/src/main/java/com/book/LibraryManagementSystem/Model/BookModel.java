package com.book.LibraryManagementSystem.Model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Getter
@Setter
@Table(name = "books")
public class BookModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Title is required")
    @Size(min = 2, max = 200, message = "Title must be between 2 and 200 characters")
    @Column(nullable = false, length = 200)
    private String title;

    @NotBlank(message = "Description is required")
    @Size(min = 10, max = 2000, message = "Description must be between 10 and 2000 characters")
    @Column(nullable = false, length = 2000)
    private String description;

    @NotNull(message = "Publish year is required")
    @Min(value = 1450, message = "Publish year must be 1450 or later")
    @Max(value = 2100, message = "Publish year cannot be in the far future")
    @Column(nullable = false)
    private Long publishYear;

    @NotBlank(message = "Author name is required")
    @Size(min = 2, max = 100, message = "Author name must be between 2 and 100 characters")
    @Column(nullable = false, length = 100)
    private String author;

    @NotBlank(message = "Genre is required")
    @Size(min = 3, max = 50, message = "Genre must be between 3 and 50 characters")
    @Column(nullable = false, length = 50)
    private String genre;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.01", message = "Price must be at least 0.01")
    @Column(nullable = false)
    private BigDecimal price;

    @PastOrPresent(message = "Created date must be in the past or present")
    @Column(nullable = false, updatable = false)
    private LocalDate createdAt = LocalDate.now();
}
