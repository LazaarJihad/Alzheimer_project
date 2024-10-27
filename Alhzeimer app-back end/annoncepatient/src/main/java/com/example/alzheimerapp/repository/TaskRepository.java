package com.example.alzheimerapp.repository;

import com.example.alzheimerapp.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByAssistantId(Long assistantId);
    List<Task> findByAssistantIdAndPatientId(Long assistantId, Long patientId);
}
