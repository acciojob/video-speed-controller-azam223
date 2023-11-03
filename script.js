const inputs = document.querySelectorAll('.controls input');

    function handleUpdate() {
      const suffix = this.dataset.sizing || '';
      document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
    }

    inputs.forEach(input => input.addEventListener('change', handleUpdate));
    inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));
// Get the video element and controls
const video = document.querySelector('.flex');
const progress = document.querySelector('.progress');
const progressFilled = document.querySelector('.progress__filled');
const playButton = document.querySelector('.toggle');
const volumeInput = document.querySelector('[name="volume"]');
const playbackSpeedInput = document.querySelector('[name="playbackRate"]');
const skipButtons = document.querySelectorAll('[data-skip');

// Add event listeners for play/pause button
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

video.addEventListener('click', togglePlay);
playButton.addEventListener('click', togglePlay);

// Update play/pause button text
function updateButton() {
  playButton.textContent = video.paused ? '►' : '❚ ❚';
}

video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

// Update progress bar
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressFilled.style.flexBasis = `${percent}%`;
}

video.addEventListener('timeupdate', handleProgress);

// Scrub the progress bar
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

progress.addEventListener('click', scrub);

let mousedown = false;
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => (mousedown = true));
progress.addEventListener('mouseup', () => (mousedown = false));

// Adjust volume
function handleVolume() {
  video.volume = volumeInput.value;
}

volumeInput.addEventListener('input', handleVolume);

// Adjust playback speed
function handlePlaybackSpeed() {
  video.playbackRate = playbackSpeedInput.value;
}

playbackSpeedInput.addEventListener('input', handlePlaybackSpeed);

// Skip buttons
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

skipButtons.forEach((button) => button.addEventListener('click', skip));
