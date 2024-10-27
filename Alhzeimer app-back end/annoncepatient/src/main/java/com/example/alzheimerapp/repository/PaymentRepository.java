package com.example.alzheimerapp.repository;

import com.example.alzheimerapp.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    @Query("SELECT p FROM Payment p WHERE p.email = :email ORDER BY p.createdAt DESC")
    Payment findTopByEmailOrderByCreatedAtDesc(@Param("email") String email);
}
