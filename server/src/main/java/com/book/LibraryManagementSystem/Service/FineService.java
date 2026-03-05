package com.book.LibraryManagementSystem.Service;

import com.book.LibraryManagementSystem.Exception.LibraryException;
import com.book.LibraryManagementSystem.LibraryDTO.FineRequest;
import com.book.LibraryManagementSystem.LibraryDTO.FineResponse;
import com.book.LibraryManagementSystem.Model.FineModel;
import com.book.LibraryManagementSystem.Repository.FineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FineService {

    @Autowired
    private FineRepository fineRepository;

    public FineResponse createFine(FineRequest fineRequest) {
        FineModel fine = new FineModel();
        fine.setUserId(fineRequest.getUserId());
        fine.setCheckoutId(fineRequest.getCheckoutId());
        fine.setAmount(fineRequest.getAmount());
        fine.setDueDate(fineRequest.getDueDate());
        fine.setStatus(fineRequest.getStatus() != null ? fineRequest.getStatus() : "PENDING");

        FineModel savedFine = fineRepository.save(fine);
        return convertToResponse(savedFine);
    }

    public List<FineResponse> getAllFines() {
        return fineRepository.findAll().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public FineResponse getFineById(Long id) {
        FineModel fine = fineRepository.findById(id)
                .orElseThrow(() -> new LibraryException("Fine not found with id: " + id, HttpStatus.NOT_FOUND));
        return convertToResponse(fine);
    }

    public List<FineResponse> getFinesByUserId(Long userId) {
        return fineRepository.findByUserId(userId).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public List<FineResponse> getPendingFines() {
        return fineRepository.findByStatus("PENDING").stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public List<FineResponse> getOverdueFines() {
        LocalDate today = LocalDate.now();
        return fineRepository.findByDueDateBefore(today).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public FineResponse updateFineStatus(Long id, String status) {
        FineModel fine = fineRepository.findById(id)
                .orElseThrow(() -> new LibraryException("Fine not found with id: " + id, HttpStatus.NOT_FOUND));

        fine.setStatus(status);
        if ("PAID".equals(status)) {
            fine.setPaidDate(LocalDate.now());
        }

        FineModel updatedFine = fineRepository.save(fine);
        return convertToResponse(updatedFine);
    }

    public void deleteFine(Long id) {
        FineModel fine = fineRepository.findById(id)
                .orElseThrow(() -> new LibraryException("Fine not found with id: " + id, HttpStatus.NOT_FOUND));
        fineRepository.delete(fine);
    }

    private FineResponse convertToResponse(FineModel fine) {
        FineResponse response = new FineResponse();
        response.setId(fine.getId());
        response.setUserId(fine.getUserId());
        response.setCheckoutId(fine.getCheckoutId());
        response.setAmount(fine.getAmount());
        response.setCreatedDate(fine.getCreatedDate());
        response.setDueDate(fine.getDueDate());
        response.setPaidDate(fine.getPaidDate());
        response.setStatus(fine.getStatus());
        return response;
    }
}
