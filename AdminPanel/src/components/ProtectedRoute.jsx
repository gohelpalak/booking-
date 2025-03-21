// import { Navigate, Outlet } from "react-router-dom";

// const ProtectedRoute = ({ isAdmin }) => {
//     const token = localStorage.getItem("token") || "";

//     if (!token) return <Navigate to="/login" replace />;

//     if (isAdmin) {
//         const user = JSON.parse(localStorage.getItem("user") || "{}");
//         if (!user.role || user.role !== "admin") return <Navigate to="/unauthorized" replace />;
//     }

//     return <Outlet />;
// };

// export default ProtectedRoute;


import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const adminToken = localStorage.getItem("adminToken");

  return adminToken ? <Outlet /> : <Navigate to="/admin" />;
};

export default ProtectedRoute;
