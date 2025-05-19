// Simple Express server to serve the static files
const express = require('express');
const path = require('path');
const app = express();
const port = 5000;

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

// Fallback route for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${port}`);
});