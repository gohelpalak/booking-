
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme"; 
import HomePage from "./pages/HomePage";
import FlightPage from "./pages/FlightsPage";
import HotelsPage from "./pages/HotelsPage";
import CarPage from "./pages/CarsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import BookingPage from "./pages/BookingPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/ui/navbar";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/flights" element={<FlightPage />} />
          <Route path="/hotels" element={<HotelsPage />} />
          <Route path="/cars" element={<CarPage />} />
          <Route path="/booking" element={<ProtectedRoute><BookingPage/></ProtectedRoute>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage/>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
