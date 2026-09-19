const express = require('express')
const moment = require('moment')
const app = express()
const PORT = 3000
const HOST = "localhost"
const date = new Date()

app.use(express.json())

app.get('/timestamp', (req, res) => {
  res.json({
    time: moment().format("HH:mm:ss"),
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: "ok",
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
    price: "11",
    category: "fruit",
  },
  {
    id: 2,
    name: "phone",
    price: "1000",
    category: "technique",
  },
  {
    id: 3,
    name: "laptop",
    price: "500",
    category: "technique",
  },
  {
    id: 4,
    name: "book",
    price: "10",
    category: "Stationery",
  },
  {
    id: 5,
    name: "pencil",
    price: "5",
    category: "Stationery",
  }
]

app.get('/product', (req, res) => {
  let { category, take } = req.query
  let result = product

  if (category) {
    result = result.filter(item => item.category === category)
  }

  if (take) {
    let num = Number(take)

    if (isNaN(num) || num <= 0) {
      return res.status(400).json({ message: "The number must be greater than zero" })
    }
    
    result = result.slice(0, num)
  }

  res.json(result)
});

app.get('/product/:id', (req, res) => {
  const foundProduct = product.find(item => item.id === Number(req.params.id))

  if (!foundProduct) {
    return res.status(404).json({ message: "product not found!" })
  }

  res.json(foundProduct)
})

function addProduct(newProduct, shouldFail) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        return reject("error saving data failed")
      }
      resolve(newProduct)
    }, 500)
  });
}

app.post('/product', async (req, res) => {
    let { name, price, category } = req.body
    let { fail } = req.query

    if (!name || typeof name !== 'string' || name.trim() === '') {
        return res.status(422).json({ error: "invalid product data" })
    }

    let priceNum = Number(price)
    if (isNaN(priceNum) || priceNum <= 0) {
        return res.status(422).json({ error: "invalid product data" })
    }

    if (!category || typeof category !== 'string' || category.trim() === '') {
        return res.status(422).json({ error: "invalid product data" })
    }

    if (product.some(item => item.name === name)) {
        return res.status(409).json({ error: "product already exists" })
    }

    let newProduct = {
        id: product.length + 1,
        name,
        price: priceNum,
        category
    }

    try {
        let savedProduct = await addProduct(newProduct, fail === 'true')
        
        product.push(savedProduct)
        res.status(201).json(savedProduct)

    } catch (error) {
        res.status(500).json({ error: "save failed" })
    }
})