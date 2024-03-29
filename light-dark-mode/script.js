const toggleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.getElementById('nav');
const toggleIcon = document.getElementById('toggle-icon');
const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const image3 = document.getElementById('image3');
const textBox = document.getElementById('text-box');
const DARK_THEME = 'dark';
const LIGHT_THEME = 'light';

// DRY for setting dark and light
function imageMode(color) {
    image1.src = `img/undraw_proud_coder_${color}.svg`;
    image2.src = `img/undraw_feeling_proud_${color}.svg`;
    image3.src = `img/undraw_conceptual_idea_${color}.svg`;
}

// Dark Mode Styles 
// function darkMode() {
//     document.documentElement.setAttribute('data-theme', 'dark')
//     nav.style.backgroundColor = 'rgb(255 255 255 / 50%)';
//     textBox.style.backgroundColor = 'rgb(0 0 0 / 50%)';
//     toggleIcon.children[0].textContent = 'Dark Mode';
//     // toggleIcon.children[1].classList.remove('fa-sun');
//     // toggleIcon.children[1].classList.add('fa-moon');
//     toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon');
//     // image1.src = 'img/undraw_proud_coder_dark.svg';
//     // image2.src = 'img/undraw_feeling_proud_dark.svg';
//     // image3.src = 'img/undraw_conceptual_idea_dark.svg';
//     imageMode('dark'); 
//     localStorage.setItem('theme', 'dark'); 
// }

// // Light Mode Styles 
// function lightMode() {
//     document.documentElement.setAttribute('data-theme', 'light')
//     nav.style.backgroundColor = 'rgb(0 0 0 / 50%)';
//     textBox.style.backgroundColor = 'rgb(255 255 255 / 50%)';
//     toggleIcon.children[0].textContent = 'Light Mode';
//     toggleIcon.children[1].classList.replace('fa-moon', 'fa-sun');
//     imageMode('light'); 
//     localStorage.setItem('theme', 'light');
// } 
// Set function to toglle light and dark modes
function toggleDarkLightMode(isDark) {
    isDark ? document.documentElement.setAttribute('data-theme', DARK_THEME) : document.documentElement.setAttribute('data-theme', LIGHT_THEME)
    nav.style.backgroundColor = isDark ? 'rgb(0 0 0 / 50%)': 'rgb(255 255 255 / 50%)';
    textBox.style.backgroundColor = isDark ? 'rgb(255 255 255 / 50%)' : 'rgb(0 0 0 / 50%)';
    toggleIcon.children[0].textContent = isDark? 'Dark Mode' : 'Light Mode';
    isDark ? toggleIcon.children[1].classList.replace('fa-moon', 'fa-sun') : toggleIcon.children[1].classList.replace('fa-moon', 'fa-sun');
    isDark ? imageMode(DARK_THEME) : imageMode(LIGHT_THEME); 
    isDark ? localStorage.setItem('theme', DARK_THEME) : localStorage.setItem('theme', LIGHT_THEME);
}
// Switch Theme Dynamically
function switchTheme(event) {
    // document.documentElement lets you get the root at highest level of document
    // Ternary operator to switch from dark to light.
    event.target.checked ? toggleDarkLightMode(true): toggleDarkLightMode(false)
}
// Event Listener
toggleSwitch.addEventListener('change', switchTheme);

// Check Local Storage for Theme
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme === DARK_THEME) {
        toggleSwitch.checked = true;
        toggleDarkLightMode(true);
    }
}