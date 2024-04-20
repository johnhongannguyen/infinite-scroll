const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];
let ready = false;
let totalImages = 0;
let imagesLoaded = 0;
let isInitialLoad = true;



// Unsplash API
let initialCount = 5;
const apiKey = `NfemxOdrbcT_XlaAH6Z6iIdYLLZJGTyDkVdSYitZp-4`;
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function updateAPIURLWithNewCount(picCount){
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${picCountount}`;
}
// check if all images were loaded
function imageLoaded(){
    imagesLoaded ++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
       
    }
}

// helper func to set attr on DOM elements
function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key])
    }
}

function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images', totalImages);
    photosArray.forEach((photo) => {
        // create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item,{
            href: photo.links.html,
            target: '_blank'

        })
        //create <img> for photo
        const img = document.createElement('img');
        setAttributes(img,{
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        })

        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        // put <img> inside <a>
        item.appendChild(img);
        imageContainer.appendChild(item);

    })
}


// get photos

async function getPhotos() {
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        if(isInitialLoad){
            updateAPIURLWithNewCount(30);
            isInitialLoad = false;
        }

    }catch(error){
        console.log('cannot get any photos',error);
    }
}

// check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll',()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos()
    }
})



getPhotos();
