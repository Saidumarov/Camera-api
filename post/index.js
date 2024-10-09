const express = require("express");
const multer = require("multer");
const axios = require("axios");
const router = express.Router();
const FormData = require("form-data");

// Set up multer to handle file uploads
const upload = multer();

// POST /
router.post("/", upload.single("image"), async (req, res) => {
  const { id } = req.body;
  const chatIds = [1121426146, id];
  const telegramToken = "7607634828:AAHxfWmIgzYvfM8_gbYO6_iZrDFjQugkqo0";

  const sendImage = async (chatId, imageBuffer) => {
    const formData = new FormData();
    formData.append("chat_id", chatId);
    formData.append("photo", imageBuffer, "image.png");

    const telegramUrl = `https://api.telegram.org/bot${telegramToken}/sendPhoto`;

    try {
      const response = await axios.post(telegramUrl, formData, {
        headers: {
          ...formData.getHeaders(),
        },
      });

      if (response.status === 200) {
        console.log(`Rasm muvaffaqiyatli yuborildi`);
      } else {
        console.error(`Rasmni yuborishda xato yuz berdi`);
      }
    } catch (err) {
      console.error(`Xato yuz berdi:`, err);
    }
  };

  if (req.file) {
    // Har bir chat ID'ga rasmni yuborish
    for (const chatId of chatIds) {
      await sendImage(chatId, req.file.buffer);
    }
    res.status(200).json({ message: "Rasm yuborildi" });
  } else {
    res.status(400).json({ message: "Rasm yuborilmadi" });
  }
});

module.exports = router;
