package com.book.LibraryManagementSystem.Repository;

import com.book.LibraryManagementSystem.Model.ReportModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ReportRepository extends JpaRepository<ReportModel, Long> {
    List<ReportModel> findByReportType(String reportType);

    List<ReportModel> findByGeneratedDateBetween(LocalDate startDate, LocalDate endDate);

    List<ReportModel> findByReportTypeAndGeneratedDateBetween(String reportType, LocalDate startDate,
            LocalDate endDate);
}
