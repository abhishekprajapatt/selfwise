package com.book.LibraryManagementSystem.LibraryDTO;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Data
public class FineResponse {
    private Long id;
    private Long userId;
    private Long checkoutId;
    private BigDecimal amount;
    private LocalDate createdDate;
    private LocalDate dueDate;
    private LocalDate paidDate;
    private String status;
}
