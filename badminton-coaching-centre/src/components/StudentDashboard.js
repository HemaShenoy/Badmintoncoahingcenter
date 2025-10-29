import React from "react";

const StudentDashboard = () => {
  // Sample data (replace with actual data fetching)
  const previousBookings = [
    { date: "2025-03-10", time: "10:00 AM - 11:00 AM", court: "Court 1" },
    { date: "2025-03-08", time: "2:00 PM - 3:00 PM", court: "Court 2" },
  ];

  const todaySchedule = [
    { time: "11:00 AM - 12:00 PM", activity: "Training Session" },
    { time: "3:00 PM - 4:00 PM", activity: "Practice Match" },
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🎾 Student Dashboard 🎾</h2>

      {/* Previous Bookings */}
      <h3 style={styles.subtitle}>📅 Previous Court Bookings</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Date</th>
            <th style={styles.th}>Time</th>
            <th style={styles.th}>Court</th>
          </tr>
        </thead>
        <tbody>
          {previousBookings.map((booking, index) => (
            <tr key={index} style={styles.row}>
              <td style={styles.td}>{booking.date}</td>
              <td style={styles.td}>{booking.time}</td>
              <td style={styles.td}>{booking.court}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Today's Schedule */}
      <h3 style={styles.subtitle}>📌 Today's Schedule</h3>
      <ul style={styles.list}>
        {todaySchedule.map((event, index) => (
          <li key={index} style={styles.listItem}>
            <strong>{event.time}</strong>: {event.activity}
          </li>
        ))}
      </ul>
    </div>
  );
};

// CSS-in-JS styles with BLUE theme
const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "26px",
    marginBottom: "20px",
    color: "#1E3A8A", // Dark Blue
    textShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
  },
  subtitle: {
    fontSize: "20px",
    margin: "15px 0",
    color: "#1E40AF", // Slightly lighter blue
  },
  table: {
    width: "80%",
    margin: "auto",
    borderCollapse: "collapse",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    overflow: "hidden",
  },
  th: {
    backgroundColor: "#2563EB", // Bright Blue
    color: "white",
    fontSize: "18px",
    padding: "12px",
    border: "1px solid #ddd",
    textAlign: "center",
  },
  td: {
    padding: "12px",
    border: "1px solid #ddd",
    textAlign: "center",
    backgroundColor: "#EFF6FF", // Light Blue
  },
  row: {
    transition: "background-color 0.3s",
  },
  list: {
    listStyleType: "none",
    padding: "0",
  },
  listItem: {
    background: "#DBEAFE", // Soft Blue
    margin: "10px auto",
    padding: "10px",
    width: "60%",
    borderRadius: "5px",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
  },
};

export default StudentDashboard;
