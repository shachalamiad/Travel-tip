let gCoords = [];
let gAddress;
const API_KEY = 'AIzaSyAQfVUk4CHwfLcp1CWGmPN4hNhp4Mo2Xb4'


export default {
    getCoords,
    getAddress

}



function getCoords(search) {

    let prmAns = axios.get(`https://maps.googleapis.com/maps/api/geocode/json?language=en&address=${search}&key=${API_KEY}`)

    let prm1 = prmAns.then(res => {

        gCoords = res.data.results[0];


        return gCoords;
    })
    return prm1;


}

function getAddress(lat, lng) {
    let prmAns = axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&language=en&&key=${API_KEY}`)
    let prm1 = prmAns.then(res => {

        gAddress = res.data.results[0].formatted_address;


        return gAddress;
    })
    return prm1;

}


