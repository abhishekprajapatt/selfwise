package com.book.LibraryManagementSystem.Service;

import com.book.LibraryManagementSystem.Exception.LibraryException;
import com.book.LibraryManagementSystem.LibraryDTO.ReportRequest;
import com.book.LibraryManagementSystem.LibraryDTO.ReportResponse;
import com.book.LibraryManagementSystem.Model.ReportModel;
import com.book.LibraryManagementSystem.Repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReportService {

    @Autowired
    private ReportRepository reportRepository;

    @Autowired
    private BookService bookService;

    @Autowired
    private UserService userService;

    @Autowired
    private BookCheckoutService bookCheckoutService;

    public ReportResponse generateReport(ReportRequest reportRequest) {
        ReportModel report = new ReportModel();
        report.setReportType(reportRequest.getReportType());
        report.setTotalBooks(reportRequest.getTotalBooks());
        report.setBooksIssued(reportRequest.getBooksIssued());
        report.setBooksReturned(reportRequest.getBooksReturned());
        report.setOverdueBooks(reportRequest.getOverdueBooks());
        report.setTotalUsers(reportRequest.getTotalUsers());
        report.setActiveUsers(reportRequest.getActiveUsers());
        report.setSummary(reportRequest.getSummary());

        ReportModel savedReport = reportRepository.save(report);
        return convertToResponse(savedReport);
    }

    public List<ReportResponse> getAllReports() {
        return reportRepository.findAll().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public ReportResponse getReportById(Long id) {
        ReportModel report = reportRepository.findById(id)
                .orElseThrow(() -> new LibraryException("Report not found with id: " + id, HttpStatus.NOT_FOUND));
        return convertToResponse(report);
    }

    public List<ReportResponse> getReportsByType(String reportType) {
        return reportRepository.findByReportType(reportType).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public List<ReportResponse> getReportsByDateRange(LocalDate startDate, LocalDate endDate) {
        return reportRepository.findByGeneratedDateBetween(startDate, endDate).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public List<ReportResponse> getReportsByTypeAndDateRange(String reportType, LocalDate startDate,
            LocalDate endDate) {
        return reportRepository.findByReportTypeAndGeneratedDateBetween(reportType, startDate, endDate).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public void deleteReport(Long id) {
        ReportModel report = reportRepository.findById(id)
                .orElseThrow(() -> new LibraryException("Report not found with id: " + id, HttpStatus.NOT_FOUND));
        reportRepository.delete(report);
    }

    private ReportResponse convertToResponse(ReportModel report) {
        ReportResponse response = new ReportResponse();
        response.setId(report.getId());
        response.setReportType(report.getReportType());
        response.setGeneratedDate(report.getGeneratedDate());
        response.setTotalBooks(report.getTotalBooks());
        response.setBooksIssued(report.getBooksIssued());
        response.setBooksReturned(report.getBooksReturned());
        response.setOverdueBooks(report.getOverdueBooks());
        response.setTotalUsers(report.getTotalUsers());
        response.setActiveUsers(report.getActiveUsers());
        response.setSummary(report.getSummary());
        return response;
    }
}
