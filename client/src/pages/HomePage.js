import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Layout from "./../components/Layout";
import logo from './../components/images/log.png';

  const HomePage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    useEffect(() => {
      // Example: Check if user token is stored in localStorage
      const user = localStorage.getItem("auth");
      if (user) {
        setIsLoggedIn(true);
      }
    }, []);
  return (
    <Layout title={"KNIT Sultanpur Complaint Management System"}>
      <div style={{ fontFamily: "Poppins, sans-serif" }}>
         {/* Hero Section */}
         <section
          className="text-white text-center py-3"
          style={{
            background: "linear-gradient(135deg, #00c6ff, #0072ff)",
          }}
        >
          <div className="container py-5">
            <h1 className="display-5 fw-bold">
              Welcome to the KNIT Sultanpur Complaint Management System
            </h1>
            <p className="lead">
              Streamlining Hostel Complaints for a Better Living Experience
            </p>

            {/* Show buttons only if NOT logged in */}
            {!isLoggedIn && (
              <div className="mt-4">
                <NavLink
                  to="/register"
                  className="btn btn-primary me-3 px-4 py-2 rounded-pill fw-semibold"
                >
                  Get Started
                </NavLink>
                <NavLink
                  to="/login"
                  className="btn btn-outline-light px-4 py-2 rounded-pill fw-semibold"
                >
                  Login Now
                </NavLink>
              </div>
            )}

            <img
              src={logo}
              alt="KNIT Sultanpur Logo"
              style={{ height: "200px", marginTop: "30px" }}
            />
          </div>
        </section>

        {/* Features Section */}
        <section className="text-center py-5">
          <div className="container">
            <h2 className="mb-4">Why Choose Our Platform?</h2>
            <div className="row justify-content-center g-4">
              <div className="col-md-4">
                <div className="card h-100 p-4 shadow-sm">
                  <div className="fs-1 text-primary mb-3">
                    <i className="fas fa-file-alt"></i>
                  </div>
                  <h5 className="card-title">Easy Complaint Submission</h5>
                  <p className="card-text">Submit your complaints in just a few clicks with our user-friendly interface.</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card h-100 p-4 shadow-sm">
                  <div className="fs-1 text-primary mb-3">
                    <i className="fas fa-clock"></i>
                  </div>
                  <h5 className="card-title">Real-Time Updates</h5>
                  <p className="card-text">Get instant notifications and track the status of your complaints in real-time.</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card h-100 p-4 shadow-sm">
                  <div className="fs-1 text-primary mb-3">
                    <i className="fas fa-check-circle"></i>
                  </div>
                  <h5 className="card-title">Quick Issue Resolution</h5>
                  <p className="card-text">Our efficient system ensures your complaints are addressed promptly by the administration.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="text-center py-5 bg-light">
          <div className="container">
            <h2 className="mb-4">Complaint Categories</h2>
            <div className="row justify-content-center g-4">
              <div className="col-md-3 col-sm-6">
                <div className="card h-100 p-4 shadow-sm">
                  <div className="fs-1 text-primary mb-3">
                    <i className="fas fa-utensils"></i>
                  </div>
                  <h5>Mess Complaints</h5>
                  <p>Facing issues with mess quality or timings?</p>
                </div>
              </div>
              <div className="col-md-3 col-sm-6">
                <div className="card h-100 p-4 shadow-sm">
                  <div className="fs-1 text-primary mb-3">
                    <i className="fas fa-wifi"></i>
                  </div>
                  <h5>WiFi Complaints</h5>
                  <p>Is your internet connection slow or down?</p>
                </div>
              </div>
              <div className="col-md-3 col-sm-6">
                <div className="card h-100 p-4 shadow-sm">
                  <div className="fs-1 text-primary mb-3">
                    <i className="fas fa-home"></i>
                  </div>
                  <h5>Room Complaints</h5>
                  <p>Problems with room maintenance or facilities?</p>
                </div>
              </div>
              <div className="col-md-3 col-sm-6">
                <div className="card h-100 p-4 shadow-sm">
                  <div className="fs-1 text-primary mb-3">
                    <i className="fas fa-question-circle"></i>
                  </div>
                  <h5>Other Queries</h5>
                  <p>Got any other issues? Let us know!</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="text-center py-5">
          <div className="container">
            <h2 className="mb-5">What Our Users Say</h2>
            <div className="row justify-content-center g-4">
              <div className="col-md-5">
                <div className="p-4 bg-light border-start border-4 border-primary rounded shadow-sm text-start">
                  <p>
                    "The complaint management system has made it so much easier to report issues in the hostel. I got my WiFi fixed within a day!"
                  </p>
                  <div className="mt-3 fst-italic">
                    <strong>Rahul Sharma</strong>
                    <br />
                    <small>Computer Science, 3rd Year</small>
                  </div>
                </div>
              </div>
              <div className="col-md-5">
                <div className="p-4 bg-light border-start border-4 border-primary rounded shadow-sm text-start">
                  <p>
                    "As a hostel warden, this system has streamlined our complaint handling process. We can now prioritize and address issues more efficiently."
                  </p>
                  <div className="mt-3 fst-italic">
                    <strong>Dr. Priya Verma</strong>
                    <br />
                    <small>Hostel Administrator</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default HomePage;
