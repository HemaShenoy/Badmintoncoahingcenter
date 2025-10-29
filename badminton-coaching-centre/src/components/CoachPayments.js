import React, { useEffect, useState } from "react";

export default function CoachPayments() {
  const [payments, setPayments] = useState([]);
  const [newPayment, setNewPayment] = useState({
    StudentID: "",
    Amount: "",
    Date: "",
    Method: "",
  });

  // ✅ Fetch payments from Flask API
  useEffect(() => {
    fetch("http://localhost:5000/get_payments")
      .then((response) => response.json())
      .then((data) => setPayments(data))
      .catch((error) => console.error("Error fetching payments:", error));
  }, []);

  // ✅ Handle Add Payment
  const handleAddPayment = () => {
    fetch("http://localhost:5000/add_payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPayment),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert("Error adding payment: " + data.error);
        } else {
          alert("Payment Added Successfully!");
          setPayments([...payments, data]); // ✅ Use returned data with new PaymentID
          setNewPayment({ StudentID: "", Amount: "", Date: "", Method: "" });
        }
      })
      .catch((error) => console.error("Error adding payment:", error));
  };

  // ✅ Calculate aggregate functions
  const totalAmount = payments.reduce((sum, payment) => sum + parseFloat(payment.Amount || 0), 0);
  const avgAmount = payments.length > 0 ? (totalAmount / payments.length).toFixed(2) : 0;
  

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>📜 Student Payment Records (Coach View) 📜</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Payment ID</th>
            <th style={styles.th}>Student ID</th>
            <th style={styles.th}>Amount</th>
            <th style={styles.th}>Date</th>
            <th style={styles.th}>Method</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.PaymentID} style={styles.row}>
              <td style={styles.td}>{payment.PaymentID}</td>
              <td style={styles.td}>{payment.StudentID}</td>
              <td style={styles.td}>{payment.Amount}</td>
              <td style={styles.td}>{payment.Date}</td>
              <td style={styles.td}>{payment.Method}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ Aggregate Data */}
      <div style={styles.aggregateContainer}>
        <p><strong>Total Payments Received: </strong> ₹{totalAmount}</p>
        <p><strong>Average Payment Amount: </strong> ₹{avgAmount}</p>
        
        

      </div>

      {/* ✅ Add Payment Form */}
      <div style={styles.form}>
        <h3>Add Payment</h3>
        <input
          type="text"
          placeholder="Student ID"
          value={newPayment.StudentID}
          onChange={(e) => setNewPayment({ ...newPayment, StudentID: e.target.value })}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Amount"
          value={newPayment.Amount}
          onChange={(e) => setNewPayment({ ...newPayment, Amount: e.target.value })}
          style={styles.input}
        />
        <input
          type="date"
          value={newPayment.Date}
          onChange={(e) => setNewPayment({ ...newPayment, Date: e.target.value })}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Method"
          value={newPayment.Method}
          onChange={(e) => setNewPayment({ ...newPayment, Method: e.target.value })}
          style={styles.input}
        />
        <button onClick={handleAddPayment} style={styles.button}>Add Payment</button>
      </div>
    </div>
  );
}

// ✅ CSS-in-JS styles
const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#333",
  },
  table: {
    width: "80%",
    margin: "auto",
    borderCollapse: "collapse",
  },
  th: {
    backgroundColor: "#1976D2",
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
  },
  aggregateContainer: {
    marginTop: "20px",
    fontSize: "18px",
  },
  form: {
    marginTop: "20px",
  },
  input: {
    margin: "5px",
    padding: "10px",
    width: "200px",
  },
  button: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 15px",
    border: "none",
    cursor: "pointer",
  },
};
