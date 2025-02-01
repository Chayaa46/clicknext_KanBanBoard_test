const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/data', (req, res) => {
  res.json({ message: 'Gung and Friend' });
});

app.post('/api/create', (req, res) => {
  const data = req.body;
  res.json({ success: true, data });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));