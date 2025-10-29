import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ userType, onLogout }) => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.brand}>🏸 Badminton Center</div>
      <div style={styles.navLinks}>
        <Link to="/dashboard" style={styles.link}>Dashboard</Link>
        <Link to="/enroll" style={styles.link}>Enrollment</Link>
        <Link to="/batches" style={styles.link}>Batches</Link>
        
        
      
        
        
        

        
        
        <Link to="/tournaments" style={styles.link}>Tournaments</Link>

        
        
        
      </div>
      <button onClick={onLogout} style={styles.logoutButton}>Logout</button>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "linear-gradient(90deg, #004aad, #38b6ff)",
    padding: "15px 30px",
    fontFamily: "Arial, sans-serif",
    fontSize: "18px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    color: "white",
  },
  brand: {
    fontSize: "22px",
    fontWeight: "bold",
  },
  navLinks: {
    display: "flex",
    gap: "20px",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
    transition: "color 0.3s",
    padding: "8px",
    borderRadius: "5px",
  },
  logoutButton: {
    backgroundColor: "#ff4d4d",
    color: "white",
    padding: "8px 15px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "5px",
    transition: "background 0.3s",
  },
};

export default Navbar;
