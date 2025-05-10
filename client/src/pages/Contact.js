import React from "react";
import Layout from "./../components/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
    return (
        <Layout title={"StreetCart - Contact"}>
            <div className="login-container">
                {/* Left Panel */}
                <div className="login-left">
                    <h2>We're Here to Help!</h2>
                    <p>
                        Got a question about your order, need help with a product, or just want to say hi? 
                        <br />We’re always ready to talk.
                    </p>
                    <img
                        src="https://img.freepik.com/free-vector/contact-us-concept-landing-page_52683-12860.jpg"
                        alt="Contact"
                        style={{ width: "100%", borderRadius: "12px", marginTop: "20px" }}
                    />
                </div>

                {/* Right Panel */}
                <div className="login-right">
                    <h3 style={{ marginBottom: "20px", fontWeight: 600 }}>Contact Information</h3>

                    <p className="mb-3"><BiMailSend style={{ color: "#007bff" }} /> &nbsp; help@knitcms.com</p>
                    <p className="mb-3"><BiPhoneCall style={{ color: "#007bff" }} /> &nbsp; +91-9876543210</p>
                    <p className="mb-3"><BiSupport style={{ color: "#007bff" }} /> &nbsp; 1800-1234-5678 (Toll Free)</p>

                    <div className="contact-form">
                        <label htmlFor="query" style={{ fontWeight: 500 }}>Your Message</label>
                        <textarea
                            className="form-control mt-2 mb-3"
                            id="query"
                            placeholder="Write your query here..."
                            rows="4"
                        ></textarea>
                        <button className="sign-in-btn">Send Message</button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Contact;
