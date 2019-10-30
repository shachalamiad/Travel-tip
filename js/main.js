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
          
        })


})

