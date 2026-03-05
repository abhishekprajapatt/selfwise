package com.book.LibraryManagementSystem.Service;

import com.book.LibraryManagementSystem.Exception.LibraryException;
import com.book.LibraryManagementSystem.LibraryDTO.CheckOutRequest;
import com.book.LibraryManagementSystem.LibraryDTO.CheckOutResponse;
import com.book.LibraryManagementSystem.Model.BookCheckoutModel;
import com.book.LibraryManagementSystem.Model.BookModel;
import com.book.LibraryManagementSystem.Model.CatalogModel;
import com.book.LibraryManagementSystem.Model.UserModel;
import com.book.LibraryManagementSystem.Repository.BookCheckoutRepository;
import com.book.LibraryManagementSystem.Repository.BookRepository;
import com.book.LibraryManagementSystem.Repository.CatalogRepository;
import com.book.LibraryManagementSystem.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class BookCheckoutService {

    @Autowired
    private BookCheckoutRepository bookCheckoutRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CatalogRepository catalogRepository;

    @Autowired
    private BookRepository bookRepository;

    public ResponseEntity<CheckOutResponse> issueBook(Long userId, Long bookId, Long requestedQuantity) {
        Optional<UserModel> user = userRepository.findById(userId);
        if (!user.isPresent()) {
            throw new LibraryException("User", "id", userId, HttpStatus.NOT_FOUND);
        }

        CatalogModel catalog = catalogRepository.findByBookId(bookId);
        if (catalog == null || catalog.getQuantity() < requestedQuantity) {
            throw new LibraryException("Book", "id", bookId, HttpStatus.BAD_REQUEST);
        }

        BookCheckoutModel existingCheckout = bookCheckoutRepository.findByUserIdAndBookId(userId, bookId).orElse(null);

        if (existingCheckout != null) {
            existingCheckout
                    .setRequestedQuantity(existingCheckout.getRequestedQuantity() + requestedQuantity.intValue());
            bookCheckoutRepository.save(existingCheckout);
        } else {
            catalog.setQuantity(catalog.getQuantity() - requestedQuantity.intValue());
            if (catalog.getQuantity() == 0) {
                catalogRepository.delete(catalog);
            } else {
                catalogRepository.save(catalog);
            }

            BookCheckoutModel checkout = new BookCheckoutModel();
            checkout.setBookId(bookId);
            checkout.setUserId(userId);
            checkout.setRequestedQuantity(requestedQuantity.intValue());
            checkout.setIssuedAt(LocalDate.now());
            checkout.setDueDate(LocalDate.now().plusDays(30));

            bookCheckoutRepository.save(checkout);
        }

        BookModel book = bookRepository.findById(bookId).orElse(null);

        CheckOutResponse response = new CheckOutResponse();
        response.setBookId(bookId);
        response.setUserId(userId);
        response.setRequestedQuantity(requestedQuantity.intValue());
        response.setIssuedAt(LocalDate.now());
        if (book != null) {
            response.setTitle(book.getTitle());
            response.setGenre(book.getGenre());
        }

        return ResponseEntity.ok(response);
    }

    public List<CheckOutResponse> totalIssuedBook() {
        List<BookCheckoutModel> issuedBooks = bookCheckoutRepository.findAll();
        return issuedBooks.stream()
                .map(this::mapToCheckOutResponse)
                .collect(Collectors.toList());
    }

    public List<CheckOutResponse> totalIssuedBook(Long bookId) {
        List<BookCheckoutModel> issuedBooks = bookCheckoutRepository.findByBookId(bookId);
        return issuedBooks.stream().map(this::mapToCheckOutResponse).collect(Collectors.toList());
    }

    public List<CheckOutResponse> getIssuedBooksByUser(Long userId) {
        List<BookCheckoutModel> issuedBooks = bookCheckoutRepository.findByUserId(userId);
        return issuedBooks.stream()
                .map(this::mapToCheckOutResponse)
                .collect(Collectors.toList());
    }

    public boolean isBookIssuedByAnyone(Long bookId) {
        List<BookCheckoutModel> issuedBooks = bookCheckoutRepository.findByBookId(bookId);
        return !issuedBooks.isEmpty();
    }

    public String returnBook(Long userId, Long bookId) {
        BookCheckoutModel checkout = bookCheckoutRepository.findByUserIdAndBookId(userId, bookId)
                .orElseThrow(() -> new LibraryException("No issued record found", HttpStatus.NOT_FOUND));

        bookCheckoutRepository.delete(checkout);

        CatalogModel catalog = catalogRepository.findByBookId(bookId);
        if (catalog != null) {
            catalog.setQuantity(catalog.getQuantity() + checkout.getRequestedQuantity());
            catalogRepository.save(catalog);
        }

        return "Book returned successfully";
    }

    private CheckOutResponse mapToCheckOutResponse(BookCheckoutModel checkout) {
        BookModel book = bookRepository.findById(checkout.getBookId()).orElse(null);

        CheckOutResponse response = new CheckOutResponse();
        response.setBookId(checkout.getBookId());
        response.setUserId(checkout.getUserId());
        response.setRequestedQuantity(checkout.getRequestedQuantity());
        response.setIssuedAt(checkout.getIssuedAt());
        if (book != null) {
            response.setTitle(book.getTitle());
            response.setGenre(book.getGenre());
        }
        return response;
    }
}