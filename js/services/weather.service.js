'use strict'

export default {
    getWeather
}

function getWeather(lat, lng) {
    let convert = 271.13;
    return axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&APPID=e7f9d97121353f154975b4b3af85fc73`)
        .then(res => (+res.data.main.temp - convert))
}
