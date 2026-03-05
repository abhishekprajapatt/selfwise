package com.book.LibraryManagementSystem.Repository;

import com.book.LibraryManagementSystem.Model.CatalogModel;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface CatalogRepository extends JpaRepository<CatalogModel,Long> {

    CatalogModel findByBookId(Long bookId);

    @Modifying
    @Query("UPDATE CatalogModel c SET c.quantity = c.quantity - :quantity WHERE c.bookId = :bookId AND c.quantity >= :quantity")
    int reduceQuantityByBookId(@Param("bookId") Long bookId, @Param("quantity") Integer quantity);
}
