package com.example.alzheimerapp.controller;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.alzheimerapp.dto.PatientDTO;
import com.example.alzheimerapp.model.Patient;
import com.example.alzheimerapp.repository.PatientRepository;

@RestController
@RequestMapping("/api/patients")
public class PatientController {

    private final PatientRepository patientRepository;

    @Autowired
    public PatientController(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    @GetMapping
    public ResponseEntity<List<PatientDTO>> getAllPatients() {
        List<Patient> patients = patientRepository.findAll();
        List<PatientDTO> patientDTOs = patients.stream().map(this::convertToDTO).collect(Collectors.toList());
        return new ResponseEntity<>(patientDTOs, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PatientDTO> getPatientById(@PathVariable("id") Long id) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found with id: " + id));
        return new ResponseEntity<>(convertToDTO(patient), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<PatientDTO> createPatient(@RequestBody Patient patient) {
        Patient createdPatient = patientRepository.save(patient);
        return new ResponseEntity<>(convertToDTO(createdPatient), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PatientDTO> updatePatient(@PathVariable("id") Long id, @RequestBody Patient patientDetails) {
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

        Patient updatedPatient = patientRepository.save(patient);
        return new ResponseEntity<>(convertToDTO(updatedPatient), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePatient(@PathVariable("id") Long id) {
        patientRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/recent")
    public ResponseEntity<List<PatientDTO>> getRecentPatients() {
        try {
            LocalDateTime limitTime = LocalDateTime.now().minusHours(24);
            List<Patient> recentPatients = patientRepository.findByCreatedAtAfter(limitTime);
            recentPatients.sort(Comparator.comparing(Patient::getCreatedAt).reversed());
            List<PatientDTO> patientDTOs = recentPatients.stream().map(this::convertToDTO).collect(Collectors.toList());
            return new ResponseEntity<>(patientDTOs, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/classified")
    public ResponseEntity<List<PatientDTO>> getClassifiedPatients() {
        try {
            List<Patient> classifiedPatients = patientRepository.findAllByOrderByCreatedAtDesc();
            List<PatientDTO> patientDTOs = classifiedPatients.stream().map(this::convertToDTO).collect(Collectors.toList());
            return new ResponseEntity<>(patientDTOs, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/nearby")
    public ResponseEntity<List<PatientDTO>> getNearbyPatients(@RequestParam("city") String city) {
        try {
            List<Patient> nearbyPatients = patientRepository.findByCity(city);
            List<PatientDTO> patientDTOs = nearbyPatients.stream().map(this::convertToDTO).collect(Collectors.toList());
            return new ResponseEntity<>(patientDTOs, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private PatientDTO convertToDTO(Patient patient) {
        PatientDTO patientDTO = new PatientDTO();
        patientDTO.setId(patient.getId());
        patientDTO.setAge(patient.getAge());
        patientDTO.setSex(patient.getSex());
        patientDTO.setDegreeAlz(patient.getDegreeAlz());
        patientDTO.setCity(patient.getCity());
        patientDTO.setPhoneNumber(patient.getPhoneNumber());
        patientDTO.setDescription(patient.getDescription());
        patientDTO.setStartDate(patient.getStartDate());
        patientDTO.setEndDate(patient.getEndDate());
        patientDTO.setUsername(patient.getUser().getUsername());
        return patientDTO;
    }
}
