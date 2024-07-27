const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    NIP: { type: Number, required: true, unique: true },
    Password: { type: String, required: true },
    Role: { type: String, required: true },
    Nama: { type: String, required: true},
},{collection: 'users',
    versionKey: false});

const User = mongoose.model('User', userSchema);

module.exports = User;