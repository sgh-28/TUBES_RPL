const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    'Id_menu' : String,
    'Nama_Menu' : String,
    'Gambar_menu' : ,
    'Bahan_Bahan' : Text,
    'Harga_menu' : Number,
    'Jenis_Menu' : String,
    'Id_admin' : String
})