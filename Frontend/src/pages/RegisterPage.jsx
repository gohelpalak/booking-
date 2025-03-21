import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Card,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("http://localhost:2000/Admin/register", user);
      alert("Registration Successful! Please Login.");
      navigate("/login");
    } catch (err) {
      setError("Registration failed! Try again.");
    }
  };

  return (
    <Box
      sx={{
        // background: "linear-gradient(135deg, #667eea, #764ba2)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Container maxWidth="sm">
        <Card
          sx={{
            p: 4,
            borderRadius: 3,
            boxShadow: 6,
            bgcolor: "white",
            textAlign: "center",
          }}
        >
          <Typography variant="h4" gutterBottom color="primary" fontWeight="bold">
            📝 Create an Account
          </Typography>
          {error && (
            <Typography variant="body2" color="error" mb={2}>
              {error}
            </Typography>
          )}
          <form onSubmit={handleRegister}>
            <TextField
              label="Full Name"
              name="name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={user.name}
              onChange={handleChange}
              required
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={user.email}
              onChange={handleChange}
              required
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={user.password}
              onChange={handleChange}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3, p: 1.5, fontSize: "1rem", fontWeight: "bold" }}
            >
              Register
            </Button>
          </form>
          <Typography variant="body2" mt={3}>
            Already have an account? <a href="/login" style={{ color: "#764ba2", fontWeight: "bold" }}>Login</a>
          </Typography>
        </Card>
      </Container>
    </Box>
  );
};

export default RegisterPage;