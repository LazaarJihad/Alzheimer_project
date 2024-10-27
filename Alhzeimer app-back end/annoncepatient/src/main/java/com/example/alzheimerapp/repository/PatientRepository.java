package com.example.alzheimerapp.repository;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.alzheimerapp.model.Patient;

public interface PatientRepository extends JpaRepository<Patient, Long> {
    List<Patient> findByCreatedAtAfter(LocalDateTime limitTime);
    List<Patient> findByCity(String city);
    List<Patient> findAllByOrderByCreatedAtDesc();
}
