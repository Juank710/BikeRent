package BikeRent.Location;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/bike-rent/locations")
public class LocationController {

    @Autowired
    private LocationRepository locationRepository;

    @GetMapping
    public List<Location> getAllLocations() {
        return locationRepository.findAll();
    }

    @GetMapping("/{id}")
    public Location getLocationById(@PathVariable String id){
        return locationRepository.findById(id).get();
    }

    @PostMapping
    public Location createLocation(@RequestBody Location location){
        return locationRepository.save(location);
    }

    @DeleteMapping("/{id}")
    public Location deleteLocation(@PathVariable String id){
        if(locationRepository.existsById(id)){
            locationRepository.deleteById(id);
        }
        return null;
    }

    @PutMapping
    public ResponseEntity<Location> updateLocation(@RequestBody Location updateLocation) {
        Optional<Location> optionalLocation = locationRepository.findById(updateLocation.getId());
        if (optionalLocation.isPresent()) {
            Location existingLocation = optionalLocation.get();
            existingLocation.setName(updateLocation.getName());
            existingLocation.setAddress(updateLocation.getAddress());
            existingLocation.setCity(updateLocation.getCity());
            Location savedLocation = locationRepository.save(existingLocation);
            return ResponseEntity.ok(savedLocation);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
