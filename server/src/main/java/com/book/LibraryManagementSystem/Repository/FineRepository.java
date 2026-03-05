package com.book.LibraryManagementSystem.Repository;

import com.book.LibraryManagementSystem.Model.FineModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface FineRepository extends JpaRepository<FineModel, Long> {
    List<FineModel> findByUserId(Long userId);

    List<FineModel> findByStatus(String status);

    List<FineModel> findByUserIdAndStatus(Long userId, String status);

    List<FineModel> findByDueDateBefore(LocalDate date);

    Optional<FineModel> findByCheckoutId(Long checkoutId);
}
