const express = require('express');
const mongoose = require('./db');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY || crypto.randomBytes(64).toString('hex');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api', routes());
  
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    // setInterval(cleanBlacklist, 24 * 60 * 60 * 1000);
  });
