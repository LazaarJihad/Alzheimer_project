package com.example.alzheimerapp.service;

import com.example.alzheimerapp.model.Assistant;
import com.example.alzheimerapp.repository.AssistantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;

@Service
public class AssistantService {

    private final AssistantRepository assistantRepository;

    @Autowired
    public AssistantService(AssistantRepository assistantRepository) {
        this.assistantRepository = assistantRepository;
    }

    public List<Assistant> getAllAssistants() {
        return assistantRepository.findAll();
    }

    public Assistant getAssistantById(Long id) {
        return assistantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Assistant not found with id: " + id));
    }

    public Assistant createAssistant(Assistant assistant) {
        return assistantRepository.save(assistant);
    }

    public Assistant updateAssistant(Long id, Assistant assistantDetails) {
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

        return assistantRepository.save(assistant);
    }

    public void deleteAssistant(Long id) {
        assistantRepository.deleteById(id);
    }

    public List<Assistant> getRecentAssistants() {
        try {
            LocalDateTime limitTime = LocalDateTime.now().minusHours(24);
            List<Assistant> recentAssistants = assistantRepository.findByCreatedAtAfter(limitTime);
            recentAssistants.sort(Comparator.comparing(Assistant::getCreatedAt).reversed());
            return recentAssistants;
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while fetching recent assistants", e);
        }
    }

    public List<Assistant> getClassifiedAssistants() {
        try {
            return assistantRepository.findAllByOrderByRatingDesc();
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while fetching classified assistants", e);
        }
    }

    public List<Assistant> getNearbyAssistants(String city) {
        return assistantRepository.findByCity(city);
    }
}