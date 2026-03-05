package com.book.LibraryManagementSystem.LibraryDTO;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Data
public class CheckOutRequest {

    @NotNull(message = "Book ID is required")
    private Long bookId;

    @NotNull(message = "Requested quantity is required")
    @Min(value = 1, message = "Requested quantity must be at least 1")
    private Integer requestedQuantity;

    @NotNull(message = "User ID is required")
    private Long userId;
}
