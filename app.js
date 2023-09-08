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
 // POST endpoint
app.post('/bfhl', (req, res) => {
  const { data } = req.body;

  if (!data || !Array.isArray(data)) {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  // Extract alphabets and find the highest alphabet
  const alphabets = [];
  let highest_alphabet = null;
  const numbers = [];

  for (const char of data) {
    if (/^[A-Za-z]$/.test(char)) {
      alphabets.push(char);
      if (!highest_alphabet || char > highest_alphabet) {
        highest_alphabet = char;
      }
    } else if (/^\d+$/.test(char)) {
      numbers.push(char);
    }
  }

  const response = {
    is_success: true,
    user_id: `yashwanth_ks_${userData.dob}`,
    email: userData.email,
    roll_number: userData.roll_number,
    numbers,
    alphabets,
    highest_alphabet: highest_alphabet ? [highest_alphabet] : [],
  };

  res.json(response);
});


// GET endpoint
app.get('/bfhl', (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

app.listen(port, () => {
  console.log(`Server is running on port --- ${port}`);
});
