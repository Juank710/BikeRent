package BikeRent.Payment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/bike-rent/payments")
public class PaymentController {

    @Autowired
    private PaymentRepository paymentRepository;

    @GetMapping
    public List<Payment> getAllPayments(){
        return paymentRepository.findAll();
    }

    @GetMapping("/{id}")
    public Payment getPaymentById(@PathVariable String id){
        return paymentRepository.findById(id).get();
    }

    @PostMapping
    public Payment createPayment(@RequestBody Payment payment){
        return paymentRepository.save(payment);
    }

    @DeleteMapping("/{id}")
    public Payment deletePayment(@PathVariable String id){
        if(paymentRepository.existsById(id)){
            paymentRepository.deleteById(id);
        }
        return null;
    }

    @PutMapping
    public ResponseEntity<Payment> updatePayment(@RequestBody Payment updatedPayment) {
        Optional<Payment> optionalPayment = paymentRepository.findById(updatedPayment.getId());
        if (optionalPayment.isPresent()) {
            Payment existingPayment = optionalPayment.get();
            existingPayment.setRentalId(updatedPayment.getRentalId());
            existingPayment.setAmount(updatedPayment.getAmount());
            existingPayment.setStatus(updatedPayment.getStatus());
            existingPayment.setMethod(updatedPayment.getMethod());
            existingPayment.setPaymentDate(updatedPayment.getPaymentDate());
            Payment savedPayment = paymentRepository.save(existingPayment);
            return ResponseEntity.ok(savedPayment);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}