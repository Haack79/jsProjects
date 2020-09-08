const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span'); 

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let countdownActive; 

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24; 

// Set Date Input Min with Today's Date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

// Populate countdown / complete ui
function updateDOM() {
    countdownActive = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownValue - now;
        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);
        // Hide Input
        inputContainer.hidden = true;
        // If countdown has ended, show complete
        if (distance < 0) {
        countdownEl.hidden = true;
        clearInterval(countdownActive);
        completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
        completeEl.hidden = false;
} else {
    // Else show countdown in progress
    countdownElTitle.textContent = `${countdownTitle}`;
    timeElements[0].textContent = `${days}`;
    timeElements[1].textContent = `${hours}`;
    timeElements[2].textContent = `${minutes}`;
    timeElements[3].textContent = `${seconds}`;
    completeEl.hidden = true; 
    countdownEl.hidden = false; 
}
    }, second);
}
// Take values from form input
function updateCountdown(evt) {
    //console.log(evt); 
    // normally send data to a form but since not sending to data it refreshes page and lose data
    // so use preventDefault - keep from submitting form with network request
    evt.preventDefault();
    countdownTitle = evt.srcElement[0].value;
    countdownDate = evt.srcElement[1].value; 
    // Get number version of current Date,  updateDOM
    countdownValue = new Date(countdownDate).getTime(); 
    updateDOM();
}
// Reset all values
function reset() {
    // Hide countdowns, show input
    countdownEl.hidden = true;
    inputContainer.hidden = true;
    // stop the countdown
    clearInterval(countdownActive);
    // Reset values
    countdownTitle = '';
    countdownDate = '';
}
// Event Listeners
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset); 