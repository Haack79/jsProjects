const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

let countdownTitle = '';
let countdownDate = '';

// Set Date Input Min with Today's Date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

// Take values from form input
function updateCountdown(evt) {
    //console.log(evt); 
    // normally send data to a form but since not sending to data it refreshes page and lose data
    // so use preventDefault - keep from submitting form with network request
    evt.preventDefault();
    countdownTitle = evt.srcElement[0].value;
    countdownDate = evt.srcElement[1].value; 
}
// Event Listeners
countdownForm.addEventListener('submit', updateCountdown);
