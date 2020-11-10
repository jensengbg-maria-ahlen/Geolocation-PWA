if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
    .then(reg => {
        console.log('Registration succeeded. Scope is ' + reg.scope);
    });
}

const locationButton = document.getElementById('locationButton')
const position = document.querySelector('#position');


function success(pos) {
    const latitude  = pos.coords.latitude;
    const longitude = pos.coords.longitude;
    position.textContent = '';
    position.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
}


locationButton.addEventListener('click', () => {
    if( 'geolocation' in navigator ) {
        let geo = navigator.geolocation;

        geo.getCurrentPosition(pos => {
            success(pos);
        })
        geo.watchPosition (pos => {
            success(pos);
        })
    } else {
        status.textContent = 'Unable to retrieve your location';
    }
});
