package com.example.CoffeeApp.exception;

import org.springframework.http.HttpStatus;

public class AppException extends RuntimeException {
    private final HttpStatus code;

    public AppException(String msg, HttpStatus code) {

        super(msg);
        this.code = code;

    }

    public HttpStatus getCode() {
        return code;
    }

}
