import React, { useState, useEffect } from "react";

const BatchList = () => {
  const [batches, setBatches] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/batches")
      .then((response) => response.json())
      .then((data) => setBatches(data))
      .catch((error) => console.error("Error fetching batches:", error));
  }, []);

  const handleBatchClick = (batchID) => {
    if (selectedBatch === batchID) {
      setSelectedBatch(null); // Close students section if clicked again
      setStudents([]);
      return;
    }

    setSelectedBatch(batchID);
    fetch(`http://127.0.0.1:5000/batches/${batchID}/students`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("No students found");
        }
        return response.json();
      })
      .then((data) => setStudents(data))
      .catch((error) => {
        console.error("Error fetching students:", error);
        setStudents([]); // Ensure students list is cleared on error
      });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Available Batches</h2>
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.trHeader}>
              <th style={styles.th}>Batch ID</th>
              <th style={styles.th}>Batch Name</th>
              <th style={styles.th}>Timings</th>
              <th style={styles.th}>Coach ID</th>
            </tr>
          </thead>
          <tbody>
            {batches.map((batch, index) => (
              <tr
                key={batch.BatchID}
                onClick={() => handleBatchClick(batch.BatchID)}
                style={index % 2 === 0 ? styles.trEven : styles.trOdd}
              >
                <td style={styles.td}>{batch.BatchID}</td>
                <td style={styles.td}>{batch.BatchName}</td>
                <td style={styles.td}>{batch.Timings}</td>
                <td style={styles.td}>{batch.CoachID}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedBatch && (
        <div style={styles.studentContainer}>
          <h3>Students in Batch {selectedBatch}</h3>
          {students.length > 0 ? (
            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr style={styles.trHeader}>
                    <th style={styles.th}>Student ID</th>
                    <th style={styles.th}>Name</th>
                    <th style={styles.th}>Age</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr key={student.StudentID} style={index % 2 === 0 ? styles.trEven : styles.trOdd}>
                      <td style={styles.td}>{student.StudentID}</td>
                      <td style={styles.td}>{student.Name}</td>
                      <td style={styles.td}>{student.Age}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No students enrolled in this batch.</p>
          )}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
    maxWidth: "90%",
    margin: "auto",
  },
  heading: {
    color: "#333",
    marginBottom: "15px",
  },
  tableWrapper: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "white",
    cursor: "pointer",
  },
  th: {
    background: "#004aad",
    color: "white",
    padding: "12px",
    textAlign: "left",
    border: "1px solid #ddd",
  },
  td: {
    padding: "10px",
    border: "1px solid #ddd",
  },
  trHeader: {
    borderBottom: "2px solid #004aad",
  },
  trEven: {
    backgroundColor: "#f2f2f2",
  },
  trOdd: {
    backgroundColor: "#ffffff",
  },
  studentContainer: {
    marginTop: "20px",
    padding: "15px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
  },
};

export default BatchList;
