const mongoose = require('mongoose');

const dbUri = 'mongodb://localhost:27017/tubes-rpl'; // Ganti dengan URI MongoDB Anda

mongoose.connect(dbUri)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => {
    console.log('MongoDB connection error:', err);
  });

module.exports = mongoose;