import express from 'express';
import { promisify } from 'util';
import redis from 'redis';

const app = express();
const port = 1245;

// Redis client setup
const redisClient = redis.createClient();
const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.set).bind(redisClient);

// Product list
const listProducts = [
  { id: 1, name: 'Suitcase 250', price: 50, stock: 4 },
  { id: 2, name: 'Suitcase 450', price: 100, stock: 10 },
  { id: 3, name: 'Suitcase 650', price: 350, stock: 2 },
  { id: 4, name: 'Suitcase 1050', price: 550, stock: 5 }
];

// Get item by ID
const getItemById = (id) => {
  return listProducts.find(item => item.id === id);
};

// Reserve stock in Redis
const reserveStockById = async (itemId, stock) => {
  await setAsync(`item.${itemId}`, stock);
};

// Get current reserved stock from Redis
const getCurrentReservedStockById = async (itemId) => {
  const stock = await getAsync(`item.${itemId}`);
  return stock ? parseInt(stock) : 0;
};

// Routes
app.get('/list_products', (req, res) => {
  const formattedProducts = listProducts.map(item => ({
    itemId: item.id,
    itemName: item.name,
    price: item.price,
    initialAvailableQuantity: item.stock
  }));
  res.json(formattedProducts);
});

app.get('/list_products/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId);
  const item = getItemById(itemId);

  if (!item) {
    return res.json({ status: "Product not found" });
  }

  const currentQuantity = item.stock - await getCurrentReservedStockById(itemId);
  res.json({
    itemId: item.id,
    itemName: item.name,
    price: item.price,
    initialAvailableQuantity: item.stock,
    currentQuantity: currentQuantity
  });
});

app.get('/reserve_product/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId);
  const item = getItemById(itemId);

  if (!item) {
    return res.json({ status: "Product not found" });
  }

  const currentQuantity = item.stock - await getCurrentReservedStockById(itemId);

  if (currentQuantity <= 0) {
    return res.json({ status: "Not enough stock available", itemId: itemId });
  }

  await reserveStockById(itemId, await getCurrentReservedStockById(itemId) + 1);
  res.json({ status: "Reservation confirmed", itemId: itemId });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
