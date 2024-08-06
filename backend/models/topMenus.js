const Pesanan = require('../models/Pesanan');
// const Menu = require('../models/Menu');

const getTopMenus = async (req, res) => {
  const { month, year } = req.query;

  try {
    const startDate = new Date(`${year}-${month}-01`);
    const endDate = new Date(`${year}-${month}-01`);
    endDate.setMonth(endDate.getMonth() + 1);

    const topMenus = await Pesanan.aggregate([
      {
        $match: {
          tanggal_pesanan: {
            $gte: startDate,
            $lt: endDate,
          },
          status:"lunas"
        },
      },
      {
        $unwind: "$items"
      },
      {
        $group: {
          _id: '$items.id_menu',
          nama: {
            $first: "$items.nama_menu"
          },
          count: { $sum: 1 },
        }
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 3,
      }
    ]);

    res.status(200).json({ topMenus });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch top menus' });
  }
};

module.exports = { getTopMenus };
