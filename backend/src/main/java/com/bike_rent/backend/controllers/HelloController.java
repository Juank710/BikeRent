package com.bike_rent.backend.controllers;

import com.bike_rent.backend.jwt.CustomJwt;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.text.MessageFormat;

@RestController
@CrossOrigin(
        origins = "http://localhost:4200",
        allowedHeaders = "*",
        methods = { RequestMethod.GET }
)

public class HelloController {

    @GetMapping("/hello")
    @PreAuthorize("hasAuthority('ROLE_admin-role')")
    public Message hello() {
        var jwt = (CustomJwt) SecurityContextHolder.getContext().getAuthentication();
        var message = MessageFormat
                .format("Hello fullstack master {0} {1}, how is it going today?",
                        jwt.getFirstName(), jwt.getLastName());
        return new Message(message);
    }

    record Message(String message) {}

}
