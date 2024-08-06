const Pesanan = require('../models/Pesanan');

const getTransactions = async (req, res) => {
  const { month, year } = req.query;

  try {
    const startDate = new Date(`${year}-${month}-01`);
    const endDate = new Date(`${year}-${month}-01`);
    endDate.setMonth(endDate.getMonth() + 1);
    const data = await Pesanan.find({
      tanggal_pesanan: {
        $gte: startDate,
        $lt: endDate,
      },
    });

    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};

module.exports = { getTransactions };
