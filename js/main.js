console.log('Main!');

let gLat;
let glng;
import locService from './services/loc.service.js'
import mapService from './services/map.service.js'
import whetherService from './services/weather.service.js'

locService.getLocs()
    .then(locs => console.log('locs', locs))

    window.onload = () => {
        onInitWhether();
        mapService.initMap()
            .then(() => {
                mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
            })
            .catch(console.log('INIT MAP ERROR'));
    
    
        locService.getPosition()
            .then(pos => {
                gLat=pos.coords.latitude;
                glng=pos.coords.longitude;
             
                console.log('User position is:', pos.coords);
            })
            .catch(err => {
                console.log('err!!!', err);
            })
    }

document.querySelector('.btn').addEventListener('click', (ev) => {
    
    mapService.panTo(gLat, glng);

    mapService.addMarker({ lat:gLat, lng: glng });
})


function onInitWhether() {
    console.log('hi')
    whetherService.getWeather(32.0749831, 34.9120554)
        .then(res => console.log(res))
}
