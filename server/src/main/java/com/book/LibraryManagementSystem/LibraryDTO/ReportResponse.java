package com.book.LibraryManagementSystem.LibraryDTO;

import lombok.*;

import java.time.LocalDate;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ReportResponse {
    private Long id;
    private String reportType;
    private LocalDate generatedDate;
    private Long totalBooks;
    private Long booksIssued;
    private Long booksReturned;
    private Long overdueBooks;
    private Long totalUsers;
    private Long activeUsers;
    private String summary;
}
