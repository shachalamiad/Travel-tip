let gCoords = [];


export default {
    getCoords,
  


}


const API_KEY = 'AIzaSyAQfVUk4CHwfLcp1CWGmPN4hNhp4Mo2Xb4'

function getCoords(search) {
 
    let prmAns = axios.get(`https://maps.googleapis.com/maps/api/geocode/json?language=en&address=${search}&key=${API_KEY}`)

    let prm1 = prmAns.then(res => {

        gCoords=res.data.results[0];

    
        return gCoords;
    })
    return prm1;


}

