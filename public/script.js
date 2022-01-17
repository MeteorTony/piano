const WHITE_KEYS = ["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"];
const BLACK_KEYS = ["s", "d", "g", "h", "j", "l", ";"];

const keys = document.querySelectorAll(".key"); // returns an array-like object, not array
const whiteKeys = document.querySelectorAll(".key.white");
const blackKeys = document.querySelectorAll(".key.black");
const pedalButton = document.querySelector("#pedal");
const recordButton = document.querySelector(".record-button");
const playButton = document.querySelector(".play-button");
const saveButton = document.querySelector(".save-button");
const songLink = document.querySelector(".song-link");

// reduce keys array into an object (starting from an empty object)
const keyMap = [...keys].reduce((map, key) => {
  map[key.dataset.note] = key;
  return map;
}, {});

let interval = 20; // larger interval -> longer extension of note(with pedal)
let isPedalOn = false;
let lightness = 100;
let recordingStartTime;
let songNotes = currentSong ? currentSong.notes : null; // array of all different notes in song

keys.forEach((key) => {
  key.addEventListener("click", () => playNote(key));
});

if (recordButton) recordButton.addEventListener("click", toggleRecording);
if (saveButton) saveButton.addEventListener("click", saveSong);
if (playButton) playButton.addEventListener("click", playSong);

function toggleRecording() {
  recordButton.classList.toggle("active");
  activeColorChange(recordButton);
  if (isRecording()) {
    startRecording();
  } else {
    stopRecording();
  }
}

function isRecording() {
  return recordButton != null && recordButton.classList.contains("active");
}

function startRecording() {
  recordingStartTime = Date.now();
  songNotes = [];
  playButton.classList.remove("show");
  saveButton.classList.remove("show");
}

function stopRecording() {
  playSong();
  playButton.classList.add("show");
  saveButton.classList.add("show");
}

function playSong() {
  if (songNotes.length === 0) return;
  songNotes.forEach((note) => {
    setTimeout(() => {
      playNote(keyMap[note.key]);
    }, note.startTime);
  });
}

document.addEventListener("keydown", (e) => {
  if (e.repeat) return; // if pressing a key -> won't keep repeating
  const key = e.key;
  const whiteKeyIndex = WHITE_KEYS.indexOf(key);
  const blackKeyIndex = BLACK_KEYS.indexOf(key);

  if (whiteKeyIndex > -1) playNote(whiteKeys[whiteKeyIndex]);
  if (blackKeyIndex > -1) playNote(blackKeys[blackKeyIndex]);
});

function fadeOut(key) {
  const noteAudio = document.getElementById(key.dataset.note);

  let fadeAudio = setInterval(() => {
    if (noteAudio.volume >= 0.0) {
      if (noteAudio.volume - 0.01 < 0) {
        noteAudio.volume = 0.0;
        clearInterval(fadeAudio);
      } else {
        noteAudio.volume -= 0.01;
      }
    }
  }, interval);
  key.classList.remove("active");
}

function playNote(key) {
  if (isRecording()) recordNote(key.dataset.note);
  const noteAudio = document.getElementById(key.dataset.note);
  console.log(noteAudio)
  noteAudio.currentTime = 0; // can immediately restart if click multiple times
  noteAudio.volume = 1;
  noteAudio.play();
  key.classList.add("active");
  document.addEventListener("keyup", () => fadeOut(key));
  noteAudio.addEventListener("ended", () => {
    key.classList.remove("active");
  });
}

function recordNote(note) {
  songNotes.push({
    key: note,
    startTime: Date.now() - recordingStartTime,
  });
}

function saveSong() {
  axios.post("/songs", { songNotes: songNotes }).then((res) => {
    songLink.classList.add("show");
    songLink.href = `/songs/${res.data._id}`;
  });
}

pedalButton.addEventListener("click", () => {
  isPedalOn = !isPedalOn;
  pedalButton.innerHTML = `Pedal: ${(isPedalOn ? "On" : "Off")}`;
  interval = isPedalOn ? 500 : 20;
});

// color change when button is clicked (active)
function activeColorChange(elem) {
  elem.style.color = `hsl(0, 0%, ${lightness}%)`;
  elem.style.backgroundColor = `hsl(0, 0%, ${(lightness = 100 - lightness)}%)`;
}
