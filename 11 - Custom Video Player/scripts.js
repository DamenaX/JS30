const video = document.querySelector(".viewer");
const progressBar = document.querySelector(".progress");
const progress = document.querySelector(".progress__filled");
const playButton = document.querySelector(".toggle");
const playbackRate = document.querySelector('[name="playbackRate"]');
const volume = document.querySelector('[name="volume"]');
const skipButtons = document.querySelectorAll("[data-skip]");

function togglePlay() {
    if (video.paused) video.play();
    else video.pause();
}

function playButtonToggle() {
    let icon = video.paused ? "►" : "❚ ❚";
    playButton.textContent = icon;
}

function updateProgressBar() {
    let percentage = (video.currentTime / video.duration) * 100;
    progress.style.flexBasis = `${percentage}%`;
}

function adjustPlaybackRate() {
    video.playbackRate = this.value;
}

function adjustVolume() {
    video.volume = this.value;
}

function movePlaybackPosition(e) {
    console.log("ran")
    let width = parseInt(window.getComputedStyle(progressBar).getPropertyValue("width"));
    let position = (e.offsetX / width);
    console.log(position);
    video.currentTime = position * video.duration;
    updateProgressBar();
}

function skip() {
    video.currentTime += parseInt(this.dataset.skip);
}

video.addEventListener("click", togglePlay);
video.addEventListener("play", playButtonToggle);
video.addEventListener("pause", playButtonToggle);
video.addEventListener("timeupdate", updateProgressBar);

playButton.addEventListener("click", togglePlay);
playbackRate.addEventListener("change", adjustPlaybackRate);
volume.addEventListener("change", adjustVolume);

let isMouseHeld = false;
progressBar.addEventListener("click", movePlaybackPosition);
progressBar.addEventListener("mousemove", (e) => isMouseHeld && movePlaybackPosition(e));
progress.addEventListener("mousedown", () => isMouseHeld = true);
progress.addEventListener("mouseup", () => isMouseHeld = false);
progressBar.addEventListener("mouseleave", () => isMouseHeld = false);

skipButtons.forEach((btn) => {
    btn.addEventListener("click", skip);
})