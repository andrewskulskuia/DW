const express = require('express')
const moment = require('moment')
const app = express()
const PORT = 3000
const HOST = "localhost"
const date = new Date()

app.get('/timestamp', (req, res) => {
  res.json({
    time: moment().format("HH:mm:ss"),
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: ok,
  });
});

app.get('/stats', (req, res) => {
    res.json({
        uptime: process.uptime(),
        nodeVersion: process.version,
        timestamp: date.toLocaleString()
    });
});


app.listen(PORT, () => {
  console.log(`http://${HOST}:${PORT}`)
});