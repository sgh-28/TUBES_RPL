const mongoose = require('mongoose');

// Skema untuk Pelanggan
const pelangganSchema = new mongoose.Schema({
  no_pelanggan: {
    type: String,
    unique: true,
    required: true,
  },
  nama_pelanggan: {
    type: String,
    required: true,
  },
  jumlah_pelanggan: {
    type: Number,
    required: true,
  },
},{collection: 'pelanggan',
  versionKey: false
});

// Pre-save hook untuk mengatur no_pelanggan secara otomatis
pelangganSchema.pre('save', async function(next) {
  if (this.isNew) {
    try {
      // Mengambil pelanggan dengan no_pelanggan terbesar
      const pelangganTerakhir = await this.constructor.findOne().sort({ no_pelanggan: -1 });
      
      let noPelangganBaru;
      if (pelangganTerakhir) {
        // Meningkatkan no_pelanggan berdasarkan pelanggan terakhir
        const lastNoPelanggan = parseInt(pelangganTerakhir.no_pelanggan, 10);
        noPelangganBaru = (lastNoPelanggan + 1).toString().padStart(5, '0');
      } else {
        // Mengatur no_pelanggan pertama sebagai '00001'
        noPelangganBaru = '00001';
      }

      this.no_pelanggan = noPelangganBaru;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

// Model untuk Pelanggan
const Pelanggan = mongoose.model('Pelanggan', pelangganSchema);

module.exports = Pelanggan;