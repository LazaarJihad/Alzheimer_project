package com.example.alzheimerapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.alzheimerapp.model.Assistant;
import java.util.List;
import java.time.LocalDateTime;

public interface AssistantRepository extends JpaRepository<Assistant, Long> {
    List<Assistant> findByCreatedAtAfter(LocalDateTime limitTime);
    List<Assistant> findAllByOrderByRatingDesc();
    List<Assistant> findByCity(String city);
    List<Assistant> findByIsFavoriteTrue();
}