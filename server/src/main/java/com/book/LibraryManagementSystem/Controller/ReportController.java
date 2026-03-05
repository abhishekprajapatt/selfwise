package com.book.LibraryManagementSystem.Controller;

import com.book.LibraryManagementSystem.LibraryDTO.ReportRequest;
import com.book.LibraryManagementSystem.LibraryDTO.ReportResponse;
import com.book.LibraryManagementSystem.Service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "http://localhost:4200")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @PostMapping("/generate")
    public ResponseEntity<ReportResponse> generateReport(@RequestBody ReportRequest reportRequest) {
        ReportResponse response = reportService.generateReport(reportRequest);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<ReportResponse>> getAllReports() {
        List<ReportResponse> reports = reportService.getAllReports();
        return new ResponseEntity<>(reports, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReportResponse> getReportById(@PathVariable Long id) {
        ReportResponse report = reportService.getReportById(id);
        return new ResponseEntity<>(report, HttpStatus.OK);
    }

    @GetMapping("/type/{reportType}")
    public ResponseEntity<List<ReportResponse>> getReportsByType(@PathVariable String reportType) {
        List<ReportResponse> reports = reportService.getReportsByType(reportType);
        return new ResponseEntity<>(reports, HttpStatus.OK);
    }

    @GetMapping("/range")
    public ResponseEntity<List<ReportResponse>> getReportsByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        List<ReportResponse> reports = reportService.getReportsByDateRange(startDate, endDate);
        return new ResponseEntity<>(reports, HttpStatus.OK);
    }

    @GetMapping("/type-range")
    public ResponseEntity<List<ReportResponse>> getReportsByTypeAndDateRange(
            @RequestParam String reportType,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        List<ReportResponse> reports = reportService.getReportsByTypeAndDateRange(reportType, startDate, endDate);
        return new ResponseEntity<>(reports, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReport(@PathVariable Long id) {
        reportService.deleteReport(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
