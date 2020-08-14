// by default all js is in the window
// Get Quote from API

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader'); 
'http://proxy.schoolname.edu:2048/'
// const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

function startLoadSpinner() {
    loader.hidden = false;
    quoteContainer.hidden=true; 
}
// Hide loading 
function stopLoadSpinner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true; 
    }
}

async function getQuote() {
    startLoadSpinner(); 
    const proxyUrl = 'http(s)://thingproxy.freeboard.io/fetch/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote?lang=en?format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        if (data.quoteAuthor === '') {
            authorText.textContent.innerText = "UnKnown";
        } else {
            authorText.innerText = data.quoteAuthor;
        }
        // reduce font size for long quotes
        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote'); 
        }
        quoteText.innerText = data.quoteText
        // stop loader and show quote
        stopLoadSpinner(); 
    } catch (err) {
        // If error happens 5x stop running getQuote. 
        // getQuote(); 
        console.log("whoops, no quote", err); 
    }
}
// Tweet quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https:twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}
//Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitter.addEventListener('click', tweetQuote); 
//On Load
getQuote();

// CORS issue 
/*
The issue is that your computer is calling an api and since your computer is foreign to and not the same origin as the api and api is not set up to allow this it creates cors cross origin rs 
way around it is to call a proxy api first 


*/