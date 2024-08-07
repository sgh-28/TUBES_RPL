const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const Menu = require('./models/Menu');
const Meja = require('./models/Meja');
const User = require('./models/User');
const Pesanan = require('./models/Pesanan');
const { getTopMenus } = require('./models/topMenus');
const { getRevenue } = require('./models/getRevenue');
const { getTransactions } = require('./models/pesananbyMonth');
const { stat } = require('fs');

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

    router.put('/meja/:id', async (req, res) => {
        const id = req.params.id;
        const { nama, status, kapasitas } = req.body;
        try {
            const meja = await Meja.findByIdAndUpdate(
              { _id: id },
              { nama, status, kapasitas},
              { new: true });
            if (!meja) {
                return res.status(404).json({ message: 'Meja not found' });
            }
            res.json(meja);
        } catch (error) {
            res.status(500).json({ message: 'Failed to update meja status' });
        }
    });

    router.delete('/meja/:id', async (req, res) => {
      const _id = req.params.id;
      try {
        const meja = await Meja.findByIdAndDelete(_id);
        if (!meja) {
          return res.status(404).json({ message: 'Meja not found' });
          }
          res.json(meja);
          } catch (error) {
            res.status(500).json({ message: 'Failed to delete meja' });
          }
    });

    router.post('/meja', async (req, res) => {
        const {nama, status, kapasitas} = req.body;
        console.log(nama, status, kapasitas);
        try{
            const meja = await Meja.create([{nama, status, kapasitas}]);
            res.json(meja);
        }catch (error){
            res.status(500).json({message: 'Failed post meja', error});
        }
    });

    // router.get('/meja/next-id', async (req, res) => {
    //     try {
    //       const lastMeja = await Meja.findOne().sort({ _id: -1 });
    //       const nextId = lastMeja ? lastMeja._id + 1 : 1;
    //       res.json({ nextId });
    //     } catch (error) {
    //       res.status(500).json({ message: 'Failed to fetch the next ID' });
    //     }
    //   });
      
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

    router.get('/users/:id', async (req, res) => {
      const id = req.params.id;
      try{
        const user = await User.findOne({NIP:id});
        if(!user){
          return res.status(404).json({ message: 'User not found' });
          }
          res.json(user);
      } catch(error){
        res.status(500).json({message: 'Failed to get user', error});
      }

    });

    router.post('/users', async (req, res) => {
        const { Role, Nama, Password,Jenis_kelamin,Tanggal_lahir,Alamat,No_telp,Tahun_masuk,Pend_terakhir,kewarganegaraan } = req.body;
        try{
            const user = await User.create([{ Role, Nama, Password,Jenis_kelamin,Tanggal_lahir,Alamat,No_telp,Tahun_masuk,Pend_terakhir,kewarganegaraan}]);
            res.json(user);
            }catch (error){
                res.status(500).json({message: 'Failed post user', error});
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

    router.put('/users/:id', async (req, res) => {
      const id = req.params.id;
      const { Role, Nama, Password,Jenis_kelamin,Tanggal_lahir,Alamat,No_telp,Tahun_masuk,Pend_terakhir,kewarganegaraan } = req.body;
      // console.log(id, Role, Nama, Password,Jenis_kelamin,Tanggal_lahir,Alamat,No_telp,Tahun_masuk,Pend_terakhir,kewarganegaraan );
      try {
          const user = await User.findOneAndUpdate(
            { NIP: parseInt(id) },
            { Role, Nama, Password,Jenis_kelamin,Tanggal_lahir,Alamat,No_telp,Tahun_masuk,Pend_terakhir,kewarganegaraan},
            { new: true });
          if (!user) {
              return res.status(404).json({ message: 'User not found' });
          }
          res.json(user);
      } catch (error) {
          res.status(500).json({ message: 'Failed to update user status', error});
      }
  });

  router.delete('/users/:NIP', async (req, res) => {
    const NIP = req.params.NIP;
    try {
      const user = await User.deleteOne({NIP});
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
        } catch (error) {
          res.status(500).json({ message: 'Failed to delete user' });
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

    router.get('/menu/category/:category', async (req, res) => {
      const category = req.params.category;
      try {
          const menus = await Menu.find({ jenis_menu: category });
          res.json(menus);
      } catch (error) {
          res.status(500).json({ message: 'Failed to fetch menu items by category', error });
      }
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

    router.delete('/menu/:id_menu', async (req, res) => {
      const id_menu = req.params.id_menu;
    
      try {
        const result = await Menu.deleteOne({id_menu:id_menu});
        console.log(result)
        console.log(id_menu)
    
        if (result.deletedCount === 1) {
          res.status(200).json({ message: 'Menu deleted successfully' });
        } else {
          res.status(404).json({ message: 'Menu not found' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Server error', error});
      }
    });
    

    router.get('/pesanan', async (req, res) => {
        try {
          const pesanans = await Pesanan.find().select();
          res.json(pesanans);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      });
      
      // Mendapatkan pesanan berdasarkan ID
      router.get('/pesanan/:id', async (req, res) => {
        try {
          const pesanan = await Pesanan.find({no_pesanan:req.params.id}).select();
          if (!pesanan) {
            return res.status(404).json({ message: 'Pesanan not found' });
          }
          res.json(pesanan);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      });
      
      // Membuat pesanan baru
      // router.post('/pesanan', async (req, res) => {
      //   const { id_menu, no_meja, NIP } = req.body;
      //   const pesanan = new Pesanan({
      //     id_menu,
      //     no_meja,
      //     NIP,
      //   });
      
      //   try {
      //     const newPesanan = await pesanan.save();
      //     res.status(201).json(newPesanan);
      //   } catch (error) {
      //     res.status(400).json({ message: error.message });
      //   }
      // });

      router.post('/pesanan', async (req, res) => {
        try {
          const { orders, no_meja, NIP } = req.body;
      
          const pesananBaru = new Pesanan({
            tanggal_pesanan: new Date(),
            total_harga: orders.reduce((total, order) => total + order.harga_menu * order.quantity, 0),
            items: orders,
            no_meja,
            NIP,
            status: "berlangsung",
            jenis_pembayaran: ""
          });

          console.log(pesananBaru);
      
          await pesananBaru.save();
          res.status(201).json({ message: 'Pesanan berhasil dibuat', pesanan: pesananBaru });
        } catch (error) {
          res.status(500).json({ message: 'Terjadi kesalahan', error: error.message });
        }
      });
      
      // Memperbarui pesanan
      router.patch('/pesanan/:id', async (req, res) => {
        const id = req.params.id;
        const {status, jenis_pembayaran} = req.body;
        try {
          const pesanan = await Pesanan.findOneAndUpdate({no_pesanan: id}, {status, jenis_pembayaran}, { new: true });
          if (!pesanan) {
            return res.status(404).json({ message: 'Pesanan not found' });
          }
          res.json(pesanan);
        } catch (error) {
          res.status(400).json({ message: error.message });
        }
      });

      // router.get('/pesanan', async (req, res) => {
      //   try {
      //     const pesanan = await Pesanan.find().populate('id_menu').populate('no_meja').populate('NIP');
      //     res.json(pesanan);
      //   } catch (error) {
      //     res.status(500).json({ message: 'pesanan not found' });
      //   }
      // });

      router.get('/pesanan/nomeja/:id', async (req, res) => {
        const nomeja = req.params.id;

        try{
          const pesanan = await Pesanan.find({no_meja: nomeja, status:"tagihan"});
          res.json(pesanan);
        } catch (error) {
          res.status(500).json({ message: 'pesanan not found' });
        }
      });

      router.get('/pendapatan', getRevenue);

      router.get('/topmenus', getTopMenus);

      router.get('/transaksi', getTransactions);

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
        const token = jwt.sign({ NIP: user?.NIP, role: user.Role, nama: user.Nama }, SECRET_KEY, { expiresIn: '1h' });

        res.json({ token });
    });

    router.post('/logout', (req, res) => {
        const token = req.headers.authorization.split(' ')[1];
        blacklist.add(token);
        res.status(200).json({ message: 'Logged out successfully' });
    });

    return router;
};

