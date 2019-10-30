'use strict'

export default {
    getWeather
}

function getWeather(lat, lng) {
    console.log('hi')
    let convert = 271.13;
    return axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=32.0749831&lon=34.9120554&APPID=e7f9d97121353f154975b4b3af85fc73`)
        .then(res => (+res.data.main.temp - convert))
}
