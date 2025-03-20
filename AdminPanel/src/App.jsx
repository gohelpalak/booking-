import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import FlightsManagement from "./pages/FlightsManagement";
import HotelsManagement from "./pages/HotelsManagement";
import CarsManagement from "./pages/CarsManagement";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<ProtectedRoute isAdmin={true} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/flight/flights" element={<FlightsManagement />} />
          <Route path="/admin/hotels" element={<HotelsManagement/>} />
          <Route path="/admin/cars" element={<CarsManagement/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
