import React, { useState, useEffect } from "react";
import Registration from "./Registration";

export default function Tournaments() {
  const [tournaments, setTournaments] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [showAddTournament, setShowAddTournament] = useState(false);
  const [newTournament, setNewTournament] = useState({
    Name: "",
    Date: "",
    Location: "",
    CoachID: "",
  });

  useEffect(() => {
    fetchTournaments();
    fetchCoaches();
  }, []);

  const fetchTournaments = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/get_tournaments");
      const data = await response.json();
      setTournaments(data);
    } catch (error) {
      console.error("Error fetching tournaments:", error);
    }
  };

  const fetchCoaches = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/get_coaches");
      const data = await response.json();
      setCoaches(data);
    } catch (error) {
      console.error("Error fetching coaches:", error);
    }
  };

  const getCoachName = (coachID) => {
    const coach = coaches.find((c) => c.CoachID === coachID);
    return coach ? coach.Name : "Unknown Coach";
  };

  const upcomingTournaments = tournaments.filter((t) => t.Status === "Upcoming");
  const recentTournaments = tournaments.filter((t) => t.Status === "Completed");

  const handleAddTournament = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/add_tournament", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTournament),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Tournament added successfully!");
        setShowAddTournament(false);
        fetchTournaments();
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error("Error adding tournament:", error);
    }
  };

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#f4f4f8',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    },
    heading: {
      textAlign: 'center',
      color: '#333',
      marginBottom: '30px',
      fontSize: '2.5em',
      textTransform: 'uppercase',
      letterSpacing: '2px'
    },
    sectionHeading: {
      color: '#2c3e50',
      borderBottom: '3px solid #3498db',
      paddingBottom: '10px',
      marginBottom: '20px'
    },
    tournamentContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: '20px',
      marginBottom: '30px'
    },
    tournamentCard: {
      backgroundColor: 'white',
      border: '1px solid #e0e0e0',
      borderRadius: '10px',
      padding: '20px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center'
    },
    registerButton: {
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      padding: '10px 15px',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      marginTop: '15px'  // Added margin to center better
    },
    

    recentTournamentsList: {
      listStyle: 'none',
      padding: 0
    },
    recentTournamentItem: {
      backgroundColor: '#f9f9f9',
      borderBottom: '1px solid #e0e0e0',
      padding: '10px 15px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    emptyState: {
      textAlign: 'center',
      color: '#7f8c8d',
      fontStyle: 'italic'
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🏆 Tournaments 🏆</h2>

      {/* ➕ Add Tournament Button */}
      <button style={styles.registerButton} onClick={() => setShowAddTournament(!showAddTournament)}>
        ➕ Add Tournament
      </button>

      {/* Add Tournament Form */}
      {showAddTournament && (
        <div style={styles.tournamentCard}>
          <h3>Add New Tournament</h3>
          <input
            type="text"
            placeholder="Tournament Name"
            value={newTournament.Name}
            onChange={(e) => setNewTournament({ ...newTournament, Name: e.target.value })}
            style={styles.input}
          />
          <input
            type="date"
            value={newTournament.Date}
            onChange={(e) => setNewTournament({ ...newTournament, Date: e.target.value })}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Location"
            value={newTournament.Location}
            onChange={(e) => setNewTournament({ ...newTournament, Location: e.target.value })}
            style={styles.input}
          />
          <select
            value={newTournament.CoachID}
            onChange={(e) => setNewTournament({ ...newTournament, CoachID: e.target.value })}
            style={styles.input}
          >
            <option value="">Select Coach</option>
            {coaches.map((coach) => (
              <option key={coach.CoachID} value={coach.CoachID}>
                {coach.Name}
              </option>
            ))}
          </select>
          <button onClick={handleAddTournament} style={styles.registerButton}>
            ✅ Submit
          </button>
        </div>
      )}

      {/* Upcoming Tournaments */}
      <h3 style={styles.sectionHeading}>Upcoming Tournaments</h3>
      <div style={styles.tournamentContainer}>
        {upcomingTournaments.length > 0 ? (
          upcomingTournaments.map((tournament) => (
            <div key={tournament.TournamentID} style={styles.tournamentCard}>
              <h3>{tournament.Name}</h3>
              <p><strong>Date:</strong> {tournament.Date}</p>
              <p><strong>Location:</strong> {tournament.Location}</p>
              <p><strong>Coach:</strong> {getCoachName(tournament.CoachID)}</p>
              <button style={styles.registerButton} onClick={() => setSelectedTournament(tournament)}>✅ Register</button>
            </div>
          ))
        ) : (
          <p style={styles.emptyState}>No upcoming tournaments.</p>
        )}
      </div>

      {/* Recent Tournaments */}
      <h3 style={styles.sectionHeading}>Recent Tournaments</h3>
      <ul style={styles.recentTournamentsList}>
        {recentTournaments.length > 0 ? (
          recentTournaments.map((tournament) => (
            <li key={tournament.TournamentID} style={styles.recentTournamentItem}>
              <span>{tournament.Name} ({tournament.Date}) - Winner: {tournament.Winner || "Not Announced"}</span>
            </li>
          ))
        ) : (
          <p style={styles.emptyState}>No recent tournaments.</p>
        )}
      </ul>

      {/* Show Registration Modal */}
      {selectedTournament && (
        <Registration tournament={selectedTournament} onClose={() => setSelectedTournament(null)} />
      )}
    </div>
  );
}
