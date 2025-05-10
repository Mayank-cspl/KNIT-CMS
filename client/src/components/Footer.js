import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer style={{ backgroundColor: "#222", color: "#fff", padding: "40px 20px", fontFamily: "Poppins, sans-serif" }}>
            <style>{`
                .footer-content {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    max-width: 1200px;
                    margin: 0 auto;
                }
                .footer-logo, .footer-links, .footer-contact, .footer-social {
                    flex: 1;
                    min-width: 220px;
                    margin: 20px 10px;
                }
                .footer-logo h2 {
                    font-size: 24px;
                    margin-bottom: 10px;
                }
                .footer-links ul {
                    list-style: none;
                    padding: 0;
                }
                .footer-links li {
                    margin: 8px 0;
                }
                .footer-links a {
                    color: #fff;
                    text-decoration: none;
                    transition: color 0.3s ease;
                }
                .footer-links a:hover {
                    color: #00bfff;
                }
                .footer-contact p, .footer-social a {
                    margin: 8px 0;
                }
                .footer-social a {
                    margin-right: 12px;
                    font-size: 20px;
                    color: #fff;
                    transition: color 0.3s ease;
                }
                .footer-social a:hover {
                    color: #00bfff;
                }
                .footer-bottom {
                    text-align: center;
                    border-top: 1px solid #444;
                    margin-top: 40px;
                    padding-top: 20px;
                    font-size: 14px;
                    color: #aaa;
                }
            `}</style>


<div className="footer-content">
    <div className="footer-logo">
        <h2>KNIT Sultanpur CMS</h2>
        <p>Kamla Nehru Institute of Technology, Sultanpur</p>
    </div>

    <div className="footer-links">
        <h3>Quick Links</h3>
        <ul>
            <li>
                <Link to="/" onClick={() => window.scrollTo(0, 0)}>Home</Link>
            </li>
            <li>
                <Link to="/about" onClick={() => window.scrollTo(0, 0)}>About Us</Link>
            </li>
            <li>
                <Link to="/contact" onClick={() => window.scrollTo(0, 0)}>Contact</Link>
            </li>
        </ul>
    </div>

    <div className="footer-contact">
        <h3>Contact Us</h3>
        <p><i className="fas fa-map-marker-alt"></i> KNIT Sultanpur Campus, Sultanpur, Uttar Pradesh</p>
        <p><i className="fas fa-phone"></i> +91 1234567890</p>
        <p><i className="fas fa-envelope"></i> info@knit.ac.in</p>
    </div>

    <div className="footer-social">
        <h3>Follow Us</h3>
        <div className="social-icons">
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-linkedin"></i></a>
        </div>
    </div>
</div>


            <div className="footer-bottom">
                &copy; {new Date().getFullYear()} KNIT Sultanpur CMS | All Rights Reserved
            </div>
        </footer>
    );
};

export default Footer;
