package com.book.LibraryManagementSystem.Controller;

import com.book.LibraryManagementSystem.LibraryDTO.BookRequest;
import com.book.LibraryManagementSystem.LibraryDTO.BookResponse;
import com.book.LibraryManagementSystem.Service.BookService;
import com.book.LibraryManagementSystem.Security.AuthenticationUtil;
import com.book.LibraryManagementSystem.Exception.LibraryException;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/books")
@Tag(name = "BookController", description = "RestApi for Book Controller")
public class BookController {

    @Autowired
    private BookService bookService;

    @Autowired
    private AuthenticationUtil authenticationUtil;

    @PostMapping("/create/{userId}")
    public ResponseEntity<BookResponse> createBook(@RequestBody BookRequest bookRequest,
            @PathVariable Long userId, HttpServletRequest request) {
        // Extract userId from JWT token
        Long tokenUserId = authenticationUtil.getUserIdFromRequest(request);
        if (tokenUserId == null) {
            throw new LibraryException("User not authenticated", HttpStatus.UNAUTHORIZED);
        }

        BookResponse createdBook = bookService.createBook(bookRequest, tokenUserId);
        return ResponseEntity.ok(createdBook);
    }

    @GetMapping("/getAllBooks")
    public ResponseEntity<List<BookResponse>> getAllBooks() {
        List<BookResponse> books = bookService.getAllBooks();
        return ResponseEntity.ok(books);
    }

    @GetMapping("getBooksById/{bookId}")
    public ResponseEntity<BookResponse> getBookById(@PathVariable Long bookId) {
        BookResponse book = bookService.getBookById(bookId);
        return ResponseEntity.ok(book);
    }

    @PutMapping("/updateBookById/bookId/{bookId}/userId/{userId}")
    public ResponseEntity<BookResponse> updateBook(@PathVariable Long bookId,
            @RequestBody BookRequest bookRequest, @PathVariable Long userId, HttpServletRequest request) {
        // Extract userId from JWT token
        Long tokenUserId = authenticationUtil.getUserIdFromRequest(request);
        if (tokenUserId == null) {
            throw new LibraryException("User not authenticated", HttpStatus.UNAUTHORIZED);
        }

        BookResponse book = bookService.updateBook(bookId, bookRequest, tokenUserId);
        return ResponseEntity.ok(book);
    }

    @DeleteMapping("/deleteBookById/bookId/{bookId}/userId/{userId}")
    public ResponseEntity<String> deleteBook(@PathVariable Long bookId, @PathVariable Long userId,
            HttpServletRequest request) {
        // Extract userId from JWT token
        Long tokenUserId = authenticationUtil.getUserIdFromRequest(request);
        if (tokenUserId == null) {
            throw new LibraryException("User not authenticated", HttpStatus.UNAUTHORIZED);
        }

        String response = bookService.deleteBook(bookId, tokenUserId);
        return ResponseEntity.ok(response);
    }

    // ---------------------------------------------------------
    @GetMapping("/groupBooksByGenre")
    public ResponseEntity<Map<String, List<BookResponse>>> getAllBooksByGenre() {
        Map<String, List<BookResponse>> groupedBooks = bookService.getAllBooksByGenre();
        return ResponseEntity.ok(groupedBooks);
    }

    @GetMapping("/searchBookByGenre/{genre}")
    public ResponseEntity<List<BookResponse>> getBooksByGenre(@PathVariable String genre) {
        return ResponseEntity.ok(bookService.getBooksByGenre(genre));
    }

    @GetMapping("/searchBookByTitle/{title}")
    public ResponseEntity<List<BookResponse>> getBooksByTitle(@PathVariable String title) {
        return ResponseEntity.ok(bookService.getBooksByTitle(title));
    }

    @GetMapping("/searchBookByAuthor/{author}")
    public ResponseEntity<List<BookResponse>> getBooksByAuthor(@PathVariable String author) {
        return ResponseEntity.ok(bookService.getBooksByAuthor(author));
    }

    // ----------------------------------------

    @GetMapping("/getBooksPublishedIn/{year}")
    public ResponseEntity<List<BookResponse>> getBooksByYear(@PathVariable Long year) {
        return ResponseEntity.ok(bookService.getBooksInYear(year));
    }

    @GetMapping("/getBooksPublished/{year1}/to/{year2}")
    public ResponseEntity<List<BookResponse>> getBooksFromYear1ToYear2(@PathVariable Long year1,
            @PathVariable Long year2) {
        return ResponseEntity.ok(bookService.getBooksFromYear1ToYear2(year1, year2));
    }
}
