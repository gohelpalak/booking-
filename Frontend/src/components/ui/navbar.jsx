// import React from "react";
// import { Link } from "react-router-dom";
// import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

// const Navbar = () => {
//   return (
//     <AppBar position="static" sx={{ backgroundColor: "#333", padding: "0.5rem 0" }}>
//       <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
//         <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: "none", color: "white", fontWeight: "bold" }}>
//           Travel Booking
//         </Typography>
//         <Box>
//           <Button component={Link} to="/flights" sx={{ color: "white", mx: 1, '&:hover': { color: "#ffcc00" } }}>Flights</Button>
//           <Button component={Link} to="/hotels" sx={{ color: "white", mx: 1, '&:hover': { color: "#ffcc00" } }}>Hotels</Button>
//           <Button component={Link} to="/cars" sx={{ color: "white", mx: 1, '&:hover': { color: "#ffcc00" } }}>Car Rentals</Button>
//           <Button component={Link} to="/login" sx={{ color: "white", mx: 1, '&:hover': { color: "#ff4b5c" } }}>Login</Button>
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Navbar;


import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice"; // Redux Slice Import

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user); // Get Logged-in User

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout()); // Redux Store માંથી User Remove
    navigate("/login");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#333", padding: "0.5rem 0" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: "none", color: "white", fontWeight: "bold" }}>
          Travel Booking
        </Typography>
        <Box>
          <Button component={Link} to="/flights" sx={{ color: "white", mx: 1, '&:hover': { color: "#ffcc00" } }}>Flights</Button>
          <Button component={Link} to="/hotels" sx={{ color: "white", mx: 1, '&:hover': { color: "#ffcc00" } }}>Hotels</Button>
          <Button component={Link} to="/cars" sx={{ color: "white", mx: 1, '&:hover': { color: "#ffcc00" } }}>Car Rentals</Button>

          {user ? (
            <>
              <Typography variant="body1" sx={{ color: "white", mx: 2 }}>
                Welcome, {user.name}!
              </Typography>
              <Button onClick={handleLogout} sx={{ color: "white", mx: 1, '&:hover': { color: "#ff4b5c" } }}>Logout</Button>
            </>
          ) : (
            <Button component={Link} to="/login" sx={{ color: "white", mx: 1, '&:hover': { color: "#ff4b5c" } }}>Login</Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
