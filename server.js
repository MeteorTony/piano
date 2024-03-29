const express = require("express");
const mongoose = require("mongoose");
const Song = require("./models/song.js");
const app = express();

mongoose.connect("mongodb://localhost/songRecorder", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set("view engine", "ejs"); // specify default engine
app.use(express.json());
app.use(express.static("public")); // serve static files needed

// home page
app.get("/", (req, res) => {
  res.render("index");
});

// save recorded song
app.post("/songs", async (req, res) => {
  const song = new Song({
    notes: req.body.songNotes,
  });

  await song.save();

  res.json(song);
});

// get saved song
app.get("/songs/:id", async (req, res) => {
  let song;
  try {
    song = await Song.findById(req.params.id);
  } catch (e) {
    song = undefined;
  }

  res.render("index", { song: song });      // pass current song down to home page
});

app.listen(5000);
