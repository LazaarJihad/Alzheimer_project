// ReservationService.java
package com.example.alzheimerapp.service;

import com.example.alzheimerapp.model.Assistant;
import com.example.alzheimerapp.model.Reservation;
import com.example.alzheimerapp.model.User;
import com.example.alzheimerapp.repository.AssistantRepository;
import com.example.alzheimerapp.repository.ReservationRepository;
import com.example.alzheimerapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AssistantRepository assistantRepository;

    public boolean createReservation(Long assistantId, String userEmail) {
        Optional<User> optionalUser = userRepository.findByEmail(userEmail);
        Optional<Assistant> optionalAssistant = assistantRepository.findById(assistantId);

        if (optionalUser.isPresent() && optionalAssistant.isPresent()) {
            User user = optionalUser.get();
            Assistant assistant = optionalAssistant.get();

            Reservation reservation = new Reservation();
            reservation.setUser(user);
            reservation.setAssistant(assistant);
            reservationRepository.save(reservation);

            return true;
        }

        return false;
    }
}

