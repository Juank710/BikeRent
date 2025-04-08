package BikeRent.Bike;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/bike-rent/bike")
public class BikeController {

    @Autowired
    private BikeRepository bikeRepository;

    @GetMapping
    public List<Bike> getAllBikes() {
        return bikeRepository.findAll();
    }

    @GetMapping("/{id}")
    public Bike getBikeById(@PathVariable String id){
        return bikeRepository.findById(id).get();
    }

    @PostMapping
    public Bike createBike(@RequestBody Bike bike){
        return bikeRepository.save(bike);
    }

    @DeleteMapping("/{id}")
    public Bike deleteBike(@PathVariable String id){
        if(bikeRepository.existsById(id)){
            bikeRepository.deleteById(id);
        }
        return null;
    }

    @PutMapping
    public ResponseEntity<Bike> updateBike(@RequestBody Bike updateBike) {
        Optional<Bike> optionalBike = bikeRepository.findById(updateBike.getId());
        if (optionalBike.isPresent()) {
            Bike existingBike = optionalBike.get();
            existingBike.setBrand(updateBike.getBrand());
            existingBike.setModel(updateBike.getModel());
            existingBike.setType(updateBike.getType());
            existingBike.setSize(updateBike.getSize());
            existingBike.setPrice_per_hour(updateBike.getPrice_per_hour());
            existingBike.setAvailability(updateBike.isAvailability());
            existingBike.setLocation_id(updateBike.getLocation_id());
            Bike savedBike = bikeRepository.save(existingBike);
            return ResponseEntity.ok(savedBike);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
