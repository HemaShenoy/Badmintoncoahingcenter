import axios from "axios";

const BASE_URL = "http://127.0.0.1:5000";  // Flask backend URL

// Function to add a student
export const addStudent = async (studentData) => {
    try {
        const response = await axios.post(`${BASE_URL}/add_student`, studentData);
        return response.data;
    } catch (error) {
        console.error("Error adding student:", error);
        return { success: false, error: error.message };
    }
};

// Function to fetch all students
export const getStudents = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/get_students`);
        return response.data;
    } catch (error) {
        console.error("Error fetching students:", error);
        return [];
    }
};
