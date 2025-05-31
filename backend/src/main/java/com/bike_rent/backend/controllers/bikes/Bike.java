package com.bike_rent.backend.controllers.bikes;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name="bikes")
public class Bike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "brand", nullable = false, length = 20)
    private String brand;

    @Column(name = "model", nullable = false, length = 250)
    private String model;

    @Column(name = "type", nullable = false, length = 20)
    private String type;

    @Column(name = "size", nullable = false, length = 20)
    private String size;

    @Column(name = "price_per_hour", nullable = false, precision = 10, scale = 2)
    private BigDecimal pricePerHour;

    @Column(name = "availability", nullable = false, length = 20)
    private String availability;

    @Column(name = "src_image")
    private String src_image;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    public String getSrc_image() {
        return src_image;
    }

    public void setSrc_image(String src_image) {
        this.src_image = src_image;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public BigDecimal getPricePerHour() {
        return pricePerHour;
    }

    public void setPricePerHour(BigDecimal pricePerHour) {
        this.pricePerHour = pricePerHour;
    }

    public String getAvailability() {
        return availability;
    }

    public void setAvailability(String availability) {
        this.availability = availability;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
