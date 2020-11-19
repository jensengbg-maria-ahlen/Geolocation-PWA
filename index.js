if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
    .then(reg => {
        console.log('Registration succeeded. Scope is ' + reg.scope);
    });
}

const locationButton = document.getElementById('locationButton')

locationButton.addEventListener('click', () => {
    const message = document.querySelector('.position');

    if('geolocation' in navigator) {
        const geo = navigator.geolocation;

        geo.getCurrentPosition(
            pos => {
                let lat = pos.coords.latitude;
                let lng = pos.coords.longitude;
                message.innerHTML = `You are at Latitude: ${lat}°, Longitude: ${lng}°.`;
                getAdressFromPosition(lat, lng, message);
                initMap(lat, lng);
            },
            error => {
                message.innerHTML = 'Please <em>allow</em> position and I will tell you where you are.'
            }
        )
    } else {
        message.innerHTML = 'This device does not have access to the Geolocation API.'
    }
});

async function getAdressFromPosition(lat, lng, message) {
    try {
        const response = await fetch(`https://geocode.xyz/${lat},${lng}?json=1`);
        const data = await response.json();

        if(data.error) {
            message.innerHTML += `<br> Could not get location information at this time. Try again later!`;
        } else {
            const city = data.city;
            const country = data.country;
            message.innerHTML += `<br> It's in ${city}, ${country}.`;
        }
    } catch (error) {
        message.innerHTML += `<br> Could not find your city. Errormessage ${error}`
    }
}

function initMap(lat, lng) {
    let position = {lat: lat, lng: lng};
    let mapOptions = {
        center: position,
        zoom: 15
    }
    let googleMap = new google.maps.Map(document.getElementById('map'), mapOptions);
    let marker = new google.maps.Marker({
        position: position,
        map: googleMap
    });
}
