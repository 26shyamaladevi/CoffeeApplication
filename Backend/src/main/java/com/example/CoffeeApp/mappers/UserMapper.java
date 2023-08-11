package com.example.CoffeeApp.mappers;

import org.mapstruct.Mapper;
import com.example.CoffeeApp.dto.UserDto;
import com.example.CoffeeApp.domains.User;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDto toUserDto(User user);

}
