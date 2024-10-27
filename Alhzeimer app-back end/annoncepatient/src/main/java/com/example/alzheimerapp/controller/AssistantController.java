package com.example.alzheimerapp.controller;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.alzheimerapp.dto.AssistantDTO;
import com.example.alzheimerapp.model.Assistant;
import com.example.alzheimerapp.repository.AssistantRepository;
import com.example.alzheimerapp.request.RatingRequest;
import com.example.alzheimerapp.response.AssistantRatingResponse;

@RestController
@RequestMapping("/api/assistants")
public class AssistantController {

    private final AssistantRepository assistantRepository;

    @Autowired
    public AssistantController(AssistantRepository assistantRepository) {
        this.assistantRepository = assistantRepository;
    }

    @GetMapping
    public ResponseEntity<List<AssistantDTO>> getAllAssistants() {
        List<Assistant> assistants = assistantRepository.findAll();
        List<AssistantDTO> assistantDTOs = assistants.stream().map(this::convertToDTO).collect(Collectors.toList());
        return new ResponseEntity<>(assistantDTOs, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AssistantDTO> getAssistantById(@PathVariable("id") Long id) {
        Assistant assistant = assistantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Assistant not found with id: " + id));
        return new ResponseEntity<>(convertToDTO(assistant), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<AssistantDTO> createAssistant(@RequestBody Assistant assistant) {
        Assistant createdAssistant = assistantRepository.save(assistant);
        return new ResponseEntity<>(convertToDTO(createdAssistant), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AssistantDTO> updateAssistant(@PathVariable("id") Long id, @RequestBody Assistant assistantDetails) {
        Assistant assistant = assistantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Assistant not found with id: " + id));

        // Update assistant details
        assistant.setAge(assistantDetails.getAge());
        assistant.setSex(assistantDetails.getSex());
        assistant.setTarif(assistantDetails.getTarif());
        assistant.setCity(assistantDetails.getCity());
        assistant.setPhoneNumber(assistantDetails.getPhoneNumber());
        assistant.setDescription(assistantDetails.getDescription());
        assistant.setStartDate(assistantDetails.getStartDate());
        assistant.setEndDate(assistantDetails.getEndDate());
        assistant.setFavorite(assistantDetails.isFavorite());
        assistant.setRating(assistantDetails.getRating());
        assistant.setRatingCount(assistantDetails.getRatingCount());

        Assistant updatedAssistant = assistantRepository.save(assistant);
        return new ResponseEntity<>(convertToDTO(updatedAssistant), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAssistant(@PathVariable("id") Long id) {
        assistantRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/rate")
    public ResponseEntity<AssistantRatingResponse> rateAssistant(@PathVariable("id") Long id, @RequestBody RatingRequest ratingRequest) {
        Assistant assistant = assistantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Assistant not found with id: " + id));

        double newRating = ((assistant.getRating() * assistant.getRatingCount()) + ratingRequest.getRating()) / (assistant.getRatingCount() + 1);
        assistant.setRating(newRating);
        assistant.setRatingCount(assistant.getRatingCount() + 1);

        Assistant updatedAssistant = assistantRepository.save(assistant);

        // Calculate the rating percentage
        double ratingPercentage = (updatedAssistant.getRating() / 5) * 100;

        AssistantRatingResponse response = new AssistantRatingResponse(updatedAssistant.getRating(), updatedAssistant.getRatingCount(), ratingPercentage);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/recent")
    public ResponseEntity<List<AssistantDTO>> getRecentAssistants() {
        try {
            LocalDateTime limitTime = LocalDateTime.now().minusHours(24);
            List<Assistant> recentAssistants = assistantRepository.findByCreatedAtAfter(limitTime);
            // Sort assistants by descending creation date
            recentAssistants.sort(Comparator.comparing(Assistant::getCreatedAt).reversed());
            List<AssistantDTO> assistantDTOs = recentAssistants.stream().map(this::convertToDTO).collect(Collectors.toList());
            return new ResponseEntity<>(assistantDTOs, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/classified")
    public ResponseEntity<List<AssistantDTO>> getClassifiedAssistants() {
        try {
            List<Assistant> classifiedAssistants = assistantRepository.findAllByOrderByRatingDesc();
            List<AssistantDTO> assistantDTOs = classifiedAssistants.stream().map(this::convertToDTO).collect(Collectors.toList());
            return new ResponseEntity<>(assistantDTOs, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/nearby")
    public ResponseEntity<List<AssistantDTO>> getNearbyAssistants(@RequestParam("city") String city) {
        try {
            List<Assistant> nearbyAssistants = assistantRepository.findByCity(city);
            List<AssistantDTO> assistantDTOs = nearbyAssistants.stream().map(this::convertToDTO).collect(Collectors.toList());
            return new ResponseEntity<>(assistantDTOs, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private AssistantDTO convertToDTO(Assistant assistant) {
        AssistantDTO assistantDTO = new AssistantDTO();
        assistantDTO.setId(assistant.getId());
        assistantDTO.setAge(assistant.getAge());
        assistantDTO.setSex(assistant.getSex());
        assistantDTO.setTarif(assistant.getTarif());
        assistantDTO.setCity(assistant.getCity());
        assistantDTO.setPhoneNumber(assistant.getPhoneNumber());
        assistantDTO.setDescription(assistant.getDescription());
        assistantDTO.setStartDate(assistant.getStartDate());
        assistantDTO.setEndDate(assistant.getEndDate());
        assistantDTO.setFavorite(assistant.isFavorite());
        assistantDTO.setRating(assistant.getRating());
        assistantDTO.setRatingCount(assistant.getRatingCount());
        assistantDTO.setUsername(assistant.getUser().getUsername()); // assuming User entity has getUsername()
        assistantDTO.setCreatedAt(assistant.getCreatedAt()); // Ensure this line is present
        return assistantDTO;
    }
}