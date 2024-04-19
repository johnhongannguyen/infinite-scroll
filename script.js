const imageContainer = document.getElementById('image-container');


// Unsplash API
const count = 10;
const apiKey = 'NfemxOdrbcT_XlaAH6Z6iIdYLLZJGTyDkVdSYitZp-4';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// get photos

async function getPhotos() {
    try{
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);

    }catch(error){
        console.log(error);
    }
}

getPhotos();