import React, { useState } from "react";

export default function Registration({ tournament, onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleRegister = async () => {
    if (!name || !email) {
      alert("Please enter all details.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/register_tournament", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          TournamentID: tournament.TournamentID,
          ParticipantName: name,
          Email: email,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        onClose(); // Close the modal after registration
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Failed to register.");
    }
  };

  return (
    <div style={styles.modal}>
      <div style={styles.modalContent}>
        <h3>Register for {tournament.Name}</h3>
        <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} style={styles.input} />
        <input type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} />
        <button onClick={handleRegister} style={styles.button}>Submit</button>
        <button onClick={onClose} style={styles.cancelButton}>Cancel</button>
      </div>
    </div>
  );
}

// Styles
const styles = {
  modal: { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center" },
  modalContent: { backgroundColor: "white", padding: "20px", borderRadius: "10px", textAlign: "center", width: "300px" },
  input: { width: "100%", padding: "10px", margin: "10px 0", borderRadius: "5px", border: "1px solid #ccc" },
  button: { backgroundColor: "#007bff", color: "white", padding: "10px", borderRadius: "5px", border: "none", cursor: "pointer", width: "100%" },
  cancelButton: { marginTop: "10px", backgroundColor: "#ccc", padding: "10px", borderRadius: "5px", border: "none", cursor: "pointer", width: "100%" },
};
