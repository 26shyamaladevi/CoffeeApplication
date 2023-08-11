package com.example.CoffeeApp.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class UserDto {

    private Long userId;
    private String firstName;
    private String lastName;
    private String emailId;
    private String token;

}
