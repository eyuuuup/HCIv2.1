/*==============================================
     Init Constants and click/lock variables
================================================*/
let latitude;
let longitude;

localStorage.setItem("chosenZone", "");
var curZone = null;

// constants for Municipal area
const munTLPoint = [-4.451805, -81.300587];
const munBLPoint = [-4.461993, -81.300881];
const munTRPoint = [-4.451258, -81.282917];
const munBRPoint = [-4.461586, -81.282922];
const munLatLngs = [munTLPoint,munTRPoint,munBRPoint,munBLPoint];
const munText = 'mun';
var munClicked = false;

// Constants for Military Area
const milTLPoint = [-4.438315, -81.273956];
const milBLPoint = [-4.451258, -81.282917];
const milTRPoint = [-4.444385, -81.266065];
const milBRPoint = [-4.461586, -81.282922];
const milLatLngs = [milTLPoint,milTRPoint,milBRPoint, milBLPoint];
const milText = 'mil';
var milClicked = false;

// Constants for Neighbourhoods
const neiTLPoint = [-4.451613, -81.272225];
const neiBLPoint = [-4.461586, -81.282922];
const neiTRPoint = [-4.456713, -81.265575];
const neiBRPoint = [-4.465934, -81.276652];
const neiLatLngs = [neiTLPoint,neiTRPoint,neiBRPoint,neiBLPoint];
const neiText = 'nei';
var neiClicked = false;

document.addEventListener("DOMContentLoaded", function(event) { 
    var elements = document.querySelectorAll(".leaflet-control a");
    for (var i = 0; i < elements.length; ++i) {
    elements[i].setAttribute("tabindex", "-1");
    }

    var elements = document.querySelectorAll(".leaflet-container");
    for (var i = 0; i < elements.length; ++i) {
    elements[i].setAttribute("tabindex", "-1");
    }

    var elements = document.querySelectorAll(".leaflet-control-layers-selector");
    for (var i = 0; i < elements.length; ++i) {
    elements[i].setAttribute("tabindex", "-1");
    }
});

/*==============================================
     Init Map and Layers inside map
================================================*/
// Initialize map with corresponding coordinates and size.
const mymap = L.map('issMap').setView(munBRPoint, 13);
const attribution =
'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

// Initialize openstreetmap
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });

var polygonMun = L.polygon(munLatLngs, {color: 'red'}).addTo(mymap);
var polygonMil = L.polygon(milLatLngs, {color: 'blue'}).addTo(mymap);
var polygonNei = L.polygon(neiLatLngs, {color: 'orange'}).addTo(mymap);

const munCenter  = polygonMun.getCenter();
const milCenter  = polygonMil.getCenter();
const neiCenter  = polygonNei.getCenter();

tiles.addTo(mymap);

/*==============================================
     Util functions
================================================*/
function setText(lat, lng) {
    latitude = lat;
    longitude = lng;
}

// continue to report page
var submit_func = function() {
    if (curZone != null) {
        console.log('zone: ' + curZone)
        localStorage.setItem("chosenZone", curZone);
        window.location.href = "index.html"
    } else {
        alert("Choose a zone :(");
        console.log('ok');
    }
//    window.location.href = "../redirect.html";
};

function activateMun() {
    if (!munClicked) {
        curZone = munText;
        munClicked = true;
        neiClicked = false;
        milClicked = false;
        polygonMun.setStyle({fillColor: 'white'});
        polygonNei.setStyle({fillColor: 'Orange'});
        polygonMil.setStyle({fillColor: 'blue'});
        mymap.setView(munCenter, 15);
     }
}

function activateMil() {
    if (!milClicked) {
        curZone = milText;
        munClicked = false;
        neiClicked = false;
        milClicked = true;
        polygonMun.setStyle({fillColor: 'red'});
        polygonNei.setStyle({fillColor: 'Orange'});
        polygonMil.setStyle({fillColor: 'white'});
        mymap.setView(milCenter, 15);
    }
}

function activateNei() {
    if (!neiClicked) {
        curZone = neiText;
        munClicked = false;
        neiClicked = true;
        milClicked = false;
        polygonMun.setStyle({fillColor: 'red'});
        polygonNei.setStyle({fillColor: 'white'});
        polygonMil.setStyle({fillColor: 'blue'});
        mymap.setView(neiCenter, 15);
    }
}

/*==============================================
     Event Handlers
================================================*/
document.getElementById('chooseButton').onclick = submit_func;

document.getElementById("alpha").onclick = function(e) { activateMun(); }

document.getElementById("bravo").onclick = function(e) { activateNei(); }

document.getElementById("charlie").onclick = function(e) { activateMil(); }

polygonMun.on('click', function(e) { activateMun(); });

polygonMil.on('click', function(e) { activateMil(); });

polygonNei.on('click', function(e) { activateNei(); });

polygonMun.on('mouseover', function(e) { polygonMun.setStyle({fillColor: 'white'}); });

polygonMun.on('mouseout', function(e) { if (!munClicked) polygonMun.setStyle({fillColor: 'red'}); });

polygonMil.on('mouseover', function(e) { polygonMil.setStyle({fillColor: 'white'}); });

polygonMil.on('mouseout', function(e) { if (!milClicked) polygonMil.setStyle({fillColor: 'blue'}); });

polygonNei.on('mouseover', function(e) { polygonNei.setStyle({fillColor: 'white'}); });

polygonNei.on('mouseout', function(e) { if (!neiClicked) polygonNei.setStyle({fillColor: 'orange'}); });

  /*==============================================
                TILE LAYER and WMS
    ================================================*/
    //osm layer
    var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    osm.addTo(mymap);
    // map.addLayer(osm)

    // water color
    var watercolor = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        subdomains: 'abcd',
        minZoom: 1,
        maxZoom: 16,
        ext: 'jpg'
    });
    // watercolor.addTo(map)

    // dark map
    var dark = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    });
    // dark.addTo(map)

    // google street
    googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });
    // googleStreets.addTo(map);

    //google satellite
    googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });
    // googleSat.addTo(map)

    var wms = L.tileLayer.wms("http://localhost:8080/geoserver/wms", {
        layers: 'geoapp:admin',
        format: 'image/png',
        transparent: true,
        attribution: "wms test"
    });



    /*==============================================
                        MARKER
    ================================================*/
    var myIcon = L.icon({
        iconUrl: 'img/red_marker.png',
        iconSize: [40, 40],
    });
    var singleMarker = L.marker([28.3949, 84.1240], { icon: myIcon, draggable: true });
    var popup = singleMarker.bindPopup('This is the Nepal. ' + singleMarker.getLatLng()).openPopup()
    popup.addTo(mymap);

    var secondMarker = L.marker([29.3949, 83.1240], { icon: myIcon, draggable: true });

    console.log(singleMarker.toGeoJSON())

    /*==============================================
                GEOJSON
    ================================================*/
    var pointData = L.geoJSON(pointJson).addTo(mymap)
    var lineData = L.geoJSON(lineJson).addTo(mymap)
    var polygonData = L.geoJSON(polygonJson, {
        onEachFeature: function (feature, layer) {
            layer.bindPopup(`<b>Name: </b>` + feature.properties.name)
        },
        style: {
            fillColor: 'red',
            fillOpacity: 1,
            color: '#c0c0c0',
        }
    }).addTo(mymap);



    /*==============================================
                    LAYER CONTROL
    ================================================*/
    var baseMaps = {
        "Basic": osm,
        'Google Street': googleStreets,
        "Google Satellite": googleSat,
    };
    var overlayMaps = {
    };
    // map.removeLayer(singleMarker)

    L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(mymap);


    /*==============================================
                    DEBUG
    ================================================*/
//    mymap.on('mouseover', function () {
//        console.log('your mouse is over the map')
//    })
//
//    mymap.on('mousemove', function (e) {
//        document.getElementsByClassName('coordinate')[0].innerHTML = 'lat: ' + e.latlng.lat + 'lng: ' + e.latlng.lng;
//        console.log('lat: ' + e.latlng.lat, 'lng: ' + e.latlng.lng)
//    })

// event handler to update marker on map. Just for testing
//mymap.on('click', function(e){
//    if (!isInBoundaries(e, polygonMun) &&
//        !isInBoundaries(e, polygonMil) &&
//        !isInBoundaries(e, polygonNei) &&
//        (munClicked || milClicked || neiClicked)) {
//        restoreConstants();
//
//        console.log("test");
//    }
////    marker.setLatLng(e.latlng);
//});
