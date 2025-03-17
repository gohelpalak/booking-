import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import AdminPanel from "./pages/AdminPanel";
// import BookingPage from "./pages/BookingPage";
import PrivateRoute from "./components/PrivateRoute";
import AdminPanel from "./pages/AdminPanel";
import HomePage from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookingPage from "./pages/BookingPage";

const App = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />

        {/* Protected Route for Admin Panel */}
        <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminPanel />} />
        </Route>

        {/* Protected Route for Booking */}
        <Route element={<PrivateRoute allowedRoles={["user", "admin"]} />}>
          <Route path="/booking" element={<BookingPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
