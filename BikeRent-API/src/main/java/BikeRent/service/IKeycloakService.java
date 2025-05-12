package BikeRent.service;

import BikeRent.controllers.dto.UserDTO;
import org.keycloak.representations.idm.UserRepresentation;
import java.util.List;

public interface IKeycloakService {

    List<UserRepresentation> findAllUsers();
    List<UserRepresentation> searchUserByUsername(String username);
    String createUser(UserDTO userDTO);
    void deleteUser(String userId);
    void updateUser(String userId, UserDTO userDTO);
}
