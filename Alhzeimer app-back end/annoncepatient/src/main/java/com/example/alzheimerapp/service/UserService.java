package com.example.alzheimerapp.service;

import com.example.alzheimerapp.model.User;
import com.example.alzheimerapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public boolean existsByUsername(String username) {
        return userRepository.findByUsername(username).isPresent();
    }

    public boolean existsByEmail(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    public boolean authenticate(String email, String password) {
        return userRepository.findByEmail(email)
                .map(user -> user.getPassword().equals(password))
                .orElse(false);
    }

    public boolean updateUsername(String currentUsername, String newUsername) {
        return userRepository.findByUsername(currentUsername).map(user -> {
            user.setUsername(newUsername);
            userRepository.save(user);
            return true;
        }).orElse(false);
    }

    public boolean updateEmail(String currentEmail, String newEmail) {
        return userRepository.findByEmail(currentEmail).map(user -> {
            user.setEmail(newEmail);
            userRepository.save(user);
            return true;
        }).orElse(false);
    }

    public boolean updatePhoneNumber(String currentPhoneNumber, String newPhoneNumber) {
        return userRepository.findByPhoneNumber(currentPhoneNumber).map(user -> {
            user.setPhoneNumber(newPhoneNumber);
            userRepository.save(user);
            return true;
        }).orElse(false);
    }

    public boolean updateCity(String currentCity, String newCity) {
        List<User> users = userRepository.findByCity(currentCity);
        if (!users.isEmpty()) {
            for (User user : users) {
                user.setCity(newCity);
                userRepository.save(user);
            }
            return true;
        }
        return false;
    }

    public boolean updatePassword(String username, String currentPassword, String newPassword) {
        return userRepository.findByUsername(username).map(user -> {
            if (user.getPassword().equals(currentPassword)) {
                user.setPassword(newPassword);
                userRepository.save(user);
                return true;
            }
            return false;
        }).orElse(false);
    }

    public boolean deleteAccount(String username) {
        Optional<User> userOptional = userRepository.findByUsername(username);
        if (userOptional.isPresent()) {
            userRepository.delete(userOptional.get());
            return true;
        }
        return false;
    }


    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}