import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  

    const handleLogin = async (e) => {
      e.preventDefault();
      setError("");
      setLoading(true);
console.log("email", email, "password", password);

      try {
        const response = await fetch("http://localhost:2024/admin/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
console.log("API Response:", response);

        const data = await response.json();
        console.log("API Response:", data); // ✅ Debug API response

        if (!response.ok) {
          throw new Error(data.message || "Login failed"); // 👈 Error Message from API
        }
  

        if (!data.role || data.role !== "admin") {
          throw new Error("Access Denied: You are not an admin");
        }

        localStorage.setItem("adminToken", data.token);
        navigate("/admin/dashboard");
      } catch (err) {
        console.error("Login Error:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 10, textAlign: "center" }}>
        <Typography variant="h5">Admin Login</Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            margin="normal"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Login"}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AdminLogin;
