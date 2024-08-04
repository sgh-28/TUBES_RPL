const mongoose = require('mongoose');

const mejaSchema = new mongoose.Schema({
  _id: Number,
  status: String,
  kapasitas: Number,
}, {collection: 'meja',
    versionKey: false});

const Meja = mongoose.model('Meja', mejaSchema);

module.exports = Meja;