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

const product = [
  {
    id: 1,
    name: "apple",
    price: "11" ,
    category: "fruit",
  },
  {
    id: 2,
    name: "phone",
    price: "1000" ,
    category: "technique"
  },
  {
    id: 3,
    name: "laptop",
    price: "500" ,
    category: "technique"
  },
  {
    id: 4,
    name: "book",
    price: "10" ,
    category: "Stationery"
  },
  {
    id: 5,
    name: "pencil",
    price: "5" ,
    category: "Stationery"
  }
]

app.get('/product', (req, res) => {
    let { category, take } = req.query
    let result = product

    if (category) {
        result = result.filter(item => item.category === category)
    }

    if (take) {
        result = result.slice(0, Number(take))
    }

    res.json(result)
});

app.get('/product/:id', (req, res) => {
    const foundProduct = product.find(item => item.id === Number(req.params.id))
    
    if (!foundProduct) {
        return res.status(404).json({message: "product not found!" })
    }
    
    res.json(foundProduct)
})