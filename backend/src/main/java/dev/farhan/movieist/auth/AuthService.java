package dev.farhan.movieist.auth;

import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User register(RegisterRequest req) {
        // basic validation
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new IllegalArgumentException("Email already in use");
        }
        if (userRepository.existsByUsername(req.getUsername())) {
            throw new IllegalArgumentException("Username already in use");
        }

        String hashed = BCrypt.hashpw(req.getPassword(), BCrypt.gensalt(12));
        User user = new User(req.getUsername(), req.getEmail(), hashed);
        return userRepository.save(user);
    }

    public User login(LoginRequest req) {
        Optional<User> userOpt = userRepository.findByEmail(req.getEmail());
        if (userOpt.isEmpty()) {
            throw new IllegalArgumentException("Invalid credentials");
        }
        User user = userOpt.get();
        if (!BCrypt.checkpw(req.getPassword(), user.getPasswordHash())) {
            throw new IllegalArgumentException("Invalid credentials");
        }
        return user;
    }
}
