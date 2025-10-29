import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Welcome from "./components/data/Welcome";
import Login from "./components/Login";
import Home from "./components/Home";
import CoachDashboard from "./components/CoachDashboard";
import Navbar from "./components/Navbar";
import CoachPayments from "./components/CoachPayments";
import Equipment from "./components/Equipment";
import Courts from "./components/Courts";
import Tournaments from "./components/Tournaments";
import StudentsTable from "./components/StudentsTable";
import CoachesTable from "./components/CoachesTable";
import Batches from "./components/batches";
import Enroll from "./components/enroll";

const App = () => {
    const [userType, setUserType] = useState(null);
    const [username, setUsername] = useState("");
    const [enrolled, setEnrolled] = useState(false);  // ✅ Track Enrollment

    const handleLogin = (type, name) => {
        setUserType(type);
        setUsername(name);
    };

    const handleLogout = () => {
        setUserType(null);
        setUsername("");
    };

    const handleEnrollSuccess = () => {
        setEnrolled(true); // ✅ Mark Enrollment as Successful
    };

    return (
        <Router>
            <div>
                {userType || enrolled ? (  // ✅ After enrollment, show Home
                    <>
                        <Navbar username={username} userType={userType} onLogout={handleLogout} />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/coach-dashboard" element={userType === "coach" ? <CoachDashboard /> : <Navigate to="/" />} />
                            <Route path="/coach-payments" element={<CoachPayments />} />
                            <Route path="/equipment" element={<Equipment />} />
                            <Route path="/courts" element={<Courts />} />
                            <Route path="/tournaments" element={<Tournaments />} />
                            <Route path="/batches" element={<Batches />} />
                            <Route path="/enroll" element={<Enroll onEnrollSuccess={handleEnrollSuccess} />} /> {/* ✅ Pass the function */}
                            <Route path="/students" element={<StudentsTable />} />
                            <Route path="/coaches" element={<CoachesTable />} />
                            <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                    </>
                ) : (
                    <Routes>
                        <Route path="/" element={<Welcome />} />
                        <Route path="/login" element={<Login onLogin={handleLogin} />} />
                        <Route path="/enroll" element={<Enroll onEnrollSuccess={handleEnrollSuccess} />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                )}
            </div>
        </Router>
    );
};

export default App;
