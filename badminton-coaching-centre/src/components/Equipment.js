import React, { useEffect, useState, useRef } from "react";

export default function Equipment() {
  const [equipment, setEquipment] = useState([]);
  const nameRef = useRef();
  const quantityRef = useRef();
  const conditionRef = useRef();

  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = () => {
    fetch("http://localhost:5000/get_equipment")
      .then((response) => response.json())
      .then((data) => setEquipment(data))
      .catch((error) => console.error("Error fetching equipment:", error));
  };

  const addEquipment = () => {
    const newItem = {
      Name: nameRef.current.value,
      Quantity: quantityRef.current.value,
      Condition: conditionRef.current.value,
    };

    fetch("http://localhost:5000/add_equipment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    })
      .then((response) => response.json())
      .then(() => {
        fetchEquipment();
        nameRef.current.value = "";
        quantityRef.current.value = "";
        conditionRef.current.value = "";
      })
      .catch((error) => console.error("Error adding equipment:", error));
  };


  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      padding: "20px",
      background: "url('/images/eqiupment.jpg') no-repeat center center/cover",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    title: {
      fontSize: "2.5em",
      marginBottom: "20px",
      color: "#333",
      textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
    },
    addForm: {
      display: "flex",
      marginBottom: "20px",
      gap: "10px",
    },
    input: {
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      width: "150px",
    },
    addButton: {
      padding: "10px 20px",
      background: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      "&:hover": {
        background: "#0056b3",
      },
    },
    table: {
      width: "80%",
      borderCollapse: "collapse",
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      overflow: "hidden",
    },
    th: {
      backgroundColor: "#007bff",
      color: "white",
      padding: "12px 15px",
      textAlign: "left",
      fontWeight: "bold",
    },
    td: {
      padding: "12px 15px",
      textAlign: "left",
      borderBottom: "1px solid #ddd",
      color: "#333",
    },
    row: {
      "&:nth-child(even)": {
        backgroundColor: "#f2f2f2",
      },
    },
    image: {
      width: "50px",
      height: "50px",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "cover",
      borderRadius: "5px",
    },
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>🏸 Available Equipment 🏸</h3>

      <div style={styles.addForm}>
        <input type="text" placeholder="Name" ref={nameRef} style={styles.input} />
        <input type="number" placeholder="Quantity" ref={quantityRef} style={styles.input} />
        <input type="text" placeholder="Condition" ref={conditionRef} style={styles.input} />
        <button onClick={addEquipment} style={styles.addButton}>➕ Add</button>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Quantity</th>
            <th style={styles.th}>Condition</th>
          </tr>
        </thead>
        <tbody>
          {equipment.map((item) => (
            <tr key={item.EquipmentID} style={styles.row}>
              <td style={styles.td}>{item.EquipmentID}</td>

              <td style={styles.td}>{item.Name}</td>
              <td style={styles.td}>{item.Quantity}</td>
              <td style={styles.td}>{item.Condition}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}