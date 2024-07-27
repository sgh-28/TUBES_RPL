const express = require('express');
const router = express.Router();
const Meja = require('./models/Meja');

module.exports = () =>{
    router.get('/meja', async (req, res) => {
        const data = await Meja.find();
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
      
    router.get('/pesanan/ongoing', (req, res) => {
        res.send('Ongoing orders');
    });
      
    router.get('/reservasi', (req, res) => {
        res.send('Reservations');
    });

    return router;
};

