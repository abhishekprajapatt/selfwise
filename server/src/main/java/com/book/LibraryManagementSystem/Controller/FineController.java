package com.book.LibraryManagementSystem.Controller;

import com.book.LibraryManagementSystem.LibraryDTO.FineRequest;
import com.book.LibraryManagementSystem.LibraryDTO.FineResponse;
import com.book.LibraryManagementSystem.Service.FineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fines")
@CrossOrigin(origins = "http://localhost:4200")
public class FineController {

    @Autowired
    private FineService fineService;

    @PostMapping("/create")
    public ResponseEntity<FineResponse> createFine(@RequestBody FineRequest fineRequest) {
        FineResponse response = fineService.createFine(fineRequest);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<FineResponse>> getAllFines() {
        List<FineResponse> fines = fineService.getAllFines();
        return new ResponseEntity<>(fines, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FineResponse> getFineById(@PathVariable Long id) {
        FineResponse fine = fineService.getFineById(id);
        return new ResponseEntity<>(fine, HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<FineResponse>> getFinesByUserId(@PathVariable Long userId) {
        List<FineResponse> fines = fineService.getFinesByUserId(userId);
        return new ResponseEntity<>(fines, HttpStatus.OK);
    }

    @GetMapping("/pending")
    public ResponseEntity<List<FineResponse>> getPendingFines() {
        List<FineResponse> fines = fineService.getPendingFines();
        return new ResponseEntity<>(fines, HttpStatus.OK);
    }

    @GetMapping("/overdue")
    public ResponseEntity<List<FineResponse>> getOverdueFines() {
        List<FineResponse> fines = fineService.getOverdueFines();
        return new ResponseEntity<>(fines, HttpStatus.OK);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<FineResponse> updateFineStatus(
            @PathVariable Long id,
            @RequestParam String status) {
        FineResponse fine = fineService.updateFineStatus(id, status);
        return new ResponseEntity<>(fine, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFine(@PathVariable Long id) {
        fineService.deleteFine(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
