package com.example.CoffeeApp.mappers;

import com.example.CoffeeApp.domains.User;
import com.example.CoffeeApp.dto.UserDto;
import com.example.CoffeeApp.dto.UserDto.UserDtoBuilder;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-08-21T13:59:53-0500",
    comments = "version: 1.4.2.Final, compiler: Eclipse JDT (IDE) 3.35.0.v20230721-1147, environment: Java 17.0.7 (Eclipse Adoptium)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public UserDto toUserDto(User user) {
        if ( user == null ) {
            return null;
        }

        UserDtoBuilder userDto = UserDto.builder();

        userDto.emailId( user.getEmailId() );
        userDto.firstName( user.getFirstName() );
        userDto.lastName( user.getLastName() );
        userDto.role( user.getRole() );
        userDto.userId( user.getUserId() );

        return userDto.build();
    }
}
