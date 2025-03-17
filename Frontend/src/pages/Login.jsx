import { useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { loginUser } from "../features/authSlice";
import { useNavigate } from 'react-router-dom';

const Login = () =>{
    const [formData,setFormData] = useState({email:"",password:""});
    const { isLoading, isError, message,user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(formData)).then((result) => {
            if(result.meta.requestStatus === 'fulfilled'){
                if(user?.role === 'admin'){
                    navigate('/admin');
                    }else{
                        navigate('/');
                    }
            }
        })
    };
    return (
        <>
         <h2>Login</h2>
      {isError && <p style={{ color: "red" }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">{isLoading ? "Logging in..." : "Login"}</button>
      </form>
        </>
    );
};
export default Login