package com.example.alzheimerapp.service;

import com.example.alzheimerapp.model.Payment;
import com.example.alzheimerapp.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    public Payment savePayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    public Payment getLastPaymentByEmail(String email) {
        return paymentRepository.findTopByEmailOrderByCreatedAtDesc(email);
    }
}
