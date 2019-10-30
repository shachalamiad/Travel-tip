console.log('Main!');

let gLat;
let glng;
import locService from './services/loc.service.js'
import mapService from './services/map.service.js'
import whetherService from './services/weather.service.js'
import geoCode from './services/geo-service.js'



locService.getLocs()
    .then(locs => console.log('locs', locs))



window.onload = () => {

    mapService.initMap()
        .then(() => {
            mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
            onRenderWhether(32.0749831,34.9120554)
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

    mapService.panTo(gLat, glng);

    mapService.addMarker({ lat: gLat, lng: glng });
})


//Go button

document.querySelector('.go-btn').addEventListener('click', (ev) => {
    let lat;
    let lng;
    let elSearchLoc = document.querySelector('.location-input').value;
    let elLocation = document.querySelector('.location-title');



    geoCode.getCoords(elSearchLoc)
        .then(coords => {

            lat = coords.lat;
            lng = coords.lng;
            elLocation.innerText += geoCode.gTitle;


        })
        .then(() => {

            mapService.addMarker({ lat: lat, lng: lng });
            mapService.panTo(lat, lng);
            onRenderWhether(lat,lng);


        })


})



function onRenderWhether(lat,lng) {
    let convert = 271.13;
    let prmWeather = whetherService.getWeather(lat, lng)
    prmWeather.then(res => {
        console.log(res)
        let temperature = (res.main.temp - convert).toFixed(2)
        let wind = res.wind.speed
        console.log(wind)
        console.log(wind)
        document.querySelector('.weather').innerHTML = temperature;
        document.querySelector('.wind').innerHTML = `${wind} m/s`;
    })

}

