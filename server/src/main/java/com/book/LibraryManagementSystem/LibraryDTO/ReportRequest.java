package com.book.LibraryManagementSystem.LibraryDTO;

import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ReportRequest {
    private String reportType;
    private Long totalBooks;
    private Long booksIssued;
    private Long booksReturned;
    private Long overdueBooks;
    private Long totalUsers;
    private Long activeUsers;
    private String summary;
}
