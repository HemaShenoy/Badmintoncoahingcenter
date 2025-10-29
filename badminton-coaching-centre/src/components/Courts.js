import React, { useEffect, useState } from "react";

export default function Courts() {
  const [courts, setCourts] = useState([]);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [completedTournaments, setCompletedTournaments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCourts();
  }, []);

  const fetchCourts = () => {
    fetch("http://localhost:5000/get_courts")
      .then((response) => response.json())
      .then((data) => setCourts(data))
      .catch(() => setError("Failed to load courts data."));
  };

  const fetchCompletedTournaments = (courtName) => {
    fetch(`http://localhost:5000/completed_tournaments/${courtName}`)
      .then((response) => response.json())
      .then((data) => {
        setCompletedTournaments(data.message ? [] : data);
        setSelectedCourt(courtName);
      })
      .catch(() => setCompletedTournaments([]));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🏸 Available Courts 🏸</h2>
      {error && <p style={styles.error}>{error}</p>}

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Court Name</th>
            <th style={styles.th}>Location</th>
            <th style={styles.th}>Type</th>
            <th style={styles.th}>View Completed Tournaments</th>
          </tr>
        </thead>
        <tbody>
          {courts.map((court) => (
            <tr key={court.CourtID}>
              <td style={styles.td}>{court.CourtName}</td>
              <td style={styles.td}>{court.Location}</td>
              <td style={styles.td}>{court.Type}</td>
              <td style={styles.td}>
                <button
                  onClick={() => fetchCompletedTournaments(court.CourtName)}
                  style={styles.button}
                >
                  View Tournaments
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedCourt && (
        <div>
          <h3>🏆 Completed Tournaments in {selectedCourt} 🏆</h3>
          {completedTournaments.length > 0 ? (
            <ul>
              {completedTournaments.map((tournament, index) => (
                <li key={index} style={{ color: "black", fontWeight: "bold" }}>
                  {tournament.TournamentName}
                </li>
              ))}
            </ul>
          ) : (
            <p>No completed tournaments found.</p>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    backgroundImage: "url('/images/court.jpg')",
    minHeight: "100vh",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
  title: {
    fontSize: "2.5em",
    marginBottom: "20px",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
  },
  error: {
    color: "red",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: "10px",
    borderRadius: "5px",
    fontWeight: "bold",
  },
  table: {
    width: "80%",
    borderCollapse: "collapse",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    marginBottom: "20px",
  },
  th: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "12px",
    textAlign: "left",
    fontWeight: "bold",
  },
  td: {
    padding: "12px",
    textAlign: "left",
    borderBottom: "1px solid #ddd",
    color: "black",
  },
  button: {
    backgroundColor: "#28a745",
    color: "white",
    padding: "8px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};
