import React, { useEffect, useState, useRef } from "react";

export default function CoachDashboard() {
  const [enrollments, setEnrollments] = useState([]);
  const [batches, setBatches] = useState([]);
  const studentIdRef = useRef();
  const batchIdRef = useRef();
  const batchNameRef = useRef();
  const batchTimeRef = useRef();
  const coachIdRef = useRef();

  // ✅ Fetch Data from Flask API
  useEffect(() => {
    fetch("http://127.0.0.1:5000/coach/enrollments")
      .then((res) => res.json())
      .then(setEnrollments)
      .catch((error) => console.error("Error fetching enrollments:", error));

    fetch("http://127.0.0.1:5000/coach/batches")
      .then((res) => res.json())
      .then(setBatches)
      .catch((error) => console.error("Error fetching batches:", error));
  }, []);

  // ✅ Add Enrollment
  const addEnrollment = () => {
    const newEnrollment = {
      StudentID: studentIdRef.current.value,
      BatchID: batchIdRef.current.value,
      EnrollmentDate: new Date().toISOString().split("T")[0], // Today's date
    };
  
    fetch("http://127.0.0.1:5000/coach/enrollments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEnrollment),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert("Error: " + data.error);
        } else {
          alert("Enrollment Added!");
          setEnrollments([...enrollments, { ...newEnrollment, EnrollmentID: data.EnrollmentID }]);  // ✅ Add new record with ID
        }
      })
      .catch((error) => console.error("Error adding enrollment:", error));
  };

  // ✅ Add Batch
  const addBatch = () => {
    const newBatch = {
      BatchName: batchNameRef.current.value,  // ✅ Fixed field names
      Timings: batchTimeRef.current.value,
      CoachID: coachIdRef.current.value,
    };

    fetch("http://127.0.0.1:5000/coach/batches", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBatch),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert("Error: " + data.error);
        } else {
          alert("Batch Added!");
          setBatches([...batches, newBatch]);
        }
      })
      .catch((error) => console.error("Error adding batch:", error));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🏸 Coach Dashboard 🏸</h2>

      {/* ✅ Enrollments Section */}
      <div style={styles.section}>
        <h3>📋 Enrollments</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Enrollment ID</th>
              <th style={styles.th}>Student ID</th>
              <th style={styles.th}>Batch ID</th>
              <th style={styles.th}>Enrollment Date</th>
            </tr>
          </thead>
          <tbody>
            {enrollments.map((enrollment) => (
              <tr key={enrollment.EnrollmentID}>
                <td style={styles.td}>{enrollment.EnrollmentID}</td>
                <td style={styles.td}>{enrollment.StudentID}</td>
                <td style={styles.td}>{enrollment.BatchID}</td>
                <td style={styles.td}>{enrollment.EnrollmentDate}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h4>Add Enrollment</h4>
        <input ref={studentIdRef} placeholder="Student ID" />
        <input ref={batchIdRef} placeholder="Batch ID" />
        <button onClick={addEnrollment} style={styles.button}>Add Enrollment</button>
      </div>

      {/* ✅ Batches Section */}
      <div style={styles.section}>
        <h3>📆 Batches</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Batch Name</th>
              <th style={styles.th}>Timings</th>
              <th style={styles.th}>Coach ID</th>
            </tr>
          </thead>
          <tbody>
            {batches.map((batch) => (
              <tr key={batch.BatchID}>
                <td style={styles.td}>{batch.BatchName}</td>
                <td style={styles.td}>{batch.Timings}</td>
                <td style={styles.td}>{batch.CoachID}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h4>Add Batch</h4>
        <input ref={batchNameRef} placeholder="Batch Name" />
        <input ref={batchTimeRef} placeholder="Timings" />
        <input ref={coachIdRef} placeholder="Coach ID" />
        <button onClick={addBatch} style={styles.button}>Add Batch</button>
      </div>
    </div>
  );
}


// ✅ CSS Styling Inside JavaScript
const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f4f4f4",
    minHeight: "100vh",
  },
  title: {
    textAlign: "center",
    fontSize: "26px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#333",
  },
  section: {
    marginBottom: "30px",
    padding: "15px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  },
  th: {
    backgroundColor: "#007BFF",
    color: "white",
    padding: "12px",
    border: "1px solid #ddd",
    textAlign: "left",
  },
  td: {
    padding: "10px",
    border: "1px solid #ddd",
    textAlign: "left",
  },
  input: {
    display: "block",
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  button: {
    backgroundColor: "#007BFF",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
};

