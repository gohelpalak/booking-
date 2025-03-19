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


import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice"; // Redux Slice Import

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [datas, setdatas] = useState("")
  const user = useSelector((state) => state.auth.user); // Get Logged-in User
  useEffect(() => {
    const loginUser = JSON.parse(localStorage.getItem("userdata"));
    setdatas(loginUser)
  }, [])
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout()); // Redux Store માંથી User Remove
    navigate("/login");
  };
  console.log("useris" ,user);
  

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

          {datas ? (
            <>
              <Typography variant="body1" sx={{ color: "white", mx: 2 }}>
                {/* Welcome, {user.name}! */}
                Welcome!
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
