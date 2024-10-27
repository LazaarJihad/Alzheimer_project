package com.example.alzheimerapp.controller;

import com.example.alzheimerapp.model.Task;
import com.example.alzheimerapp.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        if (task.getTache() == null || task.getDate() == null || task.getHeure() == null || task.getAssistantId() == null || task.getPatientId() == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Task savedTask = taskService.saveTask(task);
        return new ResponseEntity<>(savedTask, HttpStatus.CREATED);
    }

    @GetMapping("/assistant/{assistantId}")
    public ResponseEntity<List<Task>> getTasksByAssistantId(@PathVariable Long assistantId, @RequestParam Long patientId) {
        List<Task> tasks = taskService.getTasksByAssistantIdAndPatientId(assistantId, patientId);
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }




    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
        Optional<Task> task = taskService.getTaskById(id);
        return task.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task taskDetails) {
        Optional<Task> task = taskService.getTaskById(id);
        if (task.isPresent()) {
            Task updatedTask = task.get();
            updatedTask.setTache(taskDetails.getTache());
            updatedTask.setDescription(taskDetails.getDescription());
            updatedTask.setCategories(taskDetails.getCategories());
            updatedTask.setDate(taskDetails.getDate());
            updatedTask.setHeure(taskDetails.getHeure());
            updatedTask.setCompleted(taskDetails.isCompleted());
            updatedTask.setAssistantId(taskDetails.getAssistantId());
            updatedTask.setPatientId(taskDetails.getPatientId());
            taskService.updateTask(updatedTask);
            return new ResponseEntity<>(updatedTask, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
