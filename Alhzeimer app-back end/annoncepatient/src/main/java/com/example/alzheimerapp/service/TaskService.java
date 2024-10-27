package com.example.alzheimerapp.service;

import com.example.alzheimerapp.model.Task;
import com.example.alzheimerapp.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public Task saveTask(Task task) {
        return taskRepository.save(task);
    }

    public List<Task> getTasksByAssistantId(Long assistantId) {
        return taskRepository.findByAssistantId(assistantId);
    }

    public List<Task> getTasksByAssistantIdAndPatientId(Long assistantId, Long patientId) {
        return taskRepository.findByAssistantIdAndPatientId(assistantId, patientId);
    }

    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    public Task updateTask(Task task) {
        return taskRepository.save(task);
    }
}
