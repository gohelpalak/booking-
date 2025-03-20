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
    console.log(localStorage.getItem("token"));
    try {
      const response = await fetch("http://localhost:2024/Admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }
      
      // Role-based Authentication Check
      if (data.role !== "admin") {
        throw new Error("Access Denied: You are not an admin");
      }
      
      localStorage.setItem("adminToken", data.token);
      
      localStorage.setItem("tokenExpiry", Date.now() + 3600000); // 1 hour expiry
      navigate("/admin/dashboard");
    } catch (err) {
      setError("Login failed:" +err.message);
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
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AdminLogin;