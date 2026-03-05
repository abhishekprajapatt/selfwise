package com.book.LibraryManagementSystem.Model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Data
@Table(name = "reports")
public class ReportModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String reportType; // CIRCULATION, USER_ACTIVITY, INVENTORY, OVERDUE

    @Column(nullable = false)
    private LocalDate generatedDate = LocalDate.now();

    @Column(nullable = false)
    private Long totalBooks;

    @Column(nullable = false)
    private Long booksIssued;

    @Column(nullable = false)
    private Long booksReturned;

    @Column(nullable = false)
    private Long overdueBooks;

    @Column(nullable = false)
    private Long totalUsers;

    @Column(nullable = false)
    private Long activeUsers;

    @Column(length = 2000)
    private String summary;
}
