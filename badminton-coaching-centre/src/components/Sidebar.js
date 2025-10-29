import React from "react";

const Sidebar = ({ onLogout }) => {
  return (
    <div style={styles.sidebar}>
      <h2>🏸</h2>
      <button onClick={onLogout} style={styles.button}>
        Logout
      </button>
    </div>
  );
};

const styles = {
  sidebar: {
    width: "60px",
    height: "100vh",
    backgroundColor: "#333",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginTop: "20px",
    backgroundColor: "#f44336",
    color: "white",
    padding: "8px",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
  },
};

export default Sidebar;
