import { useState } from "react";
import { Container, TextField, Button, Typography, Box, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:2024/api/users/login", { email, password });
      localStorage.setItem("token", response.data.token);
      alert("Login Successful!");
      navigate("/"); // Redirect to Home Page
    } catch (err) {
      setError("Invalid email or password!");
    }
  };

  return (
    <Container maxWidth="sm">
      <Card className="p-6 mt-20 shadow-xl">
        <Typography variant="h5" align="center" gutterBottom>
          🔑 Login to Your Account
        </Typography>
        {error && (
          <Typography variant="body2" color="error" align="center">
            {error}
          </Typography>
        )}
        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth className="mt-4">
            Login
          </Button>
        </form>
        <Typography variant="body2" align="center" className="mt-4">
          Don't have an account? <a href="/register">Sign Up</a>
        </Typography>
      </Card>
    </Container>
  );
};

export default LoginPage;
