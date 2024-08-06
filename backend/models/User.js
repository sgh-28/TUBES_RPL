const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

mongoose.connect('mongodb://localhost:27017/tubes-rpl', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
    NIP: { type: Number, unique: true },
    Password: { type: String, required: true },
    Role: { type: String, required: true, enum:['kasir','koki','pelayan'] },
    Nama: { type: String, required: true },
    Jenis_kelamin: {type: String, required: true, enum:['Pria','Wanita']},
    Tanggal_lahir: {type: String, required: true},
    Alamat: { type: String, required: true },
    No_telp: { type: String, required: true },
    Tahun_masuk: {type: Number, required: true},
    Pend_terakhir: {type: String, required: true},
    kewarganegaraan: {type: String, required: true},
}, {
    collection: 'users',
    versionKey: false
});

userSchema.plugin(AutoIncrement, { inc_field: 'NIP', start_seq: 100001 });

const User = mongoose.model('User', userSchema);

// app.post('/api/users', async (req, res) => {
//     try {
//         const { nama, peran, jenisKelamin, tanggalLahir, alamat, noTelepon, tahunMasuk, pendidikanTerakhir, kewarganegaraan, password} = req.body;
//         const newUser = new User({
//             Password: password,
//             Role: peran,
//             Nama: nama,
//             Jenis_kelamin: jenisKelamin,
//             Tanggal_lahir: tanggalLahir,
//             Alamat: alamat,
//             No_telp: noTelepon,
//             Pend_terakhir: pendidikanTerakhir,
//             kewarganegaraan: kewarganegaraan,
//             Tahun_masuk: tahunMasuk,
//         });
//         await newUser.save();
//         res.status(201).json({ message: 'Pegawai berhasil ditambahkan', user: newUser });
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ message: 'Terjadi kesalahan', error: error.message });
//     }
// });

module.exports = User;