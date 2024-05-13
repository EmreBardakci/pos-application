const User = require("../models/User.js");
const router = require("express").Router();
const bcrypt = require("bcryptjs");

// Kullanıcı oluşturma
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).json("Kullanıcı başarıyla oluşturuldu.");
  } catch (error) {
    res.status(500).json(error);
  }
});

// Kullanıcı Girişi
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
     return res.status(404).send({ error: "Kullanıcı Bulunamadı!" });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      res.status(403).json("Geçersiz şifre!");
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
