package com.book.LibraryManagementSystem.Repository;

import com.book.LibraryManagementSystem.Model.BookCheckoutModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface BookCheckoutRepository extends JpaRepository<BookCheckoutModel, Long> {

    List<BookCheckoutModel> findByUserId(Long userId);

    List<BookCheckoutModel> findByBookId(Long bookId);

    Optional<BookCheckoutModel> findByUserIdAndBookId(Long userId, Long bookId);

    @Query("SELECT COUNT(b) FROM BookCheckoutModel b WHERE b.bookId = :bookId")
    int countIssuedBooks(@Param("bookId") Long bookId);

//    // Delete issued book record when user returns the book
//    void deleteByUserIdAndBookId(Long userId, Long bookId);
}
