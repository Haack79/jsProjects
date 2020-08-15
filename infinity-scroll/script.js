const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0; 
let photosArray = []; 
// let initialLoad = true; 

// Unsplash API 
//https://api.unsplash.com/photos/?client_id=liCuicj8pL2vNqsquho1YZzrDPGCQhXKa09ViDLdfBc
let numOfImagesToLoad = 5; 
// "OAuth error: The access token is invalid
const apiKey = 'liCuicj8pL2vNqsquho1YZzrDPGCQhXKa09ViDLdfBc'; 
const secretKey = 'iLHwJhVRGJaLamRiKHisRrhTVVjNhpRn9nOEoT6HHM4';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}`
// check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;   
        // initialLoad = false; 
        numOfImagesToLoad = 30; 
        console.log(ready, 'ready')
    }
}
// Helper func to set attributes on dom elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}
// Create elements for links and photos, add to dom
function displayPhotos() {
    imagesLoaded = 0; 
    totalImages = photosArray.length;

    photosArray.forEach((photo) => {
        // Creat <a> to link to unsplash
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html); 
        // item.setAttribute('target', '_blank'); 
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        }); 
        // Craete <img> for photo
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description); 
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // Event Listener, check when each is  finished loading
        img.addEventListener('load', imageLoaded)
        // Put <img> inside <a> then put both in the container element
        item.appendChild(img);
        imageContainer.appendChild(item); 
    })
}
// GET PHOTOS FROM UNSPLASH API
async function getPhotos() {
    try {
        const response = await fetch('https://api.unsplash.com/photos/?client_id=liCuicj8pL2vNqsquho1YZzrDPGCQhXKa09ViDLdfBc');
        photosArray = await response.json(); 
        displayPhotos(); 
    } catch (err) {
        console.log(err); 
    }
}
// check to see if scrolling near bottom  of page, load more pics
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        getPhotos();
        ready = false; 
    }
})

//On Load
getPhotos(); 