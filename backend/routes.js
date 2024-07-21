const express = require('express');
const router = express.Router();

module.exports = () =>{
    router.get('/menu', (req, res) => {
        res.send('Menu items');
    });
      
    router.get('/pesanan/ongoing', (req, res) => {
        res.send('Ongoing orders');
    });
      
    router.get('/reservasi', (req, res) => {
        res.send('Reservations');
    });

    return router;
};

