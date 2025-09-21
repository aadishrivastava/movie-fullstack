import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../../api/axiosConfig";

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "login"; // default = login

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === "login") {
        const res = await api.post("/api/v1/auth/login", {
          username: formData.username,
          password: formData.password,
        });
        console.log("Login success:", res.data);
        alert("Login successful ✅");
      } else {
        const res = await api.post("/api/v1/auth/register", {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });
        console.log("Register success:", res.data);
        alert("Registration successful 🎉");
      }
    } catch (err) {
      console.error(err);
      alert("Error: " + err.message);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "2rem auto" }}>
      <h2>{mode === "login" ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            onChange={handleChange}
            value={formData.username}
            required
          />
        </div>

        {mode === "register" && (
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              required
            />
          </div>
        )}

        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            required
          />
        </div>

        <button type="submit">
          {mode === "login" ? "Login" : "Register"}
        </button>
      </form>
    </div>
  );
};

export default AuthPage;
