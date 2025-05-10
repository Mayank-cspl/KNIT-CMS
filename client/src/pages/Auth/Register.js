import React, { useState } from 'react';
import Layout from '../../components/Layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [answer, setAnswer] = useState("");
    const [otp, setOtp] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);
    const navigate = useNavigate();

    // Send OTP function
    const sendOtp = async () => {
        // Validate if email ends with @knit.ac.in
        const emailPattern = /^[a-zA-Z0-9._%+-]+@knit\.ac\.in$/;
        if (!emailPattern.test(email)) {
            toast.error("Only emails ending with @knit.ac.in are allowed.");
            return;
        }

        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/send-otp`, { email });
            if (res.data.success) {
                toast.success('OTP sent to your email.');
                setIsOtpSent(true);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred.';
            toast.error(errorMessage);
        }
    };

    // Form submission with OTP verification
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate phone number has exactly 10 digits
        if (isOtpSent && !/^\d{10}$/.test(phone)) {
            toast.error("Phone number must be exactly 10 digits");
            return;
        }

        if (!isOtpSent) {
            sendOtp();
            return;
        }

        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, {
                name, email, password, phone, address, answer, otp
            });

            if (res.data.success) {
                toast.success(res.data.message);
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Invalid or Expired OTP');
        }
    };

    return (
        <Layout title="Register">
            <div className="login-container">
                <div className="login-left">
                    <h2>Welcome!</h2>
                    <p>
                        Enter your details to create an account <br />
                        and start managing your complaints.
                    </p>
                </div>
                <div className="login-right">
                    <h3 style={{ marginBottom: "20px", fontWeight: 600 }}>Registration</h3>
                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your name"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                                disabled={isOtpSent}
                            />
                        </div>

                        {!isOtpSent && (
                            <button type="button" className="sign-in-btn" onClick={sendOtp}>
                                Send OTP
                            </button>
                        )}

                        {isOtpSent && (
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
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Phone</label>
                                    <input
                                        type="text"
                                        value={phone}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            if (/^\d{0,10}$/.test(val)) {
                                                setPhone(val);
                                            }
                                        }}
                                        placeholder="Enter your number"
                                        maxLength="10"
                                        required
                                    />
                                    {phone.length !== 10 && phone.length > 0 && (
                                        <p className="error-text">Phone number must be exactly 10 digits</p>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label>Hostel Name</label>
                                    <input
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        placeholder="Enter your address"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Security Question</label>
                                    <input
                                        type="text"
                                        value={answer}
                                        onChange={(e) => setAnswer(e.target.value)}
                                        placeholder="Your favourite sport name"
                                        required
                                    />
                                </div>
                                <button type="submit" className="sign-in-btn">Submit</button>
                            </>
                        )}
                        <p className="signup-text">
                            Already have an account? <span onClick={() => navigate("/login")}>Login</span>
                        </p>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default Register;