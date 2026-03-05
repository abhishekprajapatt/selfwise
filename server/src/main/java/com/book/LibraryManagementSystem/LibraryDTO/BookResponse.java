package com.book.LibraryManagementSystem.LibraryDTO;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
@AllArgsConstructor
@NoArgsConstructor
@Data
@Getter
@Setter
public class BookResponse {

    private Long id;
    private String Title;
    private String Description;
    private Long PublishYear;
    private String Author;
    private String Genre;
    private BigDecimal Price;
    private LocalDate CreatedAt;
}
