const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'raghhavvvv',
  password: 'Welcome123$',
  database: 'dishes_db'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Fetch all dishes
app.get('/api/dishes', (req, res) => {
  db.query('SELECT * FROM dishes', (err, results) => {
    if (err) {
      console.error('Error fetching dishes:', err);
      res.status(500).json({ error: 'Error fetching dishes' });
      return;
    }
    res.json(results);
  });
});


// Toggle isPublished status
app.put('/api/dishes/:id/toggle', (req, res) => {
  const id = req.params.id;
  db.query('UPDATE dishes SET isPublished = NOT isPublished WHERE dishId = ?', [id], (err, result) => {
    if (err) {
      console.error('Error toggling dish status:', err);
      res.status(500).json({ error: 'Error toggling dish status' });
      return;
    }
    res.json({ success: true });
  });
});
app.delete('/api/dishes/:id', async (req, res) => {
    const { id } = req.params;
    try {
      // Assuming you're using a SQL database
      await pool.query('DELETE FROM dishes WHERE dishId = $1', [id]);
      res.json({ message: 'Dish deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });
const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));