const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes.js');
const connectDB = require('./config/db.js');
require('dotenv').config();

const app = express();

// mw configuration
app.use(cors());
app.use(express.json());

// connect to DB
connectDB();

const PORT = process.env.PORT || 5000;

// server
app.listen(PORT, () => {
    console.log('Server is running on http://localhost:5000');
});

app.use('/', routes);