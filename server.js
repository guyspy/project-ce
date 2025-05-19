const express = require('express');
const { createServer } = require('http');
const path = require('path');

const app = express();
const port = 5000;

// Serve static files
app.use(express.static('.'));

// Route all requests to index.html for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const server = createServer(app);

server.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${port}`);
});