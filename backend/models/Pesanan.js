const mongoose = require('mongoose');

// Skema untuk Pesanan
const pesananSchema = new mongoose.Schema({
  no_pesanan: {
    type: String,
    unique: true,
    
  },
  tanggal_pesanan: {
    type: Date,
    required: true,
    default: Date.now,
  },
  // nama_menu: {
  //   type: String,
  //   required: true,
  // },
  // kuantitas_menu: {
  //   type: Number,
  //   required: true,
  // },
  // harga_satuan_menu: {
  //   type: Number,
  //   required: true,
  // },
  id_menu: {
    type: String,
    ref: 'Menu',
    required: true,
  },
  no_meja: {
    type: Number,
    ref: 'Meja',
    required: true,
  },
  NIP: {
    type: Number,
    ref: 'User',
    required: true,
  }
});

// Pre-save hook untuk mengatur no_pesanan secara otomatis
pesananSchema.pre('save', async function(next) {
  if (this.isNew) {
    try {
      // Mengambil pesanan dengan no_pesanan terbesar
      const pesananTerakhir = await this.constructor.findOne().sort({ no_pesanan: -1 });

      let noPesananBaru;
      if (pesananTerakhir) {
        // Mengambil nomor urut terakhir dan menambah 1
        const lastNumber = parseInt(pesananTerakhir.no_pesanan, 10);
        noPesananBaru = (lastNumber + 1).toString().padStart(5, '0');
      } else {
        // Mengatur ID pertama dengan format '00001'
        noPesananBaru = '00001';
      }

      this.no_pesanan = noPesananBaru;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

// Model untuk Pesanan
const Pesanan = mongoose.model('Pesanan', pesananSchema);

module.exports = Pesanan;