const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.connect(
  // "mongodb+srv://mongo:Aa55892004@cluster0.bdwd9ao.mongodb.net/?retryWrites=true&w=majority"
  process.env.DATABASE_URL
);

const user = new mongoose.Schema({
  latitude: String | Number,
  longitude: String | Number,
});

const USER = mongoose.model("User", user);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/", cors(), async (req, res) => {
  const path = __dirname + "/index.html";
  res.sendFile(path);
});

app.post("/location", cors(), async (req, res) => {
  res.status(200).send({
    message: "success",
  });
  const { latitude, longitude } = req.body;
  async function run() {
    const finalUser = new USER({ latitude, longitude });
    await finalUser.save();
  }
  run();
});

app.listen(port, () => {
  console.log("works");
});
