package BikeRent.Rol;

import BikeRent.User.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/bike-rent/roles")
public class RoleController {

    @Autowired
    private RoleRepository roleRepository;

    @GetMapping
    public List<Role> getAllRols() {
        return roleRepository.findAll();
    }

    @GetMapping("/{id}")
    public Role getRoleById(@PathVariable String id){
        return roleRepository.findById(id).get();
    }

    @PostMapping
    public Role createRol(@RequestBody Role user){
        return roleRepository.save(user);
    }

    @DeleteMapping("/{id}")
    public Role deleteRol(@PathVariable String id){
        if(roleRepository.existsById(id)){
            roleRepository.deleteById(id);
        }
        return null;
    }

    @PutMapping
    public ResponseEntity<Role> updateRole(@RequestBody Role updatedRole) {
        Optional<Role> optionalRole = roleRepository.findById(updatedRole.getId());
        if (optionalRole.isPresent()) {
            Role existingRole = optionalRole.get();
            existingRole.setName(updatedRole.getName());
            Role savedRole = roleRepository.save(existingRole);
            return ResponseEntity.ok(savedRole);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
