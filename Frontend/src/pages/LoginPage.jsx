import { useState } from "react";
import { Container, TextField, Button, Typography, Box, Card } from "@mui/material";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { login } from '../store/slices/authSlice'



const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:2000/Admin/login", { email, password });

      const userData = {
        name: response.data.name,
        email: response.data.email,
        id: response.data._id,
        token: response.data.token
      }


      // localStorage.setItem("token", response.data.token);
      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("userdata", JSON.stringify(userData));
      dispatch(login(userData))
      alert("Login Successful!");
      navigate("/"); // Redirect to Home Page
    } catch (err) {
      setError("Invalid email or password!");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // background: "linear-gradient(to right, #ff758c, #ff7eb3)",
      }}
    >
      <Container maxWidth="xs">
        <Card
          sx={{
            padding: 4,
            borderRadius: 5,
            boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)",
            backdropFilter: "blur(12px)",
            background: "rgba(255, 255, 255, 0.2)",
          }}
        >
          <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
            🔐 Welcome Back!
          </Typography>
          {error && (
            <Typography variant="body2" color="error" align="center">
              {error}
            </Typography>
          )}
          <form onSubmit={handleLogin}>
            <TextField
              label="Email Address"
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
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                marginTop: 2,
                backgroundColor: "",
                color: "white",
                fontWeight: "bold",
                '&:hover': { backgroundColor: "#c70039" },
              }}
            >
              Login
            </Button>
          </form>
          <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
            Don't have an account? <a href="/register" style={{ color: "#ff4b5c", fontWeight: "bold" }}>Sign Up</a>
          </Typography>
        </Card>
      </Container>
    </Box>
  );
};

export default LoginPage; 