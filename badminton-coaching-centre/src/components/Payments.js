import React from "react";

// Sample payment data
const payments = [
  { id: 1, student: "John Doe", amount: 5000, date: "2025-03-01", method: "Credit Card", status: "Paid" },
  { id: 2, student: "Jane Smith", amount: 4500, date: "2025-03-05", method: "UPI", status: "Pending" },
  { id: 3, student: "John Doe", amount: 5000, date: "2025-04-01", method: "Credit Card", status: "Upcoming" },
];

const students = [
  { name: "John Doe", totalFees: 10000, pendingFees: 5000 },
  { name: "Jane Smith", totalFees: 9000, pendingFees: 4500 },
];

const Payments = ({ userType, userName }) => {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Payments</h2>

      {/* Coach View */}
      {userType === "coach" ? (
        <div>
          <h3 style={styles.subHeading}>Student Fees Overview</h3>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th>Student</th>
                <th>Total Fees</th>
                <th>Pending Fees</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index} style={styles.tableRow}>
                  <td>{student.name}</td>
                  <td>${student.totalFees}</td>
                  <td style={student.pendingFees > 0 ? { color: "red" } : { color: "green" }}>
                    ${student.pendingFees}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 style={styles.subHeading}>Payment Transactions</h3>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th>Student</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
                <th>Method</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id} style={styles.tableRow}>
                  <td>{payment.student}</td>
                  <td>${payment.amount}</td>
                  <td style={getStatusStyle(payment.status)}>{payment.status}</td>
                  <td>{payment.date}</td>
                  <td>{payment.method}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        // Student View
        <div>
          <h3 style={styles.subHeading}>Your Payments</h3>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
                <th>Method</th>
              </tr>
            </thead>
            <tbody>
              {payments
                .filter((payment) => payment.student === userName)
                .map((payment) => (
                  <tr key={payment.id} style={styles.tableRow}>
                    <td>${payment.amount}</td>
                    <td style={getStatusStyle(payment.status)}>{payment.status}</td>
                    <td>{payment.date}</td>
                    <td>{payment.method}</td>
                  </tr>
                ))}
            </tbody>
          </table>

          <h3 style={styles.subHeading}>Make a Payment</h3>
          <button style={styles.payButton} onClick={() => alert("Proceeding to payment...")}>Pay Now</button>
        </div>
      )}
    </div>
  );
};

// Dynamic Status Color Styling
const getStatusStyle = (status) => ({
  color: status === "Paid" ? "green" : status === "Pending" ? "orange" : "blue",
  fontWeight: "bold",
});

// Styles
const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    fontSize: "26px",
    fontWeight: "bold",
    color: "#1976D2",
  },
  subHeading: {
    fontSize: "20px",
    marginTop: "20px",
    color: "#333",
  },
  table: {
    width: "80%",
    margin: "20px auto",
    borderCollapse: "collapse",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  },
  tableHeader: {
    backgroundColor: "#1976D2",
    color: "white",
    fontSize: "18px",
    padding: "10px",
  },
  tableRow: {
    backgroundColor: "#f9f9f9",
    textAlign: "center",
    fontSize: "16px",
    padding: "10px",
    borderBottom: "1px solid #ddd",
  },
  payButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    padding: "10px 15px",
    cursor: "pointer",
    borderRadius: "5px",
    fontSize: "16px",
    marginTop: "10px",
  },
};

export default Payments;
