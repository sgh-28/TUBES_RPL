const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

// Skema untuk Menu
const mejaSchema = new mongoose.Schema({
    _id:{
      type: Number,
    },
    nama:{
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true,
    },
    kapasitas: {
      type: Number,
      required: true,
    }
}, { collection: 'meja', versionKey: false });

mejaSchema.plugin(AutoIncrement, { inc_field: '_id', start_seq: 1 });

const Meja = mongoose.model('Meja', mejaSchema);

module.exports = Meja;
