const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const Pelanggan = require('./models/Pelanggan');
const Menu = require('./models/Menu');
const Meja = require('./models/Meja');
const User = require('./models/User');

const SECRET_KEY = process.env.SECRET_KEY || crypto.randomBytes(64).toString('hex');

const blacklist = new Set();

module.exports = () =>{
    router.get('/meja', async (req, res) => {
        const data = await Meja.find();
        res.json(data);
        // res.send('Meja');
    });

    router.get('/meja:id', async (req, res) => {
        const id = req.params;
        const data = await Meja.find({_id: id});
        res.json(data);
        // res.send('Meja');
    });

    router.put('/meja/:id', async (req, res) => {
        const { id } = req.params;
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
        const {_id, nama, status, kapasitas} = req.body;
        try{
            const meja = await Meja.insertMany([{_id, nama, status, kapasitas}]);
            res.json(meja);
        }catch (error){
            res.status(500).json({message: 'Failed post meja'});
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

    router.get('/menu', async (req, res) => {
        const data = await Menu.find().select();;
        res.json(data);
    });

    router.get('/menu:id', async (req, res) => {
        const id = req.params;
        const data = await Menu.find({_id: id});
        res.json(data);
        // res.send('Meja');
    });

    router.put('/menu/:id', async (req, res) => {
        const { id } = req.params;
        const { status } = req.body;
        try {
            const menu = await Menu.findByIdAndUpdate(id, { status: status }, { new: true });
            if (!menu) {
                return res.status(404).json({ message: 'Menu not found' });
            }
            res.json(menu);
        } catch (error) {
            res.status(500).json({ message: 'Failed to update menu status' });
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

