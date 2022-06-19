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

var elementary     = new SchoolIcon({iconUrl: 'script/maptesting/Elementary.svg'}),
    high           = new SchoolIcon({iconUrl: 'script/maptesting/high.svg'}),
    span           = new SchoolIcon({iconUrl: 'script/maptesting/span.svg'}),
    hosting        = new SchoolIcon({iconUrl: 'script/maptesting/hosting.svg'}),
    hostingred     = new SchoolIcon({iconUrl: 'script/maptesting/hostingred.svg'}),
    hostingblue    = new SchoolIcon({iconUrl: 'script/maptesting/hostingblue.svg'}),
    hostingpurple  = new SchoolIcon({iconUrl: 'script/maptesting/hostingpurple.svg'}),
    hostinggreen   = new SchoolIcon({iconUrl: 'script/maptesting/hostinggreen.svg'}),
    hostingyellow  = new SchoolIcon({iconUrl: 'script/maptesting/hostingyellow.svg'}),
    middle         = new SchoolIcon({iconUrl: 'script/maptesting/middle.svg'}),
    elementaryblue = new SchoolIcon({iconUrl: 'script/maptesting/Elementaryblue.svg'}),
    highred        = new SchoolIcon({iconUrl: 'script/maptesting/highred.svg'}),
    spanblue       = new SchoolIcon({iconUrl: 'script/maptesting/spanblue.svg'}),
    spanred        = new SchoolIcon({iconUrl: 'script/maptesting/spanred.svg'}),
    spanpurple     = new SchoolIcon({iconUrl: 'script/maptesting/spanpurple.svg'}),
    middleblue     = new SchoolIcon({iconUrl: 'script/maptesting/middleblue.svg'}),
    middlered      = new SchoolIcon({iconUrl: 'script/maptesting/middlered.svg'}),
    middlepurple   = new SchoolIcon({iconUrl: 'script/maptesting/middlepurple.svg'}),
    grantsgreen    = new SchoolIcon({iconUrl: 'script/maptesting/grantsgreen.svg'}),
    grantsyellow   = new SchoolIcon({iconUrl: 'script/maptesting/grantsyellow.svg'}),
    error          = new SchoolIcon({iconUrl: 'script/maptesting/error.svg'});

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

       /*  switch(geoJsonPoint.properties.Grade) {
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
        } */

        Boolean (NTG),
	    Boolean (VIQC),
        Boolean (VRC);
	
if (geoJsonPoint.properties.NTG = "yes" || geoJsonPoint.properties.NTG = "Yes"){
	NTG = true;
	 
}
else {
	NTG = false;
}

if (geoJsonPoint.properties.VIQC = "yes" || geoJsonPoint.properties.VIQC = "Yes"){
	VIQC = true;
	 
}
else {
	VIQC = false;
}

if (geoJsonPoint.properties.VRC = "yes" || geoJsonPoint.properties.VRC = "Yes"){
	VRC = true;
	 
} else {
	VRC = false;
}

let code = (NTG << 2) | (VIQC << 1) | VRC;
let data = [];
let result = "";

if (geoJsonPoint.properties.Hosting != null && geoJsonPoint.properties.Hosting != "") {
    data = ["hosting",                     // (NTG, VIQC, VRC) = 000
            "hostingred",                  // (NTG, VIQC, VRC) = 001
            "hostingblue",                 // (NTG, VIQC, VRC) = 010
            "hostingpurple",               // (NTG, VIQC, VRC) = 011
            "error",                       // (NTG, VIQC, VRC) = 100 Error
            "error",                       // (NTG, VIQC, VRC) = 101 Error
            "hostinggreen",                // (NTG, VIQC, VRC) = 110
            "hostingyellow"];              // (NTG, VIQC, VRC) = 111
} else {
        switch (geoJsonPoint.properties.Grade) {
            case Elementary:
                data = ["elementary",      // (NTG, VIQC, VRC) = 000
                        "error",           // (NTG, VIQC, VRC) = 001 Error
                        "elementaryblue",  // (NTG, VIQC, VRC) = 010
                        "error",           // (NTG, VIQC, VRC) = 011
                        "error",           // (NTG, VIQC, VRC) = 100 Error
                        "error",           // (NTG, VIQC, VRC) = 101 Error
                        "grantsgreen",     // (NTG, VIQC, VRC) = 110 
                        "error"];          // (NTG, VIQC, VRC) = 111 Error
                break;
            case Middle:
                data = ["middle",          // (NTG, VIQC, VRC) = 000
                        "middlered",       // (NTG, VIQC, VRC) = 001
                        "middleblue",      // (NTG, VIQC, VRC) = 010
                        "middlmpurple",    // (NTG, VIQC, VRC) = 011
                        "error",           // (NTG, VIQC, VRC) = 100 Error
                        "error",           // (NTG, VIQC, VRC) = 101 Error
                        "grantsgreen",     // (NTG, VIQC, VRC) = 110 
                        "grantsyellow"];   // (NTG, VIQC, VRC) = 111 
                break;
            case High:
                data = ["high",            // (NTG, VIQC, VRC) = 000
                        "highred",         // (NTG, VIQC, VRC) = 001
                        "error",           // (NTG, VIQC, VRC) = 010 Error
                        "error",           // (NTG, VIQC, VRC) = 011 Error
                        "error",           // (NTG, VIQC, VRC) = 100 Error
                        "error",           // (NTG, VIQC, VRC) = 101 Error
                        "error",           // (NTG, VIQC, VRC) = 110 Error
                        "error"];          // (NTG, VIQC, VRC) = 111 Error
                break;
            default:
                data = ["span",            // (NTG, VIQC, VRC) = 000
                        "spanred",         // (NTG, VIQC, VRC) = 001
                        "spanblue",        // (NTG, VIQC, VRC) = 010
                        "spanpurple",      // (NTG, VIQC, VRC) = 011
                        "error",           // (NTG, VIQC, VRC) = 100 Error
                        "error",           // (NTG, VIQC, VRC) = 101 Error
                        "grantsgreen",     // (NTG, VIQC, VRC) = 110 
                        "grantsyellow"];   // (NTG, VIQC, VRC) = 111 
                break;
        }
    }
}

result = data[code];
icon_map.icon = result;

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
</p>`);

        return marker;
    },
    onEachFeature: onEachFeature

}).addTo(mymap);
