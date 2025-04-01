package BikeRent.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/bike-rent/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<User> getAllusers(){
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable String id){
        return userRepository.findById(id).get();
    }

    @PostMapping
    public User createUser(@RequestBody User user){
        return userRepository.save(user);
    }

    @DeleteMapping("/{id}")
    public User deleteUser(@PathVariable String id){
        if(userRepository.existsById(id)){
            userRepository.deleteById(id);
        }
        return null;
    }

    @PutMapping
    public ResponseEntity<User> updateUser(@RequestBody User updatedUser) {
        Optional<User> optionalUser = userRepository.findById(updatedUser.getId());
        if (optionalUser.isPresent()) {
            User existingUser = optionalUser.get();
            existingUser.setFirst_name(updatedUser.getFirst_name());
            existingUser.setLast_name(updatedUser.getLast_name());
            existingUser.setEmail(updatedUser.getEmail());
            existingUser.setPassword_hash(updatedUser.getPassword_hash());
            existingUser.setPhone(updatedUser.getPhone());
            existingUser.setRole(updatedUser.getRole());
            User savedUser = userRepository.save(existingUser);
            return ResponseEntity.ok(savedUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
