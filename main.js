const express = require('express')
const moment = require('moment')
const app = express()
const PORT = 3000
const HOST = "localhost"

app.get('/timestamp', (req, res) => {
  res.json({
    time: moment().format("HH:mm:ss"),
  });
});

app.listen(PORT, () => {
  console.log(`http://${HOST}:${PORT}`)
  console.log(`http://${HOST}:${PORT}`)
});