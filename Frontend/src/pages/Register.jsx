import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from "../features/authSlice";
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "user" });
    const { isLoading, isError, message } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser(formData)).then((result) => {
            navigate("/login");
        })
    };
    return (
        <>
            <h2>Register</h2>
            {isError && <p style={{ color: "red" }}>{message}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <select name="role" onChange={handleChange}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                <button type="submit">{isLoading ? 'Registering...' : 'Register'}</button>
            </form>
        </>
    );
};

export default Register;