const Bill = require("../models/Bill.js");
const express = require("express");
const router = express.Router();

// Faturaları getirme
router.get("/get-all", async (req, res) => {
  try {
    const bills = await Bill.find();
    res.status(200).json(bills);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Fatura oluşturma
router.post("/add-bill", async (req, res) => {
  try {
    const newBill = new Bill(req.body);
    await newBill.save();
    res.status(200).json("Fatura başarıyla oluşturuldu.");
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
