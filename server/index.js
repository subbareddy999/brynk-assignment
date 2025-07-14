const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const db = new sqlite3.Database(':memory:');
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS heading (id INTEGER PRIMARY KEY, content TEXT)");
  db.run("INSERT INTO heading (content) VALUES (?)", ["Hyper boost your Revenue Management, Marketing and Commercial Functions with Business Ready AI"]);
});

app.get('/api/heading', (req, res) => {
  db.get("SELECT content FROM heading WHERE id = 1", (err, row) => {
    if (err) return res.status(500).send(err);
    res.json({ heading: row.content });
  });
});

app.post('/api/heading', (req, res) => {
  const { content } = req.body;
  db.run("UPDATE heading SET content = ? WHERE id = 1", [content], function(err) {
    if (err) return res.status(500).send(err);
    res.json({ success: true });
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
