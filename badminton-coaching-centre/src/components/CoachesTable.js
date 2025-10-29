import React, { useState, useEffect } from "react";

export default function CoachesTable() {
  const [coaches, setCoaches] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/get_coaches")
      .then((res) => res.json())
      .then((data) => setCoaches(data))
      .catch((error) => console.error("Error fetching coaches:", error));
  }, []);

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>🏸 Our Coaches 🏸</h3>
      <table style={styles.table}>
        <thead style={styles.tableHeader}>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Specialization</th>
            <th>Experience</th>
          </tr>
        </thead>
        <tbody>
          {coaches.map((c) => (
            <tr key={c.CoachID} style={styles.tableRow}>
              <td>{c.CoachID}</td>
              <td>{c.Name}</td>
              <td>{c.Specialization}</td>
              <td>{c.ExperienceYears} years</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: { textAlign: "center", padding: "20px", fontFamily: "Arial, sans-serif" },
  title: { fontSize: "24px", marginBottom: "20px", color: "#1976D2" },
  table: { width: "80%", margin: "auto", borderCollapse: "collapse", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" },
  tableHeader: { backgroundColor: "#1976D2", color: "white", padding: "12px" },
  tableRow: { backgroundColor: "#f2f2f2", transition: "0.3s" },
};
