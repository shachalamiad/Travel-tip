console.log('Main!');

let gLat;
let glng;
let gTitle;
import locService from './services/loc.service.js'
import mapService from './services/map.service.js'
import weatherService from './services/weather.service.js'
import geoCode from './services/geo-service.js'


// locService.getLocs()
//     .then(locs => console.log('locs', locs))

let elLocation = document.querySelector('.location-title');

window.onload = () => {
    let userLat;
    let userLng;
    if (getParamFromUrl() !== null) {
        userLat = getParamFromUrl().lat;
        userLng = getParamFromUrl().lng;

    }
    else {
        userLat = 32.0852999;
        userLng = 34.7817675;
    }

    console.log('userLat', userLat);
    console.log('userLng', userLng);

    mapService.initMap()
        .then(() => {
            mapService.panTo(userLat, userLng);
            mapService.addMarker({ lat: userLat, lng: userLng});
            onRenderWhether(userLat, userLng)
        })

        .catch(console.log('INIT MAP ERROR'));

    locService.getPosition()
        .then(pos => {
            gLat = pos.coords.latitude;
            glng = pos.coords.longitude;

            console.log('User position is:', pos.coords);
        })


        .catch(err => {
            console.log('err!!!', err);
        })

}
//My location button
document.querySelector('.mylocation-btn').addEventListener('click', (ev) => {


    geoCode.getAddress(gLat, glng)
        .then(address => {
            mapService.panTo(gLat, glng);
            mapService.addMarker({ lat: gLat, lng: glng });
            elLocation.innerText = 'Location: ' + address;
        })
})


//Go button

document.querySelector('.go-btn').addEventListener('click', (ev) => {
    let lat;
    let lng;
    let elSearchLoc = document.querySelector('.location-input').value;


    geoCode.getCoords(elSearchLoc)
        .then(coords => {

            lat = coords.geometry.location.lat;
            lng = coords.geometry.location.lng;

            console.log(lat)
            console.log(lng)

            gTitle = 'Location: ' + coords.formatted_address


        })
        .then(() => {

            mapService.addMarker({ lat: lat, lng: lng });
            mapService.panTo(lat, lng);
            elLocation.innerText = gTitle;
            onRenderWhether(lat, lng);

        })

})

//Copy location button
document.querySelector('.copy-location-btn').addEventListener('click', (ev) => {
    copyToClipboard();
    getParamFromUrl();

})

function onRenderWhether(lat, lng) {
    let convert = 271.13;
    let prmWeather = weatherService.getWeather(lat, lng)
    prmWeather.then(res => {
        console.log(res)
        let temperature = (res.main.temp - convert).toFixed(2)
        let wind = res.wind.speed
        let weatherDescription = res.weather[0].description
        console.log(weatherDescription)
        document.querySelector('.temperature').innerHTML = 'Temperature: ' + temperature;
        document.querySelector('.weather-description').innerHTML = 'Weather today: ' + weatherDescription;
        document.querySelector('.wind').innerHTML = 'Wind: ' + `${wind} m/s`;
    })

}

function getParamFromUrl() {
    let currentUrl = window.location.href;
    let url_string = currentUrl;
    let url = new URL(url_string);
    let lat = url.searchParams.get("lat");
    let lng = url.searchParams.get("lng");


    if (lat !== null && lng !== null) {
        return {
            lat,
            lng
        }
    }
    else {
        return null;
    }


}


function copyToClipboard() {

    var copyUrl = `https://shachalamiad.github.io/Travel-tip/index.html?lat=${gLat}&lng=${glng}`;
    var dummy = document.createElement('input'),
        text = copyUrl;
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
}