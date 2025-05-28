package com.bike_rent.backend.service;

import com.bike_rent.backend.controllers.dto.UserDTO;
import org.keycloak.representations.idm.UserRepresentation;

import java.util.List;

public interface IKeycloakService {

    List<UserDTO> findAllUsers();
    List<UserRepresentation> searchUserByUsername(String userName);
    String createUser(UserDTO userDTO);
    void deleteUser(String userId);
    void updateUser(String userId, UserDTO userDTO);

}
