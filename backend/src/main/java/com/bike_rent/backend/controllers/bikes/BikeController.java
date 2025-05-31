package com.bike_rent.backend.controllers.bikes;

import com.bike_rent.backend.service.StorageService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.nio.file.Files;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(
        origins = "http://localhost:4200",
        allowedHeaders = "*",
        methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS }
)
@RequestMapping("/bike-rent/bikes")
@AllArgsConstructor
public class BikeController {

    private final StorageService storageService;
    private final HttpServletRequest request;

    @PostMapping("/upload")
    public Map<String, String> uploadFile(@RequestParam("file") MultipartFile multipartFile){
        String path = storageService.store(multipartFile);
        String host = request.getRequestURL().toString().replace(request.getRequestURI(), "");
        String url = ServletUriComponentsBuilder
                .fromHttpUrl(host)
                .path("/bike-rent-bikes/")
                .path(path)
                .toUriString();
        return Map.of("url", url);
    }

    @GetMapping("{filename:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename) throws IOException {
        Resource file = storageService.loadAsResource(filename);
        String contentTYpe = Files.probeContentType(file.getFile().toPath());

        return ResponseEntity
                .ok()
                .header(HttpHeaders.CONTENT_TYPE, contentTYpe)
                .body(file);
    }

    @Autowired
    private BikeRepository bikeRepository;

    @GetMapping
    @PreAuthorize("hasAuthority('ROLE_admin-role')")
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
        Optional<Bike> optionalBike = bikeRepository.findById(String.valueOf(updateBike.getId()));
        if (optionalBike.isPresent()) {
            Bike existingBike = optionalBike.get();
            existingBike.setBrand(updateBike.getBrand());
            existingBike.setModel(updateBike.getModel());
            existingBike.setType(updateBike.getType());
            existingBike.setSize(updateBike.getSize());
            existingBike.setPricePerHour(updateBike.getPricePerHour());
            existingBike.setAvailability(updateBike.getAvailability());
            Bike savedBike = bikeRepository.save(existingBike);
            return ResponseEntity.ok(savedBike);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
