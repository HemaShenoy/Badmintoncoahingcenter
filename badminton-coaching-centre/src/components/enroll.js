import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

const Enroll = ({ onEnrollSuccess }) => {  // ✅ Accept onEnrollSuccess prop
    const [batches, setBatches] = useState([]);
    const [selectedBatch, setSelectedBatch] = useState("");
    const [studentName, setStudentName] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate(); // ✅ Initialize navigate

    // ✅ Fetch batches when component loads
    useEffect(() => {
        fetch("http://127.0.0.1:5000/batches")
            .then((response) => response.json())
            .then((data) => setBatches(data))
            .catch((error) => console.error("Error fetching batches:", error));
    }, []);

    const handleEnroll = () => {
        if (!studentName || !selectedBatch) {
            alert("Please enter Student Name and select a batch.");
            return;
        }

        const requestData = { Name: studentName, BatchID: Number(selectedBatch) };

        fetch("http://127.0.0.1:5000/enroll", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestData),
        })
        .then((response) => response.json())
        .then((data) => {
            setMessage(data.message || data.error);

            if (data.message) {
                setTimeout(() => {
                    onEnrollSuccess();  // ✅ Notify App.js that enrollment was successful
                    navigate("/");      // ✅ Redirect to Home
                }, 2000);
            }
        })
        .catch((error) => {
            console.error("Error enrolling student:", error);
            setMessage("An error occurred while enrolling.");
        });
    };

    return (
        <div style={styles.container}>
            <div style={styles.overlay}>
                <h2 style={styles.heading}>Enroll in Batch</h2>
                <label style={styles.label}>Student Name:</label>
                <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Enter Student Name"
                    style={styles.input}
                />
                <label style={styles.label}>Select Batch:</label>
                <select 
                    value={selectedBatch} 
                    onChange={(e) => setSelectedBatch(e.target.value)} 
                    style={styles.select}
                >
                    <option value="">-- Select Batch --</option>
                    {batches.map((batch) => (
                        <option key={batch.BatchID} value={batch.BatchID}>
                            {batch.BatchName} ({batch.Timings})
                        </option>
                    ))}
                </select>
                <button onClick={handleEnroll} style={styles.button}>Enroll</button>
                {message && <p style={styles.message}>{message}</p>}
            </div>
        </div>
    );
};

const styles = {
    container: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "url('/images/badminton.jpg') no-repeat center center/cover", // ✅ Background Image
        position: "relative",
    },
    overlay: {
        background: "rgba(0, 0, 0, 0.6)", // ✅ Dark overlay for better readability
        padding: "40px",
        borderRadius: "10px",
        textAlign: "center",
        color: "white",
        boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
    },
    heading: {
        fontSize: "24px",
        marginBottom: "15px",
    },
    label: {
        display: "block",
        fontWeight: "bold",
        marginBottom: "5px",
    },
    input: {
        width: "100%",
        padding: "10px",
        marginBottom: "15px",
        borderRadius: "5px",
        border: "1px solid #ccc",
    },
    select: {
        width: "100%",
        padding: "10px",
        marginBottom: "15px",
        borderRadius: "5px",
        border: "1px solid #ccc",
    },
    button: {
        backgroundColor: "#ffcc00",
        color: "#004aad",
        padding: "10px 15px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontWeight: "bold",
        transition: "background 0.3s",
    },
    message: {
        marginTop: "10px",
        fontWeight: "bold",
        color: "#0f0",
    },
};

export default Enroll;
