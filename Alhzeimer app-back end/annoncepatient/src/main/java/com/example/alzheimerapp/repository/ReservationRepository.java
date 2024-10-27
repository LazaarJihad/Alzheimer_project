
package com.example.alzheimerapp.repository;

import com.example.alzheimerapp.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ReservationRepository extends JpaRepository<Reservation, Long> {
}
