const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = 3000;

// Connect to SQLite database
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run("CREATE TABLE user (id INT, name TEXT)");

    const stmt = db.prepare("INSERT INTO user VALUES (?, ?)");
    stmt.run(1, 'John Doe');
    stmt.finalize();
});

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '../frontend')));

// API endpoint
app.get('/api/users', (req, res) => {
    db.all("SELECT * FROM user", [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
