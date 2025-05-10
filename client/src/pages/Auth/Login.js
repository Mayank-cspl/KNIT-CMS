import React, { useState } from "react";
import Layout from "./../../components/Layout";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, {
                email,
                password,
            });
            if (res.data.success) {
                toast.success(res.data && res.data.message);

                const userRole = res.data.user.role; // assuming backend sends "role"

                // set auth
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });

                localStorage.setItem("auth", JSON.stringify(res.data));

                setTimeout(() => {
                    navigate(location.state || '/');
                    window.location.reload();
                }, 3000);


            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("An unexpected error occurred. Please try again.");
            }
        }
    };

    return (
        <Layout title="Login">
            <div className="login-container">
                <div className="login-left">
                    <h2>Welcome Back!</h2>
                    <p>
                        Enter your credentials to access <br />
                        your dashboard and manage your <br />
                        complaints efficiently.
                    </p>
                </div>
                <div className="login-right">
                <h3 style={{ marginBottom: "20px", fontWeight: 600 }}>Login</h3>
                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        <div className="forgot-password">
                            <span onClick={() => navigate("/forgot-password")}>
                                Forgot Password?
                            </span>
                        </div>
                        <button type="submit" className="sign-in-btn">Sign In</button>
                        <p className="signup-text">
                            Don't have an account? <span onClick={() => navigate("/register")}>Sign Up</span>
                        </p>
                    </form>
                </div>
            </div>
        </Layout>
    );
};


export default Login;
