const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const registerRouter = require("./auth/register");
const users = require("./auth/user");
const post = require("./post/index");

const { MONGO_URI } = require("./api/iondex");

const app = express();

// Config
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Use routers
app.use("/register", registerRouter);
app.use("/users", users);
app.use("/post", post);

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
