const Pesanan = require('../models/Pesanan');

const getRevenue = async (req, res) => {
  const { month, year } = req.query;

  try {
    const startDate = new Date(`${year}-${month}-01`);
    const endDate = new Date(`${year}-${month}-01`);
    endDate.setMonth(endDate.getMonth() + 1);

    const orders = await Pesanan.aggregate([
      {
        $match: {
          tanggal_pesanan: {
            $gte: startDate,
            $lt: endDate,
          },
          status: "lunas"
        },
      },
      {
        $group: {
          _id:null,
          totalRevenue: { $sum: '$total_harga' },
        },
      },
  		{
        $project: {
          _id:0
        }
      }
    ]);

    res.status(200).json({ total: orders[0]?.totalRevenue || 0 });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch revenue' });
  }
};

module.exports = { getRevenue };
