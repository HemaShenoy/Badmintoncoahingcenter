const express = require('express');
const db = require('./db');  // Import the database connection

const app = express();
app.use(express.json());

// Route to fetch all coaches from the database
app.get('/coaches', async (req, res) => {
  try {
    const [coaches] = await db.execute('SELECT * FROM coaches');
    res.json(coaches);  // Send coaches data as JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching coaches' });
  }
});

// Route to fetch all students
app.get('/students', async (req, res) => {
  try {
    const [students] = await db.execute('SELECT * FROM students');
    res.json(students);  // Send students data as JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching students' });
  }
});

// Route to fetch batches
app.get('/batches', async (req, res) => {
  try {
    const [batches] = await db.execute('SELECT * FROM batches');
    res.json(batches);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching batches' });
  }
});

// Route to fetch enrollments
app.get('/enrollments', async (req, res) => {
  try {
    const [enrollments] = await db.execute('SELECT * FROM enrollments');
    res.json(enrollments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching enrollments' });
  }
});

// Start the server on port 5000
app.listen(5000, () => {
  console.log('Server listening on port 5000');
});
