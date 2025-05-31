package com.bike_rent.backend.controllers.dto;

import lombok.*;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor(force = true)
@AllArgsConstructor
@Builder
public class UserDTO {

    private String id;
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private Set<String> roles;

}
