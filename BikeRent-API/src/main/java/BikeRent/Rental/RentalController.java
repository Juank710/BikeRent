package BikeRent.Rental;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/bike-rent/rentals")
public class RentalController {

    @Autowired
    private RentalRepository rentalRepository;

    @GetMapping
    public List<Rental> getAllRentals(){
        return rentalRepository.findAll();
    }

    @GetMapping("/{id}")
    public Rental getRentalById(@PathVariable String id){
        return rentalRepository.findById(id).get();
    }

    @PostMapping
    public Rental createRental(@RequestBody Rental rental){
        return rentalRepository.save(rental);
    }

    @DeleteMapping("/{id}")
    public Rental deleteRental(@PathVariable String id){
        if(rentalRepository.existsById(id)){
            rentalRepository.deleteById(id);
        }
        return null;
    }

    @PutMapping
    public ResponseEntity<Rental> updateRental(@RequestBody Rental updatedRental) {
        Optional<Rental> optionalRental = rentalRepository.findById(updatedRental.getId());
        if (optionalRental.isPresent()) {
            Rental existingRental = optionalRental.get();
            existingRental.setUserId(updatedRental.getUserId());
            existingRental.setBikeId(updatedRental.getBikeId());
            existingRental.setStartTime(updatedRental.getStartTime());
            existingRental.setEndTime(updatedRental.getEndTime());
            existingRental.setTotalPrice(updatedRental.getTotalPrice());
            existingRental.setStatus(updatedRental.getStatus());
            existingRental.setPickupLocationId(updatedRental.getPickupLocationId());
            existingRental.setReturnLocationId(updatedRental.getReturnLocationId());
            Rental savedRental = rentalRepository.save(existingRental);
            return ResponseEntity.ok(savedRental);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}