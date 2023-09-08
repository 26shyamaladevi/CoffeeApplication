package com.example.CoffeeApp.mappers;

import com.example.CoffeeApp.domains.User;
import com.example.CoffeeApp.dto.UserDto;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-09-08T08:48:30-0500",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 20.0.1 (Homebrew)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public UserDto toUserDto(User user) {
        if ( user == null ) {
            return null;
        }

        UserDto userDto = new UserDto();

        userDto.setUserId( user.getUserId() );
        userDto.setFirstName( user.getFirstName() );
        userDto.setLastName( user.getLastName() );
        userDto.setEmailId( user.getEmailId() );
        userDto.setRole( user.getRole() );

        return userDto;
    }
}
