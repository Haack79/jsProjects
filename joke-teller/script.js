const button = document.createElement('button');
const audioElement = document.getElementById('audio');

// Disable/Enable Button
function toggleButton() {
    button.disabled = !button
}
// Passing Joke to voiceRss api
function tellMe(joke) {
    VoiceRSS.speech({
        key: 'cdf010b882e548b49aa29e1a91621144',
        src: joke,
        hl: 'en-us',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get Jokes from Joke API
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json(); 
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke; 
        }
        // Text-toSpeech
        tellMe(joke);
        // Disable Button
        toggleButton();
    } catch (err) {
        // Catch errors
        console.log('woops in api', err); 
    }
}

// Event Listener 
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton); 