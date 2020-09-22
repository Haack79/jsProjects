const video = document.querySelector('video');
const progressRange = document.querySelector('progress-range');
const progressBar = document.querySelector('progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('volumen-range');
const volumeBar = document.querySelector('volume-bar');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const fullScreenBtn = document.querySelector('.fullscreen');
// Play & Pause ----------------------------------- //
 // first look at docs for it online. methods for vid play
function togglePlay() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}


// Progress Bar ---------------------------------- //



// Volume Controls --------------------------- //



// Change Playback Speed -------------------- //



// Fullscreen ------------------------------- //


// EVENT LISTENERS ----------------------------//
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay); 

