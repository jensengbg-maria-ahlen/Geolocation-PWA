if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
    .then(reg => {
        console.log('Registration succeeded. Scope is ' + reg.scope);
    });
}

const locationButton = document.getElementById('locationButton')
const position = document.querySelector('.position');


function success(pos) {
    const latitude  = pos.coords.latitude;
    const longitude = pos.coords.longitude;
    position.innerText = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
}

function notAble() {
    position.innerHTML = 'Unable to retrieve your location, please allow the browser to see your position';
}


locationButton.addEventListener('click', () => {
    if( 'geolocation' in navigator ) {
        let geo = navigator.geolocation;

        geo.getCurrentPosition(
            pos => {
                success(pos);
            }, error => {
                notAble()
            })
        geo.watchPosition (
            pos => {
                success(pos);
            }, error => {
                notAble()
            })
    } else {
        console.log('Unable to retrieve the location')
    }
});
