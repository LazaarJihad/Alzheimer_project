package com.example.alzheimerapp.service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.alzheimerapp.model.Patient;
import com.example.alzheimerapp.repository.PatientRepository;

@Service
public class PatientService {

    private final PatientRepository patientRepository;

    @Autowired
    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    public Patient getPatientById(Long id) {
        return patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found with id: " + id));
    }

    public Patient createPatient(Patient patient) {
        return patientRepository.save(patient);
    }

    public Patient updatePatient(Long id, Patient patientDetails) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found with id: " + id));

        // Update patient details
        patient.setAge(patientDetails.getAge());
        patient.setSex(patientDetails.getSex());
        patient.setDegreeAlz(patientDetails.getDegreeAlz());
        patient.setCity(patientDetails.getCity());
        patient.setPhoneNumber(patientDetails.getPhoneNumber());
        patient.setDescription(patientDetails.getDescription());
        patient.setStartDate(patientDetails.getStartDate());
        patient.setEndDate(patientDetails.getEndDate());

        return patientRepository.save(patient);
    }

    public void deletePatient(Long id) {
        patientRepository.deleteById(id);
    }

    public List<Patient> getRecentPatients() {
        try {
            LocalDateTime limitTime = LocalDateTime.now().minusHours(24);
            List<Patient> recentPatients = patientRepository.findByCreatedAtAfter(limitTime);
            recentPatients.sort(Comparator.comparing(Patient::getCreatedAt).reversed());
            return recentPatients;
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while fetching recent patients", e);
        }
    }

    public List<Patient> getNearbyPatients(String city) {
        return patientRepository.findByCity(city);
    }
}
