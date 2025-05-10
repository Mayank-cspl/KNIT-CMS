import React from "react";
import Layout from "./../components/Layout";

const About = () => {
    return (
        <Layout title={'KNIT-CMS'}>
            <div style={{ fontFamily: 'Poppins, sans-serif', color: '#333' }}>
                {/* Hero Section */}
                <div style={{ 
                    height: '50vh', 
                    background: 'linear-gradient(135deg, #00c6ff, #0072ff)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    textAlign: 'center', 
                    color: 'white',
                    padding: '0 20px'
                }}>
                    <h1>About KNIT Sultanpur CMS</h1>
                </div>

                {/* About Section */}
                <div style={{ padding: '80px 20px', backgroundColor: 'white', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2.5rem', color: '#0072ff', marginBottom: '20px' }}>Our Story</h2>
                    <p style={{ fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto' }}>
                        The KNIT Sultanpur Complaint Management System was developed to streamline the process of addressing hostel-related issues faced by students.
                    </p>
                </div>

                {/* Mission & Vision */}
                <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', padding: '40px' }}>
                    <div style={{ flex: 1, padding: '30px', backgroundColor: 'rgba(52, 152, 219, 0.1)', borderRadius: '10px' }}>
                        <h3 style={{ fontSize: '1.8rem', color: '#0072ff', marginBottom: '20px' }}>Our Mission</h3>
                        <p>To create a transparent, efficient, and user-friendly platform that bridges the communication gap between students and administration.</p>
                    </div>
                    <div style={{ flex: 1, padding: '30px', backgroundColor: 'rgba(46, 204, 113, 0.1)', borderRadius: '10px' }}>
                        <h3 style={{ fontSize: '1.8rem', color: '#0072ff', marginBottom: '20px' }}>Our Vision</h3>
                        <p>To revolutionize the way hostel complaints are managed in educational institutions across India.</p>
                    </div>
                </div>

                {/* Team Section */}
                <div style={{ padding: '80px 20px', backgroundColor: '#f8f8f8', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2.5rem', color: '#0072ff', marginBottom: '60px' }}>Meet Our Team</h2>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
                        <div style={{ width: '280px', backgroundColor: 'white', borderRadius: '10px', padding: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                            <h3>Mayank Raj</h3>
                            <h4 style={{ color: '#0072ff', fontSize: '1rem', marginBottom: '15px' }}>Project Lead</h4>
                            <h4 style={{ color: '#0072ff', fontSize: '1rem', marginBottom: '15px' }}>Full-Stack Developer</h4>
                            <p>Computer Science enthusiast with expertise in web development and project management.</p>
                        </div>
                        <div style={{ width: '280px', backgroundColor: 'white', borderRadius: '10px', padding: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                            <h3>Ashutosh Mishra</h3>
                            <h4 style={{ color: '#0072ff', fontSize: '1rem', marginBottom: '15px' }}>Frontend Developer</h4>
                            <p>Our team of dedicated developers worked tirelessly to create a robust and user-friendly platform that meets all the requirements</p>
                        </div>
                        <div style={{ width: '280px', backgroundColor: 'white', borderRadius: '10px', padding: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                            <h3>Satyam Singh</h3>
                            <h4 style={{ color: '#0072ff', fontSize: '1rem', marginBottom: '15px' }}>Frontend Developer</h4>
                            <p>Our team of dedicated developers worked tirelessly to create a robust and user-friendly platform that meets all the requirements</p>
                        </div>
                        <div style={{ width: '280px', backgroundColor: 'white', borderRadius: '10px', padding: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                            <h3>Abhishek Kumar</h3>
                            <h4 style={{ color: '#0072ff', fontSize: '1rem', marginBottom: '15px' }}>Backend Developer</h4>
                            <p>Database expert with strong skills in server-side programming and system architecture</p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default About;
