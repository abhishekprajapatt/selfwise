package com.book.LibraryManagementSystem.Controller;

import com.book.LibraryManagementSystem.LibraryDTO.CatalogRequest;
import com.book.LibraryManagementSystem.LibraryDTO.CatalogResponse;
import com.book.LibraryManagementSystem.Service.CatalogService;
import com.book.LibraryManagementSystem.Security.AuthenticationUtil;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/api/catalog")
@Tag(name = "CatalogController", description = "RestApi for Catalog Controller")
public class CatalogController {

    @Autowired
    private CatalogService catalogService;

    @Autowired
    private AuthenticationUtil authenticationUtil;

    @PostMapping("/add/userId/{userId}")
    public ResponseEntity<CatalogResponse> addBooks(@RequestBody CatalogRequest catalogRequest,
            @PathVariable Long userId, HttpServletRequest request) {
        Long authenticatedUserId = authenticationUtil.getUserIdFromRequest(request);
        return ResponseEntity.ok(catalogService.addBooks(catalogRequest, authenticatedUserId));
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<CatalogResponse>> getAllCatalog() {
        List<CatalogResponse> catalogEntries = catalogService.getAllCatalog();
        return ResponseEntity.ok(catalogEntries);
    }

    @GetMapping("/getCatalogById/{catalogId}")
    public ResponseEntity<CatalogResponse> getCatalogById(@PathVariable Long catalogId) {
        CatalogResponse catalogResponse = catalogService.getCatalogById(catalogId);
        return ResponseEntity.ok(catalogResponse);
    }

    @PutMapping("/reduceQuantity/bookId/{bookId}/quantity/{quantity}/userId/{userId}")
    public ResponseEntity<CatalogResponse> reduceBookQuantity(@PathVariable Long bookId,
            @PathVariable Integer quantity, @PathVariable Long userId, HttpServletRequest request) {
        Long authenticatedUserId = authenticationUtil.getUserIdFromRequest(request);
        CatalogResponse catalogResponse = catalogService.reduceBookQuantity(bookId, quantity, authenticatedUserId);
        return ResponseEntity.ok(catalogResponse);
    }
}
