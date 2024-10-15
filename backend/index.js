require('dotenv').config();
require('./Models/db');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');

const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);

app.use((req, res) => {
  res.status(404).send('Not Found');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;