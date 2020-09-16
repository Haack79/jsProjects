const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url'); 
const bookmarksContainer = document.getElementById('bookmarks-container');

let bookmarks = [];

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
// Build bookmarks
function buildBookmarks() {
    // build items
    bookmarks.forEach((bookmark) => {
        const {name, url } = bookmark;
        // Item
        const item = document.createElement('div');
        item.classList.add('item');
        // close icon
        const closeIcon = document.createElement('i');
        closeIcon.classList.add('fas', 'fa-times');
        closeIcon.setAttribute('title', 'Delete Bookmark');
        closeIcon.setAttribute('onclick', `deleteBookmark(${url}')`);
        // favicon / link container 
        const linkInfo = document.createElement('div');
        linkInfo.classList.add('name');
        // Favicon
        const favicon = document.createElement('img');
        favicon.setAttribute('src', `https://s2.googleusercontent.com/s2/favicons?domain=${url}`);
        favicon.setAttribute('alt', 'Favicon');
        // Link
        const link = document.createElement('a');
        link.setAttribute('href', `${url}`);
        link.setAttribute('target', '_blank');
        link.textContent = name;
        // append to bookmark container
        linkInfo.append(favicon, link);
        item.append(closeIcon, linkInfo);
        bookmarksContainer.appendChild(item); 
    })
}
// Fetch Bookmarks
function fetchBookmarks() {
    // Get Bookmarks from localstorage if available
    if (localStorage.getItem('bookmarks')) {
        bookmarks = JSON.parse(localStorage('bookmarks'));
    } else {
        // Create bookmarks
        bookmarks = [
            {
                name: 'jacinto design',
                url: 'http://somewebsite'
            },
        ];
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    }
    buildBookmarks();
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
    const bookmark = {
        name: nameValue,
        url: urlValue
    };
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
    bookmarkForm.reset();
    websiteNameEl.focus();
}

// Event Listener 
bookmarkForm.addEventListener('submit', storeBookmark); 
// on load, fetch bookmarks
fetchBookmarks();
