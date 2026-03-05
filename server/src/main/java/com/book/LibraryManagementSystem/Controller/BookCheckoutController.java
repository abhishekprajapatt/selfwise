package com.book.LibraryManagementSystem.Controller;

import com.book.LibraryManagementSystem.LibraryDTO.CheckOutResponse;
import com.book.LibraryManagementSystem.Service.BookCheckoutService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/checkOut")
@Tag(name = "BookCheckOutController",description = "RestApi for BookCheckOut Controller")
public class BookCheckoutController {

    @Autowired
    private BookCheckoutService bookCheckoutService;

    @PostMapping("/issue/userId/{userId}/bookId/{bookId}/reqQuantity/{requestedQuantity}")
    public ResponseEntity<CheckOutResponse> issueBook(@PathVariable Long userId,
                @PathVariable Long bookId, @PathVariable Long requestedQuantity)
    {
        return bookCheckoutService.issueBook(userId,bookId,requestedQuantity);
    }

    @GetMapping("/getAllIssuedBook")
    public ResponseEntity<List<CheckOutResponse>> totalIssuedBook()
    {
        List<CheckOutResponse> allIssued = bookCheckoutService.totalIssuedBook();
        return ResponseEntity.ok(allIssued);
    }

    @GetMapping("/issuedBooks/user/{userId}")
    public ResponseEntity<List<CheckOutResponse>> getUserIssuedBooks(@PathVariable Long userId) {
        List<CheckOutResponse> issuedBooks = bookCheckoutService.getIssuedBooksByUser(userId);
        return ResponseEntity.ok(issuedBooks);
    }


    @GetMapping("/isIssuedBook/{bookId}")
    public ResponseEntity<List<CheckOutResponse>> isBookIssuedByAnyone(@PathVariable Long bookId) {
        List<CheckOutResponse> bookIssuedByUsers = bookCheckoutService.totalIssuedBook(bookId);
        return ResponseEntity.ok(bookIssuedByUsers);
    }
    @PutMapping("/returnBook/userId/{userId}/bookId/{bookId}")
    public  String returnBook(@PathVariable Long userId,@PathVariable Long bookId)
    {
        return bookCheckoutService.returnBook(userId,bookId);
    }


}
