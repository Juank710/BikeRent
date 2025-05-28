package com.bike_rent.backend.controllers.bikes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(
        origins = "http://localhost:4200",
        allowedHeaders = "*",
        methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS }
)
@RequestMapping("/bike-rent/bikes")
public class BikeController {

    @Autowired
    private BikeRepository bikeRepository;

    @GetMapping
    public List<Bike> getAllBikes() {
        return bikeRepository.findAll();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_admin-role')")
    public Bike getBikeById(@PathVariable String id){
        return bikeRepository.findById(id).get();
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_admin-role')")
    public Bike createBike(@RequestBody Bike bike){
        return bikeRepository.save(bike);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_admin-role')")
    public Bike deleteBike(@PathVariable String id){
        if(bikeRepository.existsById(id)){
            bikeRepository.deleteById(id);
        }
        return null;
    }

    @PutMapping
    @PreAuthorize("hasAuthority('ROLE_admin-role')")
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
            Bike savedBike = bikeRepository.save(existingBike);
            return ResponseEntity.ok(savedBike);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
