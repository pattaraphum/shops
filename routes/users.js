var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
let tokenVerify = require("../middlewares/tonenHandle");
const sequelize = require('../middlewares/databaes');
const { DataTypes } = require('sequelize');

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

router.get('/members', tokenVerify, function (req, res) {
    res.status(200).json({
        message: 'members success.',
        user: req.user
    });
});

router.put('/:id', tokenVerify, async (req, res) => {
    try {
        const shop = await Shop.findByPk(req.params.id);
        if (!shop) return res.status(404).json({ message: 'ไม่พบร้านนี้' });

        const { name, address } = req.body;
        await shop.update({ name, address });
        res.json({ message: 'แก้ไขร้านสำเร็จแล้ว', shop });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


router.delete('/:id', tokenVerify, async (req, res) => {
    try {
        const deletedCount = await Shop.destroy({ where: { id: req.params.id } });
        if (!deletedCount) return res.status(404).json({ message: 'ไม่พบร้านนี้' });
        res.json({ message: 'ลบร้านสำเร็จแล้ว' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
