const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Sample user data
const userData = {
  full_name:  "yashwanthks",
  dob: "30042002",
  email: "ys1290@srmist.edu.in",
  roll_number: "RA2011028010052",
};

// POST endpoint
app.post('/bfhl', (req, res) => {
    const { data } = req.body;
  
    if (!data || !Array.isArray(data)) {
      return res.status(400).json({ error: 'Invalid request body' });
    }
  
    // Extract alphabets and find the highest alphabet
    const alphabets = data.filter((char) => /^[A-Za-z]$/.test(char));
    const highest_alphabet = alphabets.sort((a, b) => b.localeCompare(a, undefined, { sensitivity: 'base' }))[0];
  
    const response = {
      is_success: true,
      user_id: `john_doe_${userData.dob}`,
      email: userData.email,
      roll_number: userData.roll_number,
      numbers: data.filter((char) => /^\d$/.test(char)),
      alphabets,
      highest_alphabet: [highest_alphabet],
    };
  
    res.json(response);
  });
  

// GET endpoint
app.get('/bfhl', (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
