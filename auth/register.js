const express = require("express");
const router = express.Router();
const Register = require("../model/registerModel");

// POST /register
router.post("/", async (req, res) => {
  const { name, phone_number, username, id } = req.body;
  try {
    // Taqdim etilgan elektron pochtaga ega foydalanuvchi  mavjudligini tekshiring
    const existingUser = await Register.findOne({ id });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Bu  foydalanuvchi allaqachon mavjud" });
    }

    // Yangi Register ob'ektini yarating
    const register = new Register({
      id,
      name,
      phone_number,
      username,
    });

    // Yangi Register obyektini saqlang
    await register.save();

    // Muvaffaqiyatli xabar, ma'lumot va token bilan javob yuborish
    res.json({
      message: "Ro'yxatdan muvaffaqiyatli o'tildi ",
      register,
    });
  } catch (err) {
    // Xato javobini yuborish
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
