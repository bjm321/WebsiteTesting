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

var Elementary     = new SchoolIcon({iconUrl: 'school.png'}),
    High           = new SchoolIcon({iconUrl: 'university.png'}),
    span           = new SchoolIcon({iconUrl: 'spanschool.png'}),
    Hosting        = new SchoolIcon({iconUrl: 'award.png'}),
    Middle         = new SchoolIcon({iconUrl: 'school2.png'}),
    Elementaryteam = new SchoolIcon({iconUrl: 'schoolblue.png'}),
    Highteam       = new SchoolIcon({iconUrl: 'universityblue.png'}),
    spanteam       = new SchoolIcon({iconUrl: 'spanschoolblue.png'}),
    Middleteam     = new SchoolIcon({iconUrl: 'school2blue.png'});

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
                icon_map.icon = (geoJsonPoint.properties.Teams != "" ? Elementaryteam : Elementary);
                break;
            case "Middle":
                icon_map.icon = (geoJsonPoint.properties.Teams != "" ? Middleteam : Middle);
                break;
            case "High":
                icon_map.icon = (geoJsonPoint.properties.Teams != "" ? Highteam : High);
                break;
            case "span": // Fallback for non-primary schools
            default:
                icon_map.icon = (geoJsonPoint.properties.Teams != "" ? spanteam : span);
                break;
        }

        // When a school hosts, its icon is different.
        if (geoJsonPoint.properties.Hosting != null && geoJsonPoint.properties.Hosting != "") {
            icon_map.icon = Hosting;
        }

        let marker = L.marker(latlng, icon_map);

        // If there are teams, list them.
        let teamInnerHTML = "";
        if (geoJsonPoint.properties.Teams) {
            teamInnerHTML = `<dt>Team numbers</dt><dd>${geoJsonPoint.properties.Teams}</dd>`;
        }

        // If there are events (in a <ul>...</ul>), list them.
        let eventInnerHTML = "";
        if (geoJsonPoint.properties.Events != null && geoJsonPoint.properties.Events != "") {
            eventInnerHTML = `<dt>Events</dt><dd>${geoJsonPoint.properties.Events}</dd>`;
        }

        // Make sure each school has its own unique popup.
        marker.bindPopup(`
<p>
  <h2>${geoJsonPoint.properties.School}</h2>
  <dl>
    ${teamInnerHTML}
    ${eventInnerHTML}
  </dl>
  <span style="color: navy">Navy text!</span>
</p>`);

        return marker;
    },
    onEachFeature: onEachFeature

}).addTo(mymap);
