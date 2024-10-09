const express = require("express");
const router = express.Router();
const Register = require("../model/registerModel");

// GET / users
router.get("/", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader !== "9876543210") {
      return res.status(401).json({ error: "Ruxsatsiz kirish yo'q" });
    }
    const register = await Register.find();
    res.json(register);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET / users/:id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const authHeader = req.headers.authorization;

  if (!id) {
    return res.status(400).json({ error: "Yaroqsiz ID" });
  }

  if (authHeader !== "9876543210") {
    return res.status(401).json({ error: "Ruxsatsiz kirish yo'q" });
  }

  try {
    const register = await Register.findById(id);

    if (!register) {
      return res.status(404).json({ error: "Foydalanuvchi topilmadi" });
    }

    res.json(register);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /users/:id
router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Register.findByIdAndDelete(id);

    if (result) {
      res.status(200).json({ message: "Oʻchirish muvaffaqiyatli" });
    } else {
      res.status(404).json({ message: "Foydalanuvchi topilmadi" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Serverdagi ichki xatolik" });
  }
});

// PUT /users/:id

module.exports = router;
