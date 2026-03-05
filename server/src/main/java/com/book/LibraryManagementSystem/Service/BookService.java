package com.book.LibraryManagementSystem.Service;

import com.book.LibraryManagementSystem.Exception.LibraryException;
import com.book.LibraryManagementSystem.LibraryDTO.BookRequest;
import com.book.LibraryManagementSystem.LibraryDTO.BookResponse;
import com.book.LibraryManagementSystem.Model.BookModel;
import com.book.LibraryManagementSystem.Model.Role;
import com.book.LibraryManagementSystem.Model.UserModel;
import com.book.LibraryManagementSystem.Repository.BookRepository;
import com.book.LibraryManagementSystem.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private UserRepository userRepository;

    public BookResponse createBook(BookRequest bookRequest, Long userId) {
        // Verify user exists and is ADMIN
        Optional<UserModel> user = userRepository.findById(userId);
        if (!user.isPresent()) {
            throw new LibraryException("User not found with User ID: " + userId, HttpStatus.BAD_REQUEST);
        }

        checkUserRole(user.get(), "Book creation");

        BookModel book = new BookModel();
        book.setTitle(bookRequest.getTitle());
        book.setDescription(bookRequest.getDescription());
        book.setPublishYear(bookRequest.getPublishYear());
        book.setAuthor(bookRequest.getAuthor());
        book.setGenre(bookRequest.getGenre());
        book.setPrice(bookRequest.getPrice());
        book.setCreatedAt(LocalDate.now());
        BookModel savedBook = bookRepository.save(book);

        return mapToBookResponse(savedBook);
    }

    public List<BookResponse> getAllBooks() {
        List<BookModel> allBooks = bookRepository.findAll();
        return allBooks.stream()
                .map(this::mapToBookResponse)
                .collect(Collectors.toList());
    }

    public BookResponse getBookById(Long bookId) {
        Optional<BookModel> isExists = bookRepository.findById(bookId);
        if (!isExists.isPresent())
            throw new LibraryException("Book not found with ID: " + bookId, HttpStatus.BAD_REQUEST);
        else {
            BookModel book = isExists.get();
            return mapToBookResponse(book);
        }
    }

    public BookResponse updateBook(Long bookId, BookRequest bookRequest, Long userId) {
        // Verify user exists and is ADMIN
        Optional<UserModel> user = userRepository.findById(userId);
        if (!user.isPresent()) {
            throw new LibraryException("User not found with User ID: " + userId, HttpStatus.BAD_REQUEST);
        }

        checkUserRole(user.get(), "Book update");

        Optional<BookModel> isExists = bookRepository.findById(bookId);
        if (!isExists.isPresent())
            throw new LibraryException("Book not found with ID: " + bookId, HttpStatus.BAD_REQUEST);

        BookModel existingBook = isExists.get();
        existingBook.setTitle(bookRequest.getTitle());
        existingBook.setDescription(bookRequest.getDescription());
        existingBook.setPublishYear(bookRequest.getPublishYear());
        existingBook.setAuthor(bookRequest.getAuthor());
        existingBook.setGenre(bookRequest.getGenre());
        existingBook.setPrice(bookRequest.getPrice());
        existingBook.setCreatedAt(LocalDate.now());

        bookRepository.save(existingBook);
        return mapToBookResponse(existingBook);
    }

    public String deleteBook(Long bookId, Long userId) {
        // Verify user exists and is ADMIN
        Optional<UserModel> user = userRepository.findById(userId);
        if (!user.isPresent()) {
            throw new LibraryException("User not found with User ID: " + userId, HttpStatus.BAD_REQUEST);
        }

        checkUserRole(user.get(), "Book deletion");

        Optional<BookModel> isExists = bookRepository.findById(bookId);
        if (!isExists.isPresent()) {
            throw new LibraryException("Book not found with ID: " + bookId, HttpStatus.BAD_REQUEST);
        }

        bookRepository.deleteById(bookId);
        return "Book deleted successfully!";
    }

    private void checkUserRole(UserModel user, String operation) {
        if (user.getRole() != Role.ADMIN) {
            throw new LibraryException("Only ADMIN users can perform " + operation, HttpStatus.FORBIDDEN);
        }
    }

    public Map<String, List<BookResponse>> getAllBooksByGenre() {
        List<BookModel> books = bookRepository.findAll();

        Map<String, List<BookResponse>> allBookCollections = books.stream()
                .collect(Collectors.groupingBy(book -> {
                    return book.getGenre() != null ? book.getGenre() : "Uncategorized";
                },
                        Collectors.mapping(this::mapToBookResponse, Collectors.toList())));
        return allBookCollections;
    }

    public List<BookResponse> getBooksByGenre(String genre) {
        List<BookModel> books = bookRepository.findByGenre(genre);
        return books.stream()
                .map(this::mapToBookResponse)
                .collect(Collectors.toList());
    }

    public List<BookResponse> getBooksByTitle(String title) {
        List<BookModel> books = bookRepository.findByTitle(title);

        return books.stream()
                .map(this::mapToBookResponse)
                .collect(Collectors.toList());
    }

    public List<BookResponse> getBooksByAuthor(String author) {
        List<BookModel> books = bookRepository.findByAuthor(author);

        return books.stream()
                .map(this::mapToBookResponse)
                .collect(Collectors.toList());
    }

    public List<BookResponse> getBooksInYear(Long year) {
        List<BookModel> books = bookRepository.findBooksByYear(year);

        return books.stream()
                .map(this::mapToBookResponse)
                .collect(Collectors.toList());

    }

    public List<BookResponse> getBooksFromYear1ToYear2(Long year1, Long year2) {
        List<BookModel> books = bookRepository.findBooksByRange(year1, year2);

        return books.stream()
                .map(this::mapToBookResponse)
                .collect(Collectors.toList());

    }

    private BookResponse mapToBookResponse(BookModel book) {
        return new BookResponse(
                book.getId(),
                book.getTitle(),
                book.getDescription(),
                book.getPublishYear(),
                book.getAuthor(),
                book.getGenre(),
                book.getPrice(),
                LocalDate.now());
    }
}