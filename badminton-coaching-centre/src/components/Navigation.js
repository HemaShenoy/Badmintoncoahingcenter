import React from "react";
import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav style={{ textAlign: "center", padding: "10px", background: "#ddd" }}>
      <Link to="/student-dashboard">Student Dashboard</Link> | 
      <Link to="/coach-dashboard">Coach Dashboard</Link>
    </nav>
  );
}
