const apikey = 'pk.eyJ1IjoiYmptMzIxIiwiYSI6ImNsM3FodXFqejB0OHgzY3JzMDUyanVpcGUifQ.HpARsm_UCTbOTdmTeyQyfQ';

const mymap = L.map('map').setView([34.056203918518236, -118.25736731890913], 10);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: apikey
}).addTo(mymap);

var SchoolIcon = L.Icon.extend({
    options: {
        iconSize:     [38, 38], // size of the icon
        iconAnchor:   [19, 19], // point of the icon which will correspond to marker's location
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    }
});

var Elementary = new SchoolIcon({iconUrl: 'school.png'}),
    High       = new SchoolIcon({iconUrl: 'university.png'}),
    span       = new SchoolIcon({iconUrl: 'spanschool.png'}),
    Hosting    = new SchoolIcon({iconUrl: 'award.png'}),
    Middle     = new SchoolIcon({iconUrl: 'school2.png'},
                                Elementaryteam = new SchoolIcon({iconUrl: 'schoolblue.png'}),
                                Highteam        = new SchoolIcon({iconUrl: 'universityblue.png'}),
                                spanteam       = new SchoolIcon({iconUrl: 'spanschoolblue.png'}),
                                Middleteam    = new SchoolIcon({iconUrl: 'school2blue.png'}));

function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties && feature.properties.popupContent) {
        layer.bindPopup(feature.properties.School);
    }
}

L.geoJSON(districtborders, {
    style: function (feature) {
        return {color: feature.properties.stroke,

               };
    }
}).addTo(mymap);

L.geoJSON(schools, {
    pointToLayer: function(geoJsonPoint, latlng) {
        // Determine what icon to use for the schools.
        let icon_map = {
            icon: span
        };

        switch(geoJsonPoint.properties.Grade) {
            case "Elementary":
                icon_map.icon = Elementary;
                break;
            case "Middle":
                icon_map.icon = Middle;
                break;
            case "High":
                icon_map.icon = High;
                break;
            case "span": // Fallback for non-primary schools
            default:
                break;
        }

        return L.marker(latlng, icon_map);
    },
    onEachFeature: onEachFeature

}).addTo(mymap);
