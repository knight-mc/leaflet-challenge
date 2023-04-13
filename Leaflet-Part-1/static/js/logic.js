 //create map object
 let myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5,   
});

//create title layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

//setup link to get data
let eqURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

//function to set color
function choosecolor(depth) {
    let color;
    if (depth < 10){
        color = "rgb(252, 250, 107)";
    }
    else if (depth < 30){
        color = "rgb(255, 220, 88)";
    }
    else if (depth < 50){
        color = "rgb(255, 190, 80)";
    }
    else if (depth < 70){
        color = "rgb(255, 160, 81)";
    }
    else if (depth < 90){
        color = "rgb(255, 130, 88)";
    }
    else {
        color = "rgb(248, 102, 98)";
    }
    return color;
}
//function to set size
function getSize(magnitude) {
    //base radius size + expansion value(value * magnitude)
    let size = (10000 + (10000*magnitude));
    return size;
}
//get data
d3.json(eqURL).then(function(data) {
    let eqData = data.features;
    //console.log(eqData);
    createFeatures(eqData);
});

function createFeatures(eqData) {
    for (let i=0; i < eqData.length; i++){
        let epicenter = eqData[i];
        let coords = epicenter.geometry.coordinates;
        let coordinates = [coords[1],coords[0]];
        let depth = coords[2];
        let magnitude = epicenter.properties.mag;
        let eqCirc = L.circle(coordinates, {
            color: "white",
            fillColor: choosecolor(depth),
            fillOpacity: 0.75,
            radius: getSize(magnitude)
        }).bindPopup().addTo(myMap);
    }
}