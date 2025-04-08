package BikeRent.RentalHistory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/bike-rent/rental-history")
public class RentalHistoryController {

    @Autowired
    private RentalHistoryRepository rentalHistoryRepository;

    @GetMapping
    public List<RentalHistory> getAllRentalHistories(){
        return rentalHistoryRepository.findAll();
    }

    @GetMapping("/{id}")
    public RentalHistory getRentalHistoryById(@PathVariable String id){
        return rentalHistoryRepository.findById(id).get();
    }

    @PostMapping
    public RentalHistory createRentalHistory(@RequestBody RentalHistory rentalHistory){
        return rentalHistoryRepository.save(rentalHistory);
    }

    @DeleteMapping("/{id}")
    public RentalHistory deleteRentalHistory(@PathVariable String id){
        if(rentalHistoryRepository.existsById(id)){
            rentalHistoryRepository.deleteById(id);
        }
        return null;
    }

    @PutMapping
    public ResponseEntity<RentalHistory> updateRentalHistory(@RequestBody RentalHistory updatedRentalHistory) {
        Optional<RentalHistory> optionalRentalHistory = rentalHistoryRepository.findById(updatedRentalHistory.getId());
        if (optionalRentalHistory.isPresent()) {
            RentalHistory existingRentalHistory = optionalRentalHistory.get();
            existingRentalHistory.setUserId(updatedRentalHistory.getUserId());
            existingRentalHistory.setRentalId(updatedRentalHistory.getRentalId());
            existingRentalHistory.setAction(updatedRentalHistory.getAction());
            existingRentalHistory.setDetails(updatedRentalHistory.getDetails());
            existingRentalHistory.setChangedAt(updatedRentalHistory.getChangedAt());
            RentalHistory savedRentalHistory = rentalHistoryRepository.save(existingRentalHistory);
            return ResponseEntity.ok(savedRentalHistory);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}