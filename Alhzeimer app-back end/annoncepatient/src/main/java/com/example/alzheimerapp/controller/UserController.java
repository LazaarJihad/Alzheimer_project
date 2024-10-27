package com.example.alzheimerapp.controller;

import com.example.alzheimerapp.dto.UserDTO;
import com.example.alzheimerapp.model.User;
import com.example.alzheimerapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        if (userService.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body("{\"error\":\"Email already in use\"}");
        }
        User savedUser = userService.saveUser(user);
        return ResponseEntity.ok(savedUser);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody UserDTO userDTO) {
        String email = userDTO.getEmail();
        String password = userDTO.getPassword();

        Map<String, Object> response = new HashMap<>();
        boolean isAuthenticated = userService.authenticate(email, password);

        if (isAuthenticated) {
            Optional<User> optionalUser = userService.findByEmail(email);
            if (optionalUser.isPresent()) {
                User user = optionalUser.get();
                response.put("message", "Login successful");
                response.put("role", user.getRole());
                response.put("username", user.getUsername());
                response.put("phoneNumber", user.getPhoneNumber());
                response.put("email", user.getEmail());
                response.put("city", user.getCity());
                response.put("id", user.getId());

                return ResponseEntity.ok(response);
            } else {
                response.put("message", "User not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        } else {
            response.put("message", "Invalid credentials");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    @PostMapping("/update-username")
    public ResponseEntity<Map<String, String>> updateUsername(@RequestBody Map<String, String> request) {
        String currentUsername = request.get("currentUsername");
        String newUsername = request.get("newUsername");

        Map<String, String> response = new HashMap<>();

        if (userService.existsByUsername(newUsername)) {
            response.put("message", "New username already exists");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        boolean updated = userService.updateUsername(currentUsername, newUsername);
        if (updated) {
            response.put("message", "Username updated successfully");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            response.put("message", "User not found");
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/update-email")
    public ResponseEntity<Map<String, String>> updateEmail(@RequestBody Map<String, String> request) {
        String currentEmail = request.get("currentEmail");
        String newEmail = request.get("newEmail");

        Map<String, String> response = new HashMap<>();

        if (userService.existsByEmail(newEmail)) {
            response.put("message", "New email already exists");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        boolean updated = userService.updateEmail(currentEmail, newEmail);
        if (updated) {
            response.put("message", "Email updated successfully");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            response.put("message", "User not found");
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/update-phoneNumber")
    public ResponseEntity<Map<String, String>> updateTelephone(@RequestBody Map<String, String> request) {
        String currentPhoneNumber = request.get("currentPhoneNumber");
        String newPhoneNumber = request.get("newPhoneNumber");

        Map<String, String> response = new HashMap<>();

        boolean updated = userService.updatePhoneNumber(currentPhoneNumber, newPhoneNumber);
        if (updated) {
            response.put("message", "Telephone number updated successfully");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            response.put("message", "User not found");
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/update-city")
    public ResponseEntity<Map<String, String>> updateCity(@RequestBody Map<String, String> request) {
        String currentCity = request.get("currentCity");
        String newCity = request.get("newCity");

        Map<String, String> response = new HashMap<>();

        boolean updated = userService.updateCity(currentCity, newCity);
        if (updated) {
            response.put("message", "City updated successfully");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            response.put("message", "No users found with the specified current city");
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/update-password")
    public ResponseEntity<Map<String, String>> updatePassword(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String currentPassword = request.get("currentPassword");
        String newPassword = request.get("newPassword");

        Map<String, String> response = new HashMap<>();
        if (userService.updatePassword(username, currentPassword, newPassword)) {
            response.put("message", "Password updated successfully");
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "Failed to update password");
            return ResponseEntity.status(400).body(response);
        }
    }

    @PostMapping("/delete-account")
    public ResponseEntity<Map<String, String>> deleteAccount(@RequestBody Map<String, String> request) {
        String username = request.get("username");

        Map<String, String> response = new HashMap<>();
        if (userService.deleteAccount(username)) {
            response.put("message", "Account deleted successfully");
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "Failed to delete account");
            return ResponseEntity.status(400).body(response);
        }
    }
}