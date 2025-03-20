import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAdmin }) => {
    const token = localStorage.getItem("token");
    if (!token) return <Navigate to="/login" />;

    if (isAdmin) {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || user.role !== "admin") return <Navigate to="/unauthorized" />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
