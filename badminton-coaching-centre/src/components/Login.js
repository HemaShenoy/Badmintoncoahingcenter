import React, { useState } from "react";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        onLogin(data.username); // Pass coach name to the main app
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Error connecting to server");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <h2 style={styles.title}>Coach Login</h2>
        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        {error && <p style={styles.error}>{error}</p>}
        <button onClick={handleLogin} style={styles.button}>
          Login
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundImage: "url('/images/badminton.jpg')", // Replace with your image URL
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  loginBox: {
    textAlign: "center",
    padding: "40px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Semi-transparent white background
    borderRadius: "10px",
    width: "300px",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
  },
  title: {
    marginBottom: "20px",
    color: "#333",
  },
  input: {
    display: "block",
    width: "90%",
    margin: "10px auto",
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#1976D2",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    transition: "background-color 0.3s ease, transform 0.2s ease-in-out",
  },
  buttonHover: {
    backgroundColor: "#135ba1",
  },
  error: {
    color: "#d32f2f", // Red color for error messages
    fontSize: "14px",
    marginTop: "10px",
  },
};

export default Login;
