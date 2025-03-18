import { useState } from "react";
import { Container, TextField, Button, Typography, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
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
      await axios.post("http://localhost:2024/api/users/register", user);
      alert("Registration Successful! Please Login.");
      navigate("/login");
    } catch (err) {
      setError("Registration failed! Try again.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Card className="p-6 mt-20 shadow-xl">
        <Typography variant="h5" align="center" gutterBottom>
          📝 Create an Account
        </Typography>
        {error && (
          <Typography variant="body2" color="error" align="center">
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
          <Button type="submit" variant="contained" color="primary" fullWidth className="mt-4">
            Register
          </Button>
        </form>
        <Typography variant="body2" align="center" className="mt-4">
          Already have an account? <a href="/login">Login</a>
        </Typography>
      </Card>
    </Container>
  );
};

export default RegisterPage;
 