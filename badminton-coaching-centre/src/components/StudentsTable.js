import React, { useState, useEffect } from "react";

export default function StudentsTable() {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ Name: "", Age: "", Password: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch students from backend
  useEffect(() => {
    fetch("http://127.0.0.1:5000/get_students")
      .then((res) => res.json())
      .then((data) => setStudents(data.students))
      .catch(() => setError("Failed to fetch students. Try again later."))
      .finally(() => setLoading(false));
  }, []);

  // ✅ Add a new student
  const addStudent = async () => {
    if (!newStudent.Name || !newStudent.Age || !newStudent.Password) {
      alert("Please fill in all fields!");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/add_student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStudent),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Student added successfully!");
        setStudents([...students, { ...newStudent, StudentID: data.StudentID }]);
        setNewStudent({ Name: "", Age: "", Password: "" });
      } else {
        alert(data.message || "Error adding student");
      }
    } catch {
      alert("Error adding student. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📚 Student List 📚</h2>
      {loading && <p>Loading students...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && students.length === 0 && <p>No students found.</p>}

      {!loading && students.length > 0 && (
        <table style={styles.table}>
          <thead>
            <tr style={styles.headerRow}>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.StudentID} style={styles.tableRow}>
                <td>{s.StudentID}</td>
                <td>{s.Name}</td>
                <td>{s.Age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h3 style={{ marginTop: "20px" }}>➕ Add Student</h3>
      <input
        type="text"
        placeholder="Name"
        value={newStudent.Name}
        onChange={(e) => setNewStudent({ ...newStudent, Name: e.target.value })}
        style={styles.input}
      />
      <input
        type="number"
        placeholder="Age"
        value={newStudent.Age}
        onChange={(e) => setNewStudent({ ...newStudent, Age: e.target.value })}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Password"
        value={newStudent.Password}
        onChange={(e) => setNewStudent({ ...newStudent, Password: e.target.value })}
        style={styles.input}
      />
      <button style={styles.addButton} onClick={addStudent}>✅ Add Student</button>
    </div>
  );
}

// ✅ CSS-in-JS styling
const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "26px",
    fontWeight: "bold",
    color: "#1976D2",
    textShadow: "1px 1px 4px rgba(0, 0, 0, 0.2)",
  },
  table: {
    width: "80%",
    margin: "auto",
    borderCollapse: "collapse",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  },
  headerRow: {
    backgroundColor: "#1976D2",
    color: "white",
    padding: "12px",
  },
  input: {
    margin: "5px",
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  addButton: {
    padding: "10px 15px",
    backgroundColor: "#28A745",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    marginTop: "10px",
  },
};
