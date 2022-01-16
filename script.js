const WHITE_KEYS = ["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"];
const BLACK_KEYS = ["s", "d", "g", "h", "j", "l", ";"];

const keys = document.querySelectorAll(".key");
const whiteKeys = document.querySelectorAll(".key.white");
const blackKeys = document.querySelectorAll(".key.black");
const pedal = document.getElementById("pedal");

var interval = 10;      // larger interval -> longer extension of note(with pedal)
var isPedalOn = false;

keys.forEach((key) => {
  key.addEventListener("click", () => playNote(key));
});

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

  var fadeAudio = setInterval(() => {
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
  const noteAudio = document.getElementById(key.dataset.note);
  noteAudio.currentTime = 0; // can immediately restart if click multiple times
  noteAudio.volume = 1;
  noteAudio.play();
  key.classList.add("active");
  document.addEventListener("keyup", () => fadeOut(key));
  noteAudio.addEventListener("ended", () => {
    key.classList.remove("active");
  });
}

pedal.innerHTML += `: ${isPedalOn}`;

pedal.addEventListener("click", () =>{
    pedal.innerHTML = `pedal: ${isPedalOn = !isPedalOn}`;
    interval = isPedalOn ? 500 : 20;
});
