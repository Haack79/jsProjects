// Pages
const gamePage = document.getElementById('game-page');
const scorePage = document.getElementById('score-page');
const splashPage = document.getElementById('splash-page');
const countdownPage = document.getElementById('countdown-page');
// Splash Page
const startForm = document.getElementById('start-form');
const radioContainers = document.querySelectorAll('.radio-container');
const radioInputs = document.querySelectorAll('input');
const bestScores = document.querySelectorAll('.best-score-value');
// Countdown Page
const countdown = document.querySelector('.countdown');
// Game Page
const itemContainer = document.querySelector('.item-container');
// Score Page
const finalTimeEl = document.querySelector('.final-time');
const baseTimeEl = document.querySelector('.base-time');
const penaltyTimeEl = document.querySelector('.penalty-time');
const playAgainBtn = document.querySelector('.play-again');

// Equations
let questionAmount = 0;
let equationsArray = [];
let playerGuessArray = [];
let bestScoreArray = [];
// Game Page
let firstNumber = 0;
let secondNumber = 0;
let equationObject = {};
const wrongFormat = [];

// Time
let timer;
let timePlayed = 0;
let baseTime = 0;
let penaltyTime = 0;
let finalTime = 0;
let finalTimeDisplay = '0.0';

// Scroll
let valueY = 0;

// refresh splash page best scores
function bestScoresToDOM() {
  bestScores.forEach((bestScore, index) => {
    const bestScoreEl = bestScore;
    bestScoreEl.textContent = `${bestScoreArray[index].bestScore}s`
  })
}

// UPdate bestscore array
function updateBestScore() {
  bestScoreArray.forEach((score, index) => {
    // Select correct Best score to update
    if (questionAmount == score.questions) {
      // return best score asnumber w/ 1 decimal
      const savedBestScore = Number(bestScoreArray[index].bestScore); 
      //update if new final score is less or replacing zero
      if (savedBestScore === 0 || savedBestScore < finalTime) {
        bestScoreArray[index].bestScore = finalTimeDisplay;
      }
    }
  });
  // update splash page
  bestScoresToDOM();
  // save to local storage
  localStorage.setItem('bestScores', JSON.stringify(bestScoreArray));
}

// check local storage for best scores,  set bestscore array
function getSavedBestScores() {
  if (localStorage.getItem('bestScores')) {
    bestScoreArray = JSON.parse(localStorage.bestScores)
  } else {
    bestScoreArray = [
      {questions: 10, bestScore: finalTimeDisplay},
      {questions: 25, bestScore: finalTimeDisplay},
      {questions: 50, bestScore: finalTimeDisplay},
      {questions: 99, bestScore: finalTimeDisplay}
    ];
    localStorage.setItem('bestScores', JSON.stringify(bestScoreArray));
  }
  bestScoresToDOM();
}

// Reset Game
function playAgain() {
  gamePage.addEventListener('click', startTimer);
  scorePage.hidden = true;
  splashPage.hidden = false;
  equationsArray = [];
  playerGuessArray = [];
  valueY = 0; 
  playAgainBtn.hidden = true;
}
//Show Score Page
function showScorePage() {
  // Show play again button after 1 second
  setTimeout(() => {
    playAgainBtn.hidden = false;
  }, 1000);
  scorePage.hidden = false;
  gamePage.hidden = true; 
}
// Format & Display Time in DOM 
function scoresToDom() {
  finalTimeDisplay = finalTime.toFixed(1);
  baseTime = timePlayed.toFixed(1);
  penaltyTime = penaltyTime.tofixed(1);
  baseTimeEl.textContent = `Base Time: ${baseTime}`;
  penaltyTimeEl.textContent = `Penalty: + ${penaltyTime}s`;
  finalTimeEl.textContent = `${finalTimeDisplay}s`;
  updateBestScore();
  // Scroll to Top, go to score page
  itemContainer.scrollTo({top: 0, behavior: 'instant'})
  showScorePage(); 
}
// Stop Timer, process results, go to score page
function checkTime() {
  if (playerGuessArray.length == questionAmount) {
    clearInterval(timer);
    // Check for wrong guesses and add penalty time
    equationsArray.forEach((equation, index) => {
      if (equation.evaluated === playerGuessArray[index]) {
        // Correct guess, no penalty
      } else {
        // incorrect guess, add penalty 
        penaltyTime += 0.5;
      }
    });
    finalTime = timePlayed + penaltyTime;
    scoresToDom();
  }
}
// Add a tenth of a second to timeplayed
function addTime() {
  timePlayed += 0.1;
  checkTime(); 
}
// Start timer when game page is clicked
function startTimer() {
  // Reset times 
  timePlayed = 0;
  penaltyTime = 0;
  finalTime = 0;
  timer = setInterval(addTime, 100);
  gamePage.removeEventListener('click', startTimer); 
}

// Scroll , Store user selection in playerGuessarray
function select(guessedTrue) {
  // scroll 80 pixels
  valueY += 80;
  itemContainer.scroll(0, valueY);
  // Add player guess to Array 
  return guessedTrue ? playerGuessArray.push('true') : playerGuessArray.push('false');
}
// Displays game page
function showGamePage() {
  gamePage.hidden = false;
  countdownPage.hidden = true;
}
// Get random number up to a max number
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// Create Correct/Incorrect Random Equations
function createEquations() {
  // Randomly choose how many correct equations there should be
  const correctEquations = getRandomInt(questionAmount);
  // Set amount of wrong equations
  const wrongEquations = questionAmount - correctEquations;
  // Loop through, multiply random numbers up to 9, push to array
  for (let i = 0; i < correctEquations; i++) {
    firstNumber = getRandomInt(9);
    secondNumber = getRandomInt(9);
    const equationValue = firstNumber * secondNumber;
    const equation = `${firstNumber} x ${secondNumber} = ${equationValue}`;
    equationObject = { value: equation, evaluated: 'true' };
    equationsArray.push(equationObject);
  }
  // Loop through, mess with the equation results, push to array
  for (let i = 0; i < wrongEquations; i++) {
    firstNumber = getRandomInt(9);
    secondNumber = getRandomInt(9);
    const equationValue = firstNumber * secondNumber;
    wrongFormat[0] = `${firstNumber} x ${secondNumber + 1} = ${equationValue}`;
    wrongFormat[1] = `${firstNumber} x ${secondNumber} = ${equationValue - 1}`;
    wrongFormat[2] = `${firstNumber + 1} x ${secondNumber} = ${equationValue}`;
    const formatChoice = getRandomInt(3);
    const equation = wrongFormat[formatChoice];
    equationObject = { value: equation, evaluated: 'false' };
    equationsArray.push(equationObject);
  }
  shuffle(equationsArray);
  equationsToDOM();
}
// Add Equations to DOM
function equationsToDOM() {
  equationsArray.forEach((equation) => {
    // Item
    const item = document.createElement('div');
    item.classList.add('item');
    // Equation Text
    const equationText = document.createElement('h1');
    equationText.textContent = equation.value;
    // Append
    item.appendChild(equationText);
    itemContainer.appendChild(item);
  
  });
}
// Dynamically adding correct/incorrect equations
function populateGamePage() {
  // Reset DOM, Set Blank Space Above
  itemContainer.textContent = '';
  // Spacer
  const topSpacer = document.createElement('div');
  topSpacer.classList.add('height-240');
  // Selected Item
  const selectedItem = document.createElement('div');
  selectedItem.classList.add('selected-item');
  // Append
  itemContainer.append(topSpacer, selectedItem);

  // Create Equations, Build Elements in DOM
  createEquations();
  equationsToDOM();
  // Set Blank Space Below
  const bottomSpacer = document.createElement('div');
  bottomSpacer.classList.add('height-500');
  itemContainer.appendChild(bottomSpacer);
}

//  Displays countdown 3..2..1
function countdownStart(start) {
  let count = 3;
  countdown.textContent = '3';
  const timeCountDown = setInterval(() => {
    count--;
    if (count === 0) {
      countdown.textContent = 'Go!';
    } else if (count === -1) {
      showGamePage();
      clearInterval(timeCountDown)
    } else {
      countdown.textContent = count;
    }
    countdown.textContent = count
  }, 1000)
  // setTimeout(() => {
  //   countdown.textContent = '2'; 
  // }, 1000);
  // setTimeout(() => {
  //   countdown.textContent = '1'; 
  // }, 2000);
  // setTimeout(() => {
  //   countdown.textContent = 'Go!';
  // }, 3000);
}
// Navigate from splash page to countdown page
function showCountdown(numCount) {
    countdownPage.hidden = true;
    splashPage.hidden = false;
    populateGamePage();
    countdownStart();
    // setTimeout(showGamePage, 4000);
}
// Get the value from selected radio button
function getRadioValue() {
  let radioValue;
  radioInputs.forEach((radioInput) => {
    if (radioInput.checked) {
      radioValue = radioInput.value;
    }
  });
  return radioValue;
}
// Form that decides amount of questions 
function selectQuestionAmount(evt) {
  evt.preventDefault();
  questionAmount = getRadioValue();
  if (questionAmount) {
    showCountdown();
  }
}
startForm.addEventListener('click', () => {
  radioContainers.forEach((radioEl) => {
    // Remove selected label styling
    radioEl.classList.remove('selected-label');
    // Add it back if radio input is checked 
    if (radioEl.children[1].checked) {
      radioEl.classList.add('selected-label');
    }
  });
});

// Event Listeners
startForm.addEventListener('submit', selectQuestionAmount);
gamePage.addEventListener('click', startTimer); 

// On Load
getSavedBestScores();