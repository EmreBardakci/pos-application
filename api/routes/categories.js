const Category = require("../models/Category.js");
const express = require("express");
const router = express.Router();

// Kategorileri getirme
router.get("/get-all", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Kategori oluşturma
router.post("/add-category", async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    await newCategory.save();
    res.status(200).json("Kategori başarıyla oluşturuldu.");
  } catch (error) {
    res.status(400).json(error);
  }
});

// Kategori güncelleme
router.put("/update-category", async (req, res) => {
  try {
    await Category.findOneAndUpdate({ _id: req.body.categoryId }, req.body);
    res.status(200).json("Kategori başarıyla güncellendi.");
  } catch (error) {
    console.log(error);
  }
});

// Kategori silme
router.delete("/delete-category", async (req, res) => {
  try {
    await Category.findOneAndDelete({ _id: req.body.categoryId });
    res.status(200).json(" Kategori başarıyla silindi.");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
