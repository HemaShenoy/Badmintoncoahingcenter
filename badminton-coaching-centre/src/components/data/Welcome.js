import React from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <h1 style={styles.title}>🏸 Welcome to Badminton Coaching Center</h1>
        <p style={styles.subtitle}>Your one-stop solution for coaching, tournaments, and more!</p>
        
        <h2 style={styles.question}>Would you like to Enroll or Log in?</h2>

        <div style={styles.buttonContainer}>
          <button onClick={() => navigate("/enroll")} style={styles.buttonEnroll}>Enroll</button>
          <button onClick={() => navigate("/login")} style={styles.buttonLogin}>Login</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    background: "url('/images/court.jpg') no-repeat center center/cover",
    color: "white",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    padding: "20px",
  },
  overlay: {
    background: "rgba(0, 0, 0, 0.6)", // Slightly darker overlay for better readability
    padding: "40px",
    borderRadius: "10px",
    textAlign: "center",
  },
  title: {
    fontSize: "36px",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: "20px",
    marginTop: "10px",
  },
  question: {
    fontSize: "18px",
    fontWeight: "bold",
    marginTop: "20px",
  },
  buttonContainer: {
    marginTop: "20px",
  },
  buttonEnroll: {
    margin: "10px",
    padding: "12px 24px",
    fontSize: "18px",
    backgroundColor: "#28a745", // Green for Enroll
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background 0.3s",
  },
  buttonLogin: {
    margin: "10px",
    padding: "12px 24px",
    fontSize: "18px",
    backgroundColor: "#007bff", // Blue for Login
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background 0.3s",
  },
};

export default Welcome;
