const express = require('express');
const fs = require('fs');
const https = require('https');
const cors = require('cors');
const path = require('path');
const http = require('http');

const app = express();
const PORT = 3000;

// SSL options for HTTPS
const sslOptions = {
  key: fs.readFileSync('./server.key'),
  cert: fs.readFileSync('./server.cert'),
};

// CORS options
const corsOptions = {
  origin: ['https://bet-filter.vercel.app'], // Adjusted for HTTPS
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.get('/totalizator1', (req, res) => {
  res.json({ message: 'Hello from HTTPS server' });
});

app.get('/api/getOdds', (req, res) => {
  res.json({ message: 'Odds data' });
});

// Create an HTTPS server
https.createServer(sslOptions, app).listen(PORT, () => {
  console.log(`HTTPS server running on port ${PORT}`);
});

// Uncomment for HTTP (ensure not using HTTP when using HTTPS in production)
// http.createServer(app).listen(PORT, () => {
//   console.log(`HTTP server running on port ${PORT}`);
// });

const env = process.env.NODE_ENV || 'development'; // default to 'development' if NODE_ENV is not set
console.log(`The application is running in ${env} mode.`);
