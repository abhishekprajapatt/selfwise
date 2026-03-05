package com.book.LibraryManagementSystem.LibraryDTO;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Data
public class FineRequest {
    private Long userId;
    private Long checkoutId;
    private BigDecimal amount;
    private LocalDate dueDate;
    private String status;
}
