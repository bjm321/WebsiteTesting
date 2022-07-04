const apiKey = 'pk.eyJ1IjoiYmptMzIxIiwiYSI6ImNsM3FodXFqejB0OHgzY3JzMDUyanVpcGUifQ.HpARsm_UCTbOTdmTeyQyfQ';

$(document).ready(function () {

    $('#map').height(window.innerHeight);
    $('#slide-in').height(window.innerHeight);

    $(document).on('click', '#advanced', function () {
        if ($('#slide-in').hasClass('in')) {
            $('#slide-in').removeClass('in')
        }
        else {
            $('#slide-in').addClass('in')

        }
    })
})
const mymap = L.map('map').setView(
    [34.056203918518236, -118.25736731890913],
    10
);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    maxZoom: 18,
    attribution: '© OpenStreetMap',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: apiKey
}).addTo(mymap);

var iconSizeLength = 75,
    iconSizeWidth = iconSizeLength / 2;

var SchoolIcon = L.Icon.extend({
    options: {
        iconSize: [iconSizeLength, iconSizeWidth], // size of the icon
        iconAnchor: [iconSizeWidth, iconSizeWidth + 10], // point of the icon which will correspond to marker's location
        popupAnchor: [0, -iconSizeWidth] // point from which the popup should open relative to the iconAnchor
    }
});


var elementary = new SchoolIcon({ iconUrl: 'Images/mapicons/elementary.svg' }),
    high = new SchoolIcon({ iconUrl: 'Images/mapicons/high.svg' }),
    span = new SchoolIcon({ iconUrl: 'Images/mapicons/span.svg' }),
    hosting = new SchoolIcon({ iconUrl: 'Images/mapicons/hosting.svg' }),
    hostingred = new SchoolIcon({ iconUrl: 'Images/mapicons/hostingred.svg' }),
    hostingblue = new SchoolIcon({ iconUrl: 'Images/mapicons/hostingblue.svg' }),
    hostingpurple = new SchoolIcon({ iconUrl: 'Images/mapicons/hostingpurple.svg' }),
    hostinggreen = new SchoolIcon({ iconUrl: 'Images/mapicons/hostinggreen.svg' }),
    hostingyellow = new SchoolIcon({ iconUrl: 'Images/mapicons/hostingyellow.svg' }),
    middle = new SchoolIcon({ iconUrl: 'Images/mapicons/middle.svg' }),
    elementaryblue = new SchoolIcon({ iconUrl: 'Images/mapicons/elementaryblue.svg' }),
    elementarygreen = new SchoolIcon({ iconUrl: 'Images/mapicons/elementarygreen.svg' }),
    elementaryyellow = new SchoolIcon({ iconUrl: 'Images/mapicons/elementaryyellow.svg' }),
    highred = new SchoolIcon({ iconUrl: 'Images/mapicons/highred.svg' }),
    spanblue = new SchoolIcon({ iconUrl: 'Images/mapicons/spanblue.svg' }),
    spanyellow = new SchoolIcon({ iconUrl: 'Images/mapicons/spanyellow.svg' }),
    spangreen = new SchoolIcon({ iconUrl: 'Images/mapicons/spangreen.svg' }),
    spanred = new SchoolIcon({ iconUrl: 'Images/mapicons/spanred.svg' }),
    spanpurple = new SchoolIcon({ iconUrl: 'Images/mapicons/spanpurple.svg' }),
    middleblue = new SchoolIcon({ iconUrl: 'Images/mapicons/middleblue.svg' }),
    middlered = new SchoolIcon({ iconUrl: 'Images/mapicons/middlered.svg' }),
    middlepurple = new SchoolIcon({ iconUrl: 'Images/mapicons/middlepurple.svg' }),
    middlegreen = new SchoolIcon({ iconUrl: 'Images/mapicons/middlegreen.svg' }),
    middleyellow = new SchoolIcon({ iconUrl: 'Images/mapicons/middleyellow.svg' }),
    error = new SchoolIcon({ iconUrl: 'Images/mapicons/error.svg' });

function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties && feature.properties.popupContent) {
        layer.bindPopup(feature.properties.School);
    }
}

var addedDistrictborders = L.geoJSON(districtborders, {
    style: function (feature) {
        return {
            color: feature.properties.stroke,
        };
    }
}).addTo(mymap);

// This fits all of LAUSD in to the screen.
mymap.fitBounds(addedDistrictborders.getBounds(), {
    padding: [10, 10]
});

L.geoJSON(schools, {
    pointToLayer: function (geoJsonPoint, latlng) {
        // Determine what icon to use for the schools.
        let icon_map = {
            icon: span
        };

        // let multiStageLayer = { filter: function(feature, layer) { (feature.properties.Grade === "Span");}}
        // let highLayer = {filter: function(feature, layer) {(feature.properties.Grade === "High");}}
        // let middleLayer = {filter: function(feature, layer) { (feature.properties.Grade === "Middle");}}
        // let elementaryLayer = {filter: function(feature, layer) {(feature.properties.Grade === "Elementary");}}
        // let vRCLayer = {filter: function(feature, layer) {("VRC" in feature.properties  && feature.properties.VRC.toLowerCase().trim()  === "yes");}}
        // let vIQCLayer = {filter: function(feature, layer) {("VIQC" in feature.properties && feature.properties.VIQC.toLowerCase().trim() === "yes");}}
        // let grantLayer = {filter: function(feature, layer) {("Grants" in feature.properties  && feature.properties.Grants.toLowerCase().trim()  === "yes");}}
        // let hostLayer = {filter: function(feature, layer) {("Hosting" in feature.properties  && feature.properties.Hosting.toLowerCase().trim()  === "yes");}}

        // layerControl.addOverlay(hostLayer, 'Hosting');
        // layerControl.addOverlay(grantLayer, 'Grants');
        // layerControl.addOverlay(elementaryLayer, 'Elementary');  
        // layerControl.addOverlay(middleLayer, 'Middle');
        // layerControl.addOverlay(highLayer, 'High');
        // layerControl.addOverlay(multiStageLayer, 'MultiStage');
        // layerControl.addOverlay(vIQCLayer, 'VIQC');
        // layerControl.addOverlay(vRCLayer, 'VRC');

        let NTG = ("Grants" in geoJsonPoint.properties && geoJsonPoint.properties.Grants.toLowerCase().trim() === "yes");
        let VIQC = ("VIQC" in geoJsonPoint.properties && geoJsonPoint.properties.VIQC.toLowerCase().trim() === "yes");
        let VRC = ("VRC" in geoJsonPoint.properties && geoJsonPoint.properties.VRC.toLowerCase().trim() === "yes");
        let code = (NTG << 2) | (VIQC << 1) | VRC;
        let data = [];

        //Nelson Team Grants(NTG) are only avable for Elementary & Middle School Vex IQ Teams.
        if (geoJsonPoint.properties.Hosting != null && geoJsonPoint.properties.Hosting != "") {
            data = [hosting,                 // (NTG, VIQC, VRC) = 000
                hostingred,                  // (NTG, VIQC, VRC) = 001
                hostingblue,                 // (NTG, VIQC, VRC) = 010
                hostingpurple,               // (NTG, VIQC, VRC) = 011
                error,                       // (NTG, VIQC, VRC) = 100 Error
                error,                       // (NTG, VIQC, VRC) = 101 Error
                hostinggreen,                // (NTG, VIQC, VRC) = 110
                hostingyellow];              // (NTG, VIQC, VRC) = 111
        } else {
            switch (geoJsonPoint.properties.Grade) {
                case "Elementary":
                    data = [elementary,  // (NTG, VIQC, VRC) = 000
                        error,           // (NTG, VIQC, VRC) = 001 Error
                        elementaryblue,  // (NTG, VIQC, VRC) = 010
                        error,           // (NTG, VIQC, VRC) = 011
                        error,           // (NTG, VIQC, VRC) = 100 Error
                        error,           // (NTG, VIQC, VRC) = 101 Error
                        elementarygreen, // (NTG, VIQC, VRC) = 110 
                        error];          // (NTG, VIQC, VRC) = 111 Error
                    break;
                case "Middle":
                    data = [middle,      // (NTG, VIQC, VRC) = 000
                        middlered,       // (NTG, VIQC, VRC) = 001
                        middleblue,      // (NTG, VIQC, VRC) = 010
                        middlepurple,    // (NTG, VIQC, VRC) = 011
                        error,           // (NTG, VIQC, VRC) = 100 Error
                        error,           // (NTG, VIQC, VRC) = 101 Error
                        middlegreen,     // (NTG, VIQC, VRC) = 110 
                        middleyellow];   // (NTG, VIQC, VRC) = 111 
                    break;
                case "High":
                    data = [high,        // (NTG, VIQC, VRC) = 000
                        highred,         // (NTG, VIQC, VRC) = 001
                        error,           // (NTG, VIQC, VRC) = 010 Error
                        error,           // (NTG, VIQC, VRC) = 011 Error
                        error,           // (NTG, VIQC, VRC) = 100 Error
                        error,           // (NTG, VIQC, VRC) = 101 Error
                        error,           // (NTG, VIQC, VRC) = 110 Error
                        error];          // (NTG, VIQC, VRC) = 111 Error
                    break;
                default:
                    data = [span,        // (NTG, VIQC, VRC) = 000
                        spanred,         // (NTG, VIQC, VRC) = 001
                        spanblue,        // (NTG, VIQC, VRC) = 010
                        spanpurple,      // (NTG, VIQC, VRC) = 011
                        error,           // (NTG, VIQC, VRC) = 100 Error
                        error,           // (NTG, VIQC, VRC) = 101 Error
                        spangreen,       // (NTG, VIQC, VRC) = 110 
                        spanyellow];     // (NTG, VIQC, VRC) = 111 
                    break;
            }
        }

        icon_map.icon = data[code];


        let marker = L.marker(latlng, icon_map);

        // If there are teams, list them.
        let teamInnerHTML = "";
        if (geoJsonPoint.properties.ActiveTeams) {
            teamInnerHTML = `<dt>Team numbers</dt><dd>${geoJsonPoint.properties.ActiveTeams}</dd>`;
        }

        let inactiveTeamInnerHTML = "";
        if (geoJsonPoint.properties.InactiveTeams) {
            inactiveTeamInnerHTML = `<dt>Inactive Team numbers</dt><dd>${geoJsonPoint.properties.InactiveTeams}</dd>`;
        }

        // If there are events (in a <ul>...</ul>), list them.
        let VEXIQESLeagueEventInnerHTML = "";
        if (geoJsonPoint.properties.EventDatesVEXIQESLeague != null && geoJsonPoint.properties.EventDatesVEXIQESLeague != "") {
            VEXIQESLeagueEventInnerHTML = `<dt>VEX IQ Elementary School League</dt><dd><a href="${geoJsonPoint.properties.EventWebsiteVEXIQESLeague}" title="Open in new window" target="_blank">${geoJsonPoint.properties.NumberofteamsVEXIQESLeague} Teams ${geoJsonPoint.properties.EventDatesVEXIQESLeague}</a></dd>`;
        }

        let VEXIQMSLeagueEventInnerHTML = "";
        if (geoJsonPoint.properties.EventDatesVEXIQMSLeague != null && geoJsonPoint.properties.EventDatesVEXIQMSLeague != "") {
            VEXIQMSLeagueEventInnerHTML = `<dt>VEX IQ Middle School League</dt><dd><a href="${geoJsonPoint.properties.EventWebsiteVEXIQMSLeague}" title="Open in new window" target="_blank">${geoJsonPoint.properties.NumberofteamsVEXIQMSLeague} Teams Teams ${geoJsonPoint.properties.EventDatesVEXIQMSLeague}</a></dd>`;
        }

        let VEXIQESMSLeagueEventInnerHTML = "";
        if (geoJsonPoint.properties.EventDatesVEXIQESMSLeague != null && geoJsonPoint.properties.EventDatesVEXIQESMSLeague != "") {
            VEXIQESMSLeagueEventInnerHTML = `<dt>VEX IQ Elementary/Middle School League</dt><dd><a href="${geoJsonPoint.properties.EventWebsiteVEXIQESMSLeague}" title="Open in new window" target="_blank">${geoJsonPoint.properties.NumberofteamsVEXIQESMSLeague} Teams ${geoJsonPoint.properties.EventDatesVEXIQESMSLeague}</a></dd>`;
        }

        let VEXIQESTournamentEventInnerHTML = "";
        if (geoJsonPoint.properties.EventDatesVEXIQESTournament != null && geoJsonPoint.properties.EventDatesVEXIQESTournament != "") {
            VEXIQESTournamentEventInnerHTML = `<dt>VEX IQ Elementary School Tournament</dt><dd><a href="${geoJsonPoint.properties.EventWebsiteVEXIQESTournament}" title="Open in new window" target="_blank">${geoJsonPoint.properties.NumberofteamsVEXIQESTournament} Teams ${geoJsonPoint.properties.EventDatesVEXIQESTournament}</a></dd>`;
        }

        let VEXIQMSTournamentEventInnerHTML = "";
        if (geoJsonPoint.properties.EventDatesVEXIQMSTournament != null && geoJsonPoint.properties.EventDatesVEXIQMSTournament != "") {
            VEXIQMSTournamentEventInnerHTML = `<dt>VEX IQ Middle School Tournament</dt><dd><a href="${geoJsonPoint.properties.EventWebsiteVEXIQMSTournament}" title="Open in new window" target="_blank">${geoJsonPoint.properties.NumberofteamsVEXIQMSTournament} Teams ${geoJsonPoint.properties.EventDatesVEXIQMSTournament}</a></dd>`;
        }

        let VEXIQESMSTournamentEventInnerHTML = "";
        if (geoJsonPoint.properties.EventDatesVEXIQESMSTournament != null && geoJsonPoint.properties.EventDatesVEXIQESMSTournament != "") {
            VEXIQESMSTournamentEventInnerHTML = `<dt>VEX IQ Elementary/Middle School Tournament</dt><dd><a href="${geoJsonPoint.properties.EventWebsiteVEXIQESMSTournament}" title="Open in new window" target="_blank">${geoJsonPoint.properties.NumberofteamsVEXIQESMSTournament} Teams ${geoJsonPoint.properties.EventDatesVEXIQESMSTournament}</a></dd>`;
        }

        // Make sure each school has its own unique popup.
        marker.bindPopup(`
            <p>
            <h4>${geoJsonPoint.properties.School}</h4>
            <dl>
                ${teamInnerHTML}
                ${inactiveTeamInnerHTML}
                ${VEXIQESLeagueEventInnerHTML}
                ${VEXIQMSLeagueEventInnerHTML}
                ${VEXIQESMSLeagueEventInnerHTML}
                ${VEXIQESTournamentEventInnerHTML}
                ${VEXIQMSTournamentEventInnerHTML}
                ${VEXIQESMSTournamentEventInnerHTML}
            </dl>
            </p>`);

        return marker;

        if (mymap.getZoom() < 6) {
            marker.bindTooltip(geoJsonPoint.properties.School,
                {
                    permanent: true,
                    direction: 'center',
                    className: 'transparent-tooltip'

                })
        }
    }
}).addTo(mymap);

/* mymap.on('zoomend', function() {
    if (mymap.getZoom() <6){
        mymap.removeLayer(multiStageLayer);//1st geoJSON layer
   }
   if (mymap.getZoom() <8){
    mymap.removeLayer(middleLayer);//2nd geoJSON layer
   }
   if (mymap.getZoom() <10){
    mymap.removeLayer(elementaryLayer);//3rd geoJSON layer
   }
   else {
    mymap.addLayer(Span);
    mymap.addLayer(Middle);
    mymap.addLayer(Elementary);
    } //all layers are to be switched on, when zoom level reach 10
   });
 */
