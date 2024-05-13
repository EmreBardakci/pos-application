const Product = require("../models/Product.js");
const express = require("express");
const router = express.Router();

// Ürünleri getirme
router.get("/get-all", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Ürün oluşturma
router.post("/add-product", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(200).json("Ürün başarıyla oluşturuldu.");
  } catch (error) {
    res.status(400).json(error);
  }
});

// Ürün güncelleme
router.put("/update-product", async (req, res) => {
  try {
    await Product.findOneAndUpdate({ _id: req.body.productId }, req.body);
    res.status(200).json("Ürün başarıyla güncellendi.");
  } catch (error) {
    res.status(500).json(error);
  }
});

// Ürün silme
router.delete("/delete-product", async (req, res) => {
  try {
    await Product.findOneAndDelete({ _id: req.body.productId });
    res.status(200).json("Ürün başarıyla silindi.");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
