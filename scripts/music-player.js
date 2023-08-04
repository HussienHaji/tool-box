const previousBtn = document.getElementById("previousBtn");
const playPauseBtn = document.getElementById("playPauseBtn");
const nextBtn = document.getElementById("nextBtn");
const audioPlayer = document.getElementById("audioPlayer");
const trackBar = document.getElementById("trackBar");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const songName = document.getElementById("songName");
const artistName = document.getElementById("artistName");
const musicCover = document.querySelector(".cover img")

let currentTrackIndex = 0;
const tracks = [
  {
    name: "for future bass",
    artist: "The_Mountain",
    file: "../assets/audio/for-future-bass-159125.mp3",
    cover: "../assets/images/For Future Bass.png",
  },
  {
    name: "Good Night",
    artist: "FASSounds",
    file: "../assets/audio/good-night-160166.mp3",
    cover: "../assets/images/Good Night.png",
  },
  {
    name: "LoFi Chill (Medium Version)",
    artist: "BoDleasons",
    file: "../assets/audio/lofi-chill-medium-version-159456.mp3",
    cover: "../assets/images/LoFi Chill (Medium Version).png",
  },
];

// Update music details
function updateMusicDetails() {
  const currentTrack = tracks[currentTrackIndex];
  songName.textContent = currentTrack.name;
  artistName.textContent = currentTrack.artist;
  document.querySelector(".cover img").src = currentTrack.cover;
}

// Play/Pause functionality
function playPause() {
  musicCover.style.animationPlayState = "running"

  if (audioPlayer.paused) {
    audioPlayer.play();
    playPauseBtn.classList.add("playing");
    playPauseBtn.innerHTML = `<i class="fas fa-play">`;
    musicCover.style.animationPlayState = "running"

  } else {
    audioPlayer.pause();
    playPauseBtn.classList.remove("playing");
    playPauseBtn.innerHTML = `<i class="fas   fa-pause">`;
    musicCover.style.animationPlayState = "paused"

  }
}

// Previous button functionality
function previous() {
  musicCover.style.animationPlayState = "running"

  currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
  loadTrack();
}

// Next button functionality
function next() {
  musicCover.style.animationPlayState = "running"

  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  loadTrack();
}

// Load current track
function loadTrack() {
  const currentTrack = tracks[currentTrackIndex];
  audioPlayer.src = currentTrack.file;
  audioPlayer.load();
  audioPlayer.play();
  playPauseBtn.classList.add("playing");
  updateMusicDetails();
}

// Track bar functionality
function updateTrackBar() {
  const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  trackBar.querySelector(".progress").style.width = progress + "%";
  currentTime.textContent = formatTime(audioPlayer.currentTime);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

// Seek functionality
function seekTrack(event) {
  const seekPosition =
    (event.offsetX / trackBar.offsetWidth) * audioPlayer.duration;
  audioPlayer.currentTime = seekPosition;
  updateTrackBar();
}

// Event listeners
playPauseBtn.addEventListener("click", playPause);
previousBtn.addEventListener("click", previous);
nextBtn.addEventListener("click", next);
audioPlayer.addEventListener("timeupdate", updateTrackBar);
audioPlayer.addEventListener("loadedmetadata", () => {
  totalTime.textContent = formatTime(audioPlayer.duration);
});
audioPlayer.addEventListener("ended", next);
trackBar.addEventListener("click", seekTrack);

// Initialize music details and load first track
updateMusicDetails();
loadTrack();
