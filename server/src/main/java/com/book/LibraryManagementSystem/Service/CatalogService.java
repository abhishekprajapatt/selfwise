package com.book.LibraryManagementSystem.Service;
import com.book.LibraryManagementSystem.Exception.LibraryException;
import com.book.LibraryManagementSystem.LibraryDTO.CatalogRequest;
import com.book.LibraryManagementSystem.LibraryDTO.CatalogResponse;
import com.book.LibraryManagementSystem.Model.BookModel;
import com.book.LibraryManagementSystem.Model.CatalogModel;
import com.book.LibraryManagementSystem.Model.Role;
import com.book.LibraryManagementSystem.Model.UserModel;
import com.book.LibraryManagementSystem.Repository.BookRepository;
import com.book.LibraryManagementSystem.Repository.CatalogRepository;
import com.book.LibraryManagementSystem.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CatalogService {

    @Autowired
    private CatalogRepository catalogRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private UserRepository userRepository;

    public CatalogResponse addBooks(CatalogRequest catalogRequest, Long userId) {
        if (userId == null) {
            throw new LibraryException("User  ID cannot be null", HttpStatus.BAD_REQUEST);
        }

        String userRole = checkUserRole(userId);
        if (!"ADMIN".equals(userRole)) {
            throw new LibraryException("Only ADMIN users can modify the catalog", HttpStatus.BAD_REQUEST);
        }

        CatalogModel existingCatalog = catalogRepository.findByBookId(catalogRequest.getBookId());

        if (existingCatalog != null) {
            existingCatalog.setQuantity(existingCatalog.getQuantity() + catalogRequest.getQuantity());
            catalogRepository.save(existingCatalog);
            return mapToCatalogResponse(existingCatalog);
        } else {
            Optional<BookModel> book = bookRepository.findById(catalogRequest.getBookId());
            if (!book.isPresent()) {
                throw new LibraryException("Book not found with Book ID: " + catalogRequest.getBookId(), HttpStatus.BAD_REQUEST);
            }

            CatalogModel catalog = new CatalogModel();
            catalog.setBookId(book.get().getId());
            catalog.setQuantity(catalogRequest.getQuantity());
            catalog.setUserId(userId);

            CatalogModel savedCatalog = catalogRepository.save(catalog);
            return mapToCatalogResponse(savedCatalog);
        }
    }

    public List<CatalogResponse> getAllCatalog() {
        List<CatalogModel> catalogEntries = catalogRepository.findAll();
        return catalogEntries.stream()
                .map(this::mapToCatalogResponse)
                .collect(Collectors.toList());
    }

    public CatalogResponse getCatalogById(Long catalogId) {
        CatalogModel catalog = catalogRepository.findById(catalogId)
                .orElseThrow(() -> new LibraryException("Catalog not found with Catalog ID: " + catalogId, HttpStatus.BAD_REQUEST));
        return mapToCatalogResponse(catalog);
    }

    public CatalogResponse reduceBookQuantity(Long bookId, Integer quantity, Long userId) {
        String userRole = checkUserRole(userId);
        if (!"ADMIN".equals(userRole)) {
            throw new LibraryException("Only ADMIN users can modify the catalog", HttpStatus.BAD_REQUEST);
        }
        CatalogModel catalog = catalogRepository.findByBookId(bookId);
        if (catalog == null) {
            throw new LibraryException("Book not found in the catalog with Book ID: " + bookId, HttpStatus.BAD_REQUEST);
        }
        if (catalog.getQuantity() < quantity) {
            throw new LibraryException("Not enough quantity in catalog to reduce for Book ID: " + bookId, HttpStatus.BAD_REQUEST);
        }

        catalog.setQuantity(catalog.getQuantity() - quantity);
        if (catalog.getQuantity() == 0) {
            catalogRepository.delete(catalog);
            return null;
        }

        catalogRepository.save(catalog);
        return mapToCatalogResponse(catalog);
    }

    private String checkUserRole(Long userId) {
        Optional<UserModel> user = userRepository.findById(userId);
        if (!user.isPresent()) {
            throw new LibraryException("User  not found with User ID: " + userId, HttpStatus.BAD_REQUEST);
        }
        if (Role.ADMIN.equals(user.get().getRole())) {
            return "ADMIN";
        }
        return "User  is not an ADMIN";
    }

    private CatalogResponse mapToCatalogResponse(CatalogModel catalog) {
        BookModel book = bookRepository.findById(catalog.getBookId())
                .orElseThrow(() -> new LibraryException("Book not found", HttpStatus.BAD_REQUEST));

        return new CatalogResponse(
                catalog.getId(),
                catalog.getBookId(),
                book.getTitle(),
                book.getGenre(),
                catalog.getQuantity(),
                catalog.getUserId()
        );
    }
}