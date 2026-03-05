package com.book.LibraryManagementSystem.Repository;

import com.book.LibraryManagementSystem.Model.BookModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookRepository extends JpaRepository<BookModel,Long> {

    @Query("SELECT b FROM BookModel b WHERE LOWER(b.genre) LIKE LOWER(CONCAT('%', :genre, '%'))")
    List<BookModel> findByGenre( String genre);

    @Query("SELECT b FROM BookModel b WHERE LOWER(b.title) LIKE LOWER(CONCAT('%', :title, '%'))")
    List<BookModel> findByTitle(String title);

    @Query("SELECT b FROM BookModel b WHERE LOWER(b.author) LIKE LOWER(CONCAT('%', :author, '%'))")
    List<BookModel> findByAuthor(String author);

    @Query("SELECT b FROM BookModel b WHERE b.publishYear = :publishYear")
    List<BookModel> findBooksByYear( Long publishYear);

    @Query("SELECT b FROM BookModel b WHERE b.publishYear BETWEEN :year1 AND :year2")
    List<BookModel> findBooksByRange(@Param("year1") Long year1, @Param("year2") Long year2);



}
