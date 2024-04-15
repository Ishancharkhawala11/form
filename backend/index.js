const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Form')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define mongoose model
const Form = mongoose.model('form', {
  firstName: String,
  lastName: String,
  email: String,
});

// Route to handle form submissions
app.post('/form', async (req, res) => {
  try {
    const {firstName,lastName,email} = req.body;
    // Create new form document
    const formData = await Form.create({firstName,lastName,email });
    res.status(200).json(formData);
  } catch (err) {
    // Handle errors
    console.error('Error submitting form:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
