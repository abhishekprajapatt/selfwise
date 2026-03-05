package com.book.LibraryManagementSystem.LibraryDTO;

import lombok.*;

import java.time.LocalDate;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Data
public class CheckOutResponse {

    private Long bookId;
    private String title;
    private String genre;
    private Integer requestedQuantity;
    private Long userId;
    private LocalDate issuedAt;
}
