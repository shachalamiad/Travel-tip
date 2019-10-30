let gCoords = [];
 let gTitle = '';
// let gSearch = 'Tel Aviv';

export default {
    getCoords,
    gTitle


}



const API_KEY = 'AIzaSyAQfVUk4CHwfLcp1CWGmPN4hNhp4Mo2Xb4'


function getCoords(search) {
 
    let prmAns = axios.get(`https://maps.googleapis.com/maps/api/geocode/json?language=en&address=${search}&key=${API_KEY}`)

    let prm1 = prmAns.then(res => {

        gCoords = res.data.results[0].geometry.location;
        gTitle = res.data.results[0].formatted_address;
    
        return gCoords;
    })

    return prm1;


}

