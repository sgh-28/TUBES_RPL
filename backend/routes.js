const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const Pelanggan = require('./models/Pelanggan');
const Menu = require('./models/Menu');
const Meja = require('./models/Meja');
const User = require('./models/User');
const Pesanan = require('./models/Pesanan');

const SECRET_KEY = process.env.SECRET_KEY || crypto.randomBytes(64).toString('hex');

const blacklist = new Set();

module.exports = () =>{
    router.get('/meja', async (req, res) => {
        const data = await Meja.find();
        res.json(data);
        // res.send('Meja');
    });

    router.get('/meja/:id', async (req, res) => {
        const id = req.params.id;
        const data = await Meja.find({_id: id});
        res.json(data);
        // res.send('Meja');
    });

    router.patch('/meja/:id', async (req, res) => {
        const id = req.params.id;
        const { status } = req.body;
        try {
            const meja = await Meja.findByIdAndUpdate(id, { status: status }, { new: true });
            if (!meja) {
                return res.status(404).json({ message: 'Meja not found' });
            }
            res.json(meja);
        } catch (error) {
            res.status(500).json({ message: 'Failed to update meja status' });
        }
    });

    router.post('/meja', async (req, res) => {
        const {nama, status, kapasitas} = req.body;
        try{
            const meja = await Meja.create([{nama, status, kapasitas}]);
            res.json(meja);
        }catch (error){
            res.status(500).json({message: 'Failed post meja', error});
        }
    });
      
    router.get('/pesanan/ongoing', (req, res) => {
        res.send('Ongoing orders');
    });
      
    router.get('/reservasi', (req, res) => {
        res.send('Reservations');
    });

    router.get('/users', async (req, res) => {
        const data = await User.find().select('NIP Role Nama');;
        res.json(data);
    });

    router.post('/users', async (req, res) => {
        const { Role, Nama, Password,Jenis_kelamin,Tanggal_lahir,Alamat,No_telp,Tahun_masuk,Pend_terakhir,kewarganegaraan } = req.body;
        try{
            const user = await User.create([{ Role, Nama, Password,Jenis_kelamin,Tanggal_lahir,Alamat,No_telp,Tahun_masuk,Pend_terakhir,kewarganegaraan}]);
            res.json(user);
            }catch (error){
                res.status(500).json({message: 'Failed post user'});
            }
    });

    router.patch('/users/:id', async (req, res) => {
        const id = req.params;
        const { status } = req.body;
        try {
            const users = await User.findByIdAndUpdate(id, { status: status }, { new: true });
            if (!users) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: 'Failed to update users status' });
        }
    });

    router.get('/menu', async (req, res) => {
        const data = await Menu.find().select();;
        res.json(data);
    });

    router.post('/menu', async (req, res) => {
        const {nama_menu, harga_menu, jenis_menu, status } = req.body;
        try{
            const menu = await Menu.create([{nama_menu, harga_menu, jenis_menu, status}]);
            res.json(menu);
            }catch (error){
                res.status(500).json({message: 'Failed post menu',error});
            }
    });

    router.get('/menu/:id_menu', async (req, res) => {
        const id = req.params.id_menu;
        const data = await Menu.find({id_menu : id});
        res.json(data);
        // res.send('Meja');
    });

    router.put('/menu/:id_menu', async (req, res) => {
        const id  = req.params.id_menu;
        const { nama_menu, harga_menu, jenis_menu, status } = req.body;
        console.log(id,nama_menu, harga_menu, jenis_menu)
        try {
            // const menu = await Menu.find({id_menu : id}).updateOne({nama_menu, harga_menu, jenis_menu});
            const menu = await Menu.findOneAndUpdate(
                { id_menu: id },
                { nama_menu, harga_menu, jenis_menu, status},
                { new: true }
            );
            if (!menu) {
                return res.status(404).json({ message: 'Menu not found' });
            }
            res.json(menu);
        } catch (error) {
            res.status(500).json({ message: 'Failed to update menu status' });
        }
    });

    router.get('/pesanan', async (req, res) => {
        try {
          const pesanans = await Pesanan.find().populate('id_menu no_meja no_pelanggan NIP');
          res.json(pesanans);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      });
      
      // Mendapatkan pesanan berdasarkan ID
      router.get('/pesanan/:id', async (req, res) => {
        try {
          const pesanan = await Pesanan.findById(req.params.id).populate('id_menu no_meja no_pelanggan NIP');
          if (!pesanan) {
            return res.status(404).json({ message: 'Pesanan not found' });
          }
          res.json(pesanan);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      });
      
      // Membuat pesanan baru
      router.post('/pesanan', async (req, res) => {
        const { id_menu, no_meja, no_pelanggan, NIP } = req.body;
        const pesanan = new Pesanan({
          id_menu,
          no_meja,
          no_pelanggan,
          NIP,
        });
      
        try {
          const newPesanan = await pesanan.save();
          res.status(201).json(newPesanan);
        } catch (error) {
          res.status(400).json({ message: error.message });
        }
      });
      
      // Memperbarui pesanan
      router.patch('/pesanan/:id', async (req, res) => {
        const updates = req.body;
        try {
          const pesanan = await Pesanan.findByIdAndUpdate(req.params.id, updates, { new: true }).populate('id_menu no_meja no_pelanggan NIP');
          if (!pesanan) {
            return res.status(404).json({ message: 'Pesanan not found' });
          }
          res.json(pesanan);
        } catch (error) {
          res.status(400).json({ message: error.message });
        }
      });

    router.post('/login', async (req, res) => {
        const { NIP, Password } = req.body;

        // Find user by NIP
        const user = await User.findOne({ NIP });

        if (!user) {
            return res.status(401).json({ message: 'Invalid NIP or password' });
        }

        // Compare passwords (plain text)
        if (user.Password !== Password) {
            return res.status(401).json({ message: 'Invalid NIP or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id, role: user.Role, nama: user.Nama }, SECRET_KEY, { expiresIn: '1h' });

        res.json({ token });
    });

    router.post('/logout', (req, res) => {
        const token = req.headers.authorization.split(' ')[1];
        blacklist.add(token);
        res.status(200).json({ message: 'Logged out successfully' });
    });

    return router;
};

