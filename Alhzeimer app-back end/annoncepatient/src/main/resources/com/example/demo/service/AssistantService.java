package com.example.demo.service;

import com.example.demo.model.Assistant;
import com.example.demo.repository.AssistantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public Optional<Assistant> getAssistantById(Long id) {
        return assistantRepository.findById(id);
    }

    public Assistant createAssistant(Assistant assistant) {
        return assistantRepository.save(assistant);
    }

    public Assistant updateAssistant(Long id, Assistant assistantDetails) {
        Assistant assistant = assistantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Assistant not found with id: " + id));

        assistant.setAge(assistantDetails.getAge());
        assistant.setSex(assistantDetails.getSex());
        assistant.setTarif(assistantDetails.getTarif());
        assistant.setLocation(assistantDetails.getLocation());
        assistant.setPhoneNumber(assistantDetails.getPhoneNumber());
        assistant.setDescription(assistantDetails.getDescription());
        assistant.setStartDate(assistantDetails.getStartDate());
        assistant.setEndDate(assistantDetails.getEndDate());

        return assistantRepository.save(assistant);
    }

    public void deleteAssistant(Long id) {
        assistantRepository.deleteById(id);
    }
}
