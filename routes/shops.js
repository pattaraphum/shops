const express     = require('express');
const router      = express.Router();
const tokenVerify = require('../middlewares/tonenHandle');
const sequelize   = require('../middlewares/databaes'); // Sequelize instance
const { DataTypes } = require('sequelize');

// Define Shop model
const Shop = sequelize.define('Shop', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'Shops',
  timestamps: true
});

// สร้างตารางถ้ายังไม่มี
(async () => {
  try {
    await Shop.sync();
    console.log('✅ Shops table synced');
  } catch (err) {
    console.error('❌ Shop.sync error:', err);
  }
})();

// Create Shop (ต้องมี token)
router.post('/', tokenVerify, async (req, res) => {
  try {
    const { name, address } = req.body;
    if (!name || !address) {
      return res.status(400).json({ error: 'ต้องระบุ name และ address' });
    }
    const shop = await Shop.create({ name, address });
    res.status(201).json({ message: 'เพิ่มร้านสำเร็จแล้ว', shop });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read all Shops หรือหาโดย name
router.get('/', async (req, res) => {
  try {
    const where = {};
    if (req.query.name) where.name = req.query.name;

    const shops = await Shop.findAll({ where });
    if (req.query.name && shops.length === 0) {
      return res.status(404).json({ message: 'ไม่พบร้านตามชื่อที่ระบุ' });
    }
    res.json(shops);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
