package com.book.LibraryManagementSystem.Exception;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
public class LibraryException extends RuntimeException {
    private String resourceName;
    private String fieldName;
    private long fieldValue;
    private HttpStatus status; // Add HTTP Status

    public LibraryException(String resourceName, String fieldName, long fieldValue, HttpStatus status) {
        super(String.format("%s not found with %s: %s", resourceName, fieldName, fieldValue));
        this.resourceName = resourceName;
        this.fieldName = fieldName;
        this.fieldValue = fieldValue;
        this.status = status;
    }

    public LibraryException(String message, HttpStatus status) {
        super(message);
        this.status = status;
    }
}
