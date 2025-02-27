import express from 'express';
import fs from 'fs/promises';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';

const app = express();
const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const productsFile = './data/products.json';
const favoritesFile = './data/favorites.json';

// Middleware
app.use(express.static("public"));
app.use(express.json()); // JSON body parser
app.use(session({
  secret: 'salajane-võti',
  resave: false,
  saveUninitialized: true
}));

// 📌 Middleware: Kasutaja ID määramine sessioonis
app.use((req, res, next) => {
  if (!req.session.userId) {
    req.session.userId = `user-${Date.now()}`; // Unikaalne ID
  }
  next();
});

// 📌 GET: Tagasta sessiooni ID
app.get('/session', (req, res) => {
  res.status(200).json({ userId: req.session.userId });
});

// 📌 Funktsioon: Laadi andmed FakeStore API-st ja salvesta faili
const fetchAndSaveProducts = async () => {
  try {
    const response = await axios.get('https://fakestoreapi.com/products');
    await fs.mkdir('./data', { recursive: true });
    await fs.writeFile(productsFile, JSON.stringify(response.data, null, 2));
    console.log('✅ Andmed edukalt salvestatud.');
  } catch (error) {
    console.error('❌ Viga andmete salvestamisel:', error);
  }
};

// 📌 Funktsioon: Kontrolli, kas fail on tühi
const isFileEmpty = async (filePath) => {
  try {
    const rawData = await fs.readFile(filePath, 'utf-8');
    return !rawData.trim();
  } catch {
    return true;
  }
};

// 📌 GET: Kõik tooted
app.get('/products', async (req, res) => {
  try {
    if (await isFileEmpty(productsFile)) await fetchAndSaveProducts();
    const rawData = await fs.readFile(productsFile, 'utf-8');
    res.status(200).json(JSON.parse(rawData));
  } catch (error) {
    res.status(500).json({ error: 'Andmete lugemine ebaõnnestus' });
  }
});

// 📌 GET: Kategooriate loetelu
app.get('/products/categories', async (req, res) => {
  try {
    const rawData = await fs.readFile(productsFile, "utf-8");
    const data = JSON.parse(rawData);
    const categories = [...new Set(data.map(item => item.category))];
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Kategooriate laadimine ebaõnnestus' });
  }
});

// 📌 GET: Filtreeri kategooria järgi
app.get('/products/category/:categoryName', async (req, res) => {
  try {
    const rawData = await fs.readFile(productsFile, 'utf-8');
    const products = JSON.parse(rawData);
    const filteredProducts = products.filter(p => p.category === req.params.categoryName);
    res.status(200).json(filteredProducts);
  } catch (error) {
    res.status(500).json({ error: 'Kategooria järgi toodete lugemine ebaõnnestus' });
  }
});

// 📌 GET: Toode ID järgi
app.get('/products/:id', async (req, res) => {
  try {
    const rawData = await fs.readFile(productsFile, 'utf-8');
    const product = JSON.parse(rawData).find(p => p.id == req.params.id);
    product ? res.status(200).json(product) : res.status(404).json({ error: 'Toodet ei leitud' });
  } catch (error) {
    res.status(500).json({ error: 'Toote lugemine ebaõnnestus' });
  }
});

// 📌 GET: Kasutaja lemmiktooted
app.get('/favorites/:userId', async (req, res) => {
  try {
    const favorites = JSON.parse(await fs.readFile(favoritesFile, 'utf-8')) || {};
    res.status(200).json(favorites[req.params.userId] || []);
  } catch (error) {
    res.status(500).json({ error: 'Lemmikute lugemine ebaõnnestus' });
  }
});

// 📌 POST: Lisa lemmiktoode
app.post('/favorites/:userId', async (req, res) => {
  try {
    const { productId } = req.body;
    const favorites = JSON.parse(await fs.readFile(favoritesFile, 'utf-8')) || {};
    favorites[req.params.userId] = favorites[req.params.userId] || [];
    if (!favorites[req.params.userId].includes(productId)) {
      favorites[req.params.userId].push(productId);
    }
    await fs.writeFile(favoritesFile, JSON.stringify(favorites, null, 2));
    res.status(200).json({ message: 'Toode lisatud lemmikutesse' });
  } catch (error) {
    res.status(500).json({ error: 'Lemmikute lisamine ebaõnnestus' });
  }
});

// 📌 DELETE: Eemalda lemmiktoode
app.delete('/favorites/:userId/:productId', async (req, res) => {
  try {
    const favorites = JSON.parse(await fs.readFile(favoritesFile, 'utf-8')) || {};
    favorites[req.params.userId] = (favorites[req.params.userId] || []).filter(id => id != req.params.productId);
    await fs.writeFile(favoritesFile, JSON.stringify(favorites, null, 2));
    res.status(200).json({ message: 'Toode eemaldatud lemmikutest' });
  } catch (error) {
    res.status(500).json({ error: 'Lemmikute eemaldamine ebaõnnestus' });
  }
});

const cartFile = './data/cart.json';

// 📌 GET: Kasutaja ostukorv
app.get('/cart/:userId', async (req, res) => {
  try {
    const cart = JSON.parse(await fs.readFile(cartFile, 'utf-8')) || {};
    res.status(200).json(cart[req.params.userId] || []);
  } catch (error) {
    res.status(500).json({ error: 'Ostukorvi laadimine ebaõnnestus' });
  }
});

// 📌 POST: Lisa toode ostukorvi
app.post('/cart/:userId', async (req, res) => {
  try {
    const { productId } = req.body;
    const cart = JSON.parse(await fs.readFile(cartFile, 'utf-8')) || {};
    cart[req.params.userId] = cart[req.params.userId] || [];
    cart[req.params.userId].push(productId);
    await fs.writeFile(cartFile, JSON.stringify(cart, null, 2));
    res.status(200).json({ message: 'Toode lisatud ostukorvi' });
  } catch (error) {
    res.status(500).json({ error: 'Ostukorvi lisamine ebaõnnestus' });
  }
});

// 📌 DELETE: Eemalda toode ostukorvist
app.delete('/cart/:userId/:productId', async (req, res) => {
  try {
    const cart = JSON.parse(await fs.readFile(cartFile, 'utf-8')) || {};
    cart[req.params.userId] = (cart[req.params.userId] || []).filter(id => id != req.params.productId);
    await fs.writeFile(cartFile, JSON.stringify(cart, null, 2));
    res.status(200).json({ message: 'Toode eemaldatud ostukorvist' });
  } catch (error) {
    res.status(500).json({ error: 'Ostukorvi eemaldamine ebaõnnestus' });
  }
});


// 📌 API: Käsitsi andmete uuesti laadimine
app.get('/fetch-products', async (req, res) => {
  try {
    await fetchAndSaveProducts();
    res.status(200).json({ message: 'Andmed salvestatud products.json faili' });
  } catch (error) {
    res.status(500).json({ error: 'Andmete laadimine ebaõnnestus' });
  }
});

// 📌 Käivita server
app.listen(PORT, () => {
  console.log(`✅ Server töötab aadressil http://localhost:${PORT}`);
});
