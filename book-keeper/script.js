const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url'); 
const bookmarksContainer = document.getElementById('bookmarks-container');

// Show Modal, focus on Input 
function showModal() {
    modal.classList.add('show-modal');
    websiteNameEl.focus();
}
// Modal event listeners
modalShow.addEventListener('click', showModal); 
modalClose.addEventListener('click', () => {
    modal.classList.remove('show-modal')
})
window.addEventListener('click', (evt) => (evt.target === modal ? modal.classList.remove('show-modal') : false))

// validate form
function validate(nameValue, urlValue) {
    const expression = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
    const regex = new RegExp(expression);
    if (!nameValue || !urlValue) {
        console.log('please put in values for name and url');
        return false; 
    }
    if (!urlValue.match(regex)) {
        console.log('please provide a valid url');
        return false; 
    }
    // Validate
    console.log(urlValue); 
    return true; 
}
// Handle data from form
function storeBookmark(evt) {
    evt.preventDefault();
    const nameValue = websiteNameEl.value;
    let urlValue = websiteUrlEl.value;
    console.log(nameValue, urlValue); 
    if (!urlValue.includes('http://', 'https://')) {
        urlValue = `https://${urlValue}`;
    }
    if (!validate(nameValue, urlValue)) {
        return false; 
    }
}

// Event Listener 
bookmarkForm.addEventListener('submit', storeBookmark); 
