const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/tubes-rpl', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Skema untuk Menu
const menuSchema = new mongoose.Schema({
    id_menu: {
      type: String,
      unique: true,
      // required: true,
    },
    status:{
      type: String,
      required: true,
    },
    nama_menu: {
      type: String,
      required: true,
    },
    harga_menu: {
      type: Number,
      required: true,
    },
    jenis_menu: {
      type: String,
      required: true,
      enum: ['Makanan utama', 'Cemilan', 'Minuman'], // Validasi jenis menu
    }
  }, {collection: 'menu',
    versionKey: false
  });
  
  // Pre-save hook untuk mengatur id_menu secara otomatis
  menuSchema.pre('save', async function(next) {
    if (this.isNew) {
      try {
        // Menentukan prefix berdasarkan jenis_menu
        let prefix = '';
        switch (this.jenis_menu) {
          case 'Menu utama':
            prefix = 'MU';
            break;
          case 'Cemilan':
            prefix = 'CM';
            break;
          case 'Minuman':
            prefix = 'MN';
            break;
          default:
            return next(new Error('Jenis menu tidak valid'));
        }
  
        // Mencari menu terakhir dengan prefix yang sama
        const menuTerakhir = await this.constructor.findOne({ id_menu: new RegExp(`^${prefix}`) }).sort({ id_menu: -1 });
  
        let idMenuBaru;
        if (menuTerakhir) {
          // Mengambil nomor urut terakhir dan menambah 1
          const lastNumber = parseInt(menuTerakhir.id_menu.replace(prefix, ''), 10);
          idMenuBaru = `${prefix}${(lastNumber + 1).toString().padStart(2, '0')}`;
        } else {
          // Mengatur ID pertama dengan format `prefix01`
          idMenuBaru = `${prefix}01`;
        }
  
        this.id_menu = idMenuBaru;
      } catch (error) {
        return next(error);
      }
    }
    next();
  });
  
  // Model untuk Menu
const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;