import React, { useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [otpSent, setOtpSent] = useState(false);

    const navigate = useNavigate();

    // Form submission handler for password reset
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`, {
                email,
                otp,
                newPassword,
            });

            if (res && res.data.success) {
                toast.success(res.data.message);
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong. Please try again.");
        }
    };

    // Handler for sending OTP
    const handleSendOtp = async () => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`, { email });

            if (res && res.data.success) {
                toast.success("OTP sent to your email.");
                setOtpSent(true); // Enable OTP input after sending OTP
            } else {
                toast.error(res.data.message);
            }
        }catch (error) {
            console.log(error); // Log the full error object for debugging
            
            // Extract the message from the response if it exists, otherwise use a fallback
            const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred.';
            
            toast.error(errorMessage); // Display the extracted message in the toast
        }
        
    };

    return (
        <Layout title={"Forgot Password"}>
            <div className="login-container">
                <div className="login-left">
                    <h2>Reset Password</h2>
                    <p>
                        Forgot your password? No worries! <br />
                        Enter your email to receive an OTP and reset your password securely.
                    </p>
                </div>
                <div className="login-right">
                    <h3 style={{ marginBottom: "20px", fontWeight: 600 }}>Forgot Password</h3>
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

                        {!otpSent && (
                            <button
                                type="button"
                                className="sign-in-btn"
                                onClick={handleSendOtp}
                            >
                                Send OTP
                            </button>
                        )}

                        {otpSent && (
                            <>
                                <div className="form-group">
                                    <label>OTP</label>
                                    <input
                                        type="text"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        placeholder="Enter OTP"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>New Password</label>
                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="Enter new password"
                                        required
                                    />
                                </div>

                                <button type="submit" className="sign-in-btn">Reset</button>
                            </>
                        )}

                        <p className="signup-text">
                            Remembered your password?{" "}
                            <span onClick={() => navigate("/login")}>Login</span>
                        </p>
                    </form>
                </div>
            </div>
        </Layout>
    );

};

export default ForgotPassword;
