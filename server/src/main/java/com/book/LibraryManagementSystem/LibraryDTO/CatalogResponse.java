package com.book.LibraryManagementSystem.LibraryDTO;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Data
public class CatalogResponse {
    private Long id;
    private Long bookId;
    private String title;
    private String genre;
    private Integer quantity;
    private Long userId;
}
