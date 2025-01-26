const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { solve } = require('./solve'); // Import the solver function

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 8000;
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.post('/solve', (req, res) => {
  const numbers = req.body.numbers;

  // Validate input
  if (!Array.isArray(numbers) || numbers.length !== 81) {
    return res.status(400).json({ error: 'Invalid input. Provide an array of 81 numbers.' });
  }

  const solution = solve(numbers);
  if (solution) {
    res.json({ solution });
  } else {
    res.status(400).json({ error: 'No solution exists for the provided Sudoku puzzle.' });
  }
});

app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));