package dev.farhan.movieist.auth;

public class AuthResponse {
    private String id;
    private String username;
    private String email;

    public AuthResponse() {}
    public AuthResponse(User u) {
        this.id = u.getId();
        this.username = u.getUsername();
        this.email = u.getEmail();
    }
    // getters
    public String getId() { return id; }
    public String getUsername() { return username; }
    public String getEmail() { return email; }
}
