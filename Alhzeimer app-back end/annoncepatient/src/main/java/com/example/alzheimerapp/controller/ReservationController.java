package com.example.alzheimerapp.controller;

import com.example.alzheimerapp.request.ReservationRequest;
import com.example.alzheimerapp.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @PostMapping
    public ResponseEntity<Map<String, String>> createReservation(@RequestBody ReservationRequest reservationRequest) {
        boolean isCreated = reservationService.createReservation(reservationRequest.getAssistantId(), reservationRequest.getUserEmail());

        Map<String, String> response = new HashMap<>();
        if (isCreated) {
            response.put("message", "Reservation created successfully");
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } else {
            response.put("message", "Failed to create reservation");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }
}
