const mongoose = require('mongoose');

const Nota_pesananSchema = new mongoose.Schema({
    no_pesanan: {
        type: String,
        unique: true,
        ref:'Pesanan'
    },
    // tanggal_pesanan: {
    //     type: Date,
    //     require: true,
    //     default: Date.now,
    // },
    id_menu: {
        type: String,
        ref: 'Menu',
        required: true,
    },
    // no_meja: {
    //     type: Number,
    //     ref:'Meja',
    //     required: true,
    // },
    kuantitas_menu: {
        type: Number,
        required: true
    },
    // harga_satuan: {
    //     type: Number,
    //     ref:'Menu',
    //     required: true,
    // },
    // total_harga: {
    //     type: Number,
    //     required: true,
    // },


});

const Pesanan = mongoose.model('Nota_pesanan', Nota_pesananSchema);

module.exports = Pesanan;