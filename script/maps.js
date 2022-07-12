//const apiKey = 'xOQpyGkGTzSHBro5TZPFO3TPHGttq6N1OPA7Cb1UYWBosKceq5EsludW7QnStYcq';

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

const mymap = L.map('map').setView([34.0087328034, -118.3281857501], 12);
L.tileLayer('https://tile.jawg.io/jawg-streets/{z}/{x}/{y}{r}.png?access-token=p1HMoLi6SX7usNwdzkU6J1PnYtsuT25ADYWmud4QlN5t9vNbOtDeLbbgBQHGP3CB', {}).addTo(mymap);
mymap.attributionControl.addAttribution("<a href=\"https://www.jawg.io\" target=\"_blank\">&copy; Jawg</a> - <a href=\"https://www.openstreetmap.org\" target=\"_blank\">&copy; OpenStreetMap</a>&nbsp;contributors")

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
    hostingRed = new SchoolIcon({ iconUrl: 'Images/mapicons/hostingRed.svg' }),
    hostingBlue = new SchoolIcon({ iconUrl: 'Images/mapicons/hostingBlue.svg' }),
    hostingPurple = new SchoolIcon({ iconUrl: 'Images/mapicons/hostingPurple.svg' }),
    hostingGreen = new SchoolIcon({ iconUrl: 'Images/mapicons/hostingGreen.svg' }),
    hostingYellow = new SchoolIcon({ iconUrl: 'Images/mapicons/hostingYellow.svg' }),
    middle = new SchoolIcon({ iconUrl: 'Images/mapicons/middle.svg' }),
    elementaryBlue = new SchoolIcon({ iconUrl: 'Images/mapicons/elementaryBlue.svg' }),
    elementaryGreen = new SchoolIcon({ iconUrl: 'Images/mapicons/elementaryGreen.svg' }),
    elementaryYellow = new SchoolIcon({ iconUrl: 'Images/mapicons/elementaryYellow.svg' }),
    highRed = new SchoolIcon({ iconUrl: 'Images/mapicons/highRed.svg' }),
    spanBlue = new SchoolIcon({ iconUrl: 'Images/mapicons/spanBlue.svg' }),
    spanYellow = new SchoolIcon({ iconUrl: 'Images/mapicons/spanYellow.svg' }),
    spanGreen = new SchoolIcon({ iconUrl: 'Images/mapicons/spanGreen.svg' }),
    spanRed = new SchoolIcon({ iconUrl: 'Images/mapicons/spanRed.svg' }),
    spanPurple = new SchoolIcon({ iconUrl: 'Images/mapicons/spanPurple.svg' }),
    middleBlue = new SchoolIcon({ iconUrl: 'Images/mapicons/middleBlue.svg' }),
    middleRed = new SchoolIcon({ iconUrl: 'Images/mapicons/middleRed.svg' }),
    middlePurple = new SchoolIcon({ iconUrl: 'Images/mapicons/middlePurple.svg' }),
    middleGreen = new SchoolIcon({ iconUrl: 'Images/mapicons/middleGreen.svg' }),
    middleYellow = new SchoolIcon({ iconUrl: 'Images/mapicons/middleYellow.svg' }),
    error = new SchoolIcon({ iconUrl: 'Images/mapicons/error.svg' });

function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties && feature.properties.popupContent) {
        layer.bindPopup(feature.properties.School);
    }
}

var addedDistrictBorders = L.geoJSON(districtBorders, {
    style: function (feature) {
        return {
            color: feature.properties.stroke,

        };
    }
}).addTo(mymap);

/**
 * Returns true if the given school geoJSON object represents a school that is a Nelson Team Grant recipient.
 */
function isNTG(schoolFeature) {
    return "Grants" in schoolFeature.properties &&
        schoolFeature.properties.Grants.toLowerCase().trim() === "yes";
}

/**
 * Returns true if the given school geoJSON object has a VEX IQ Challenge program.
 */
function isVIQC(schoolFeature) {
    return "VIQC" in schoolFeature.properties &&
        schoolFeature.properties.VIQC.toLowerCase().trim() === "yes";
}

/**
 * Returns true if the given school geoJSON object has a VEX Robotics Competition program.
 */
function isVRC(schoolFeature) {
    return "VRC" in schoolFeature.properties &&
        schoolFeature.properties.VRC.toLowerCase().trim() === "yes";
}

var addedSchools = L.geoJSON(schools, {
    pointToLayer: function (geoJsonPoint, latLng) {
        // Determine what icon to use for the schools.
        let icon_map = {
            icon: span
        };

        let NTG = isNTG(geoJsonPoint);
        let VIQC = isVIQC(geoJsonPoint);
        let VRC = isVRC(geoJsonPoint);
        let code = (NTG << 2) | (VIQC << 1) | VRC;
        let data = [];

        //Nelson Team Grants(NTG) are only available for Elementary & Middle School Vex IQ Teams.
        if (geoJsonPoint.properties.Hosting != null && geoJsonPoint.properties.Hosting != "") {
            data = [hosting,                     // (NTG, VIQC, VRC) = 000
                hostingRed,                  // (NTG, VIQC, VRC) = 001
                hostingBlue,                 // (NTG, VIQC, VRC) = 010
                hostingPurple,               // (NTG, VIQC, VRC) = 011
                error,                       // (NTG, VIQC, VRC) = 100 Error
                error,                       // (NTG, VIQC, VRC) = 101 Error
                hostingGreen,                // (NTG, VIQC, VRC) = 110
                hostingYellow];              // (NTG, VIQC, VRC) = 111
        } else {
            switch (geoJsonPoint.properties.Grade) {
                case "Elementary":
                    data = [elementary,      // (NTG, VIQC, VRC) = 000
                        error,           // (NTG, VIQC, VRC) = 001 Error
                        elementaryBlue,  // (NTG, VIQC, VRC) = 010
                        error,           // (NTG, VIQC, VRC) = 011
                        error,           // (NTG, VIQC, VRC) = 100 Error
                        error,           // (NTG, VIQC, VRC) = 101 Error
                        elementaryGreen, // (NTG, VIQC, VRC) = 110
                        error];          // (NTG, VIQC, VRC) = 111 Error
                    break;
                case "Middle":
                    data = [middle,          // (NTG, VIQC, VRC) = 000
                        middleRed,       // (NTG, VIQC, VRC) = 001
                        middleBlue,      // (NTG, VIQC, VRC) = 010
                        middlePurple,    // (NTG, VIQC, VRC) = 011
                        error,           // (NTG, VIQC, VRC) = 100 Error
                        error,           // (NTG, VIQC, VRC) = 101 Error
                        middleGreen,     // (NTG, VIQC, VRC) = 110
                        middleYellow];   // (NTG, VIQC, VRC) = 111
                    break;
                case "High":
                    data = [high,            // (NTG, VIQC, VRC) = 000
                        highRed,         // (NTG, VIQC, VRC) = 001
                        error,           // (NTG, VIQC, VRC) = 010 Error
                        error,           // (NTG, VIQC, VRC) = 011 Error
                        error,           // (NTG, VIQC, VRC) = 100 Error
                        error,           // (NTG, VIQC, VRC) = 101 Error
                        error,           // (NTG, VIQC, VRC) = 110 Error
                        error];          // (NTG, VIQC, VRC) = 111 Error
                    break;
                default:
                    data = [span,            // (NTG, VIQC, VRC) = 000
                        spanRed,         // (NTG, VIQC, VRC) = 001
                        spanBlue,        // (NTG, VIQC, VRC) = 010
                        spanPurple,      // (NTG, VIQC, VRC) = 011
                        error,           // (NTG, VIQC, VRC) = 100 Error
                        error,           // (NTG, VIQC, VRC) = 101 Error
                        spanGreen,       // (NTG, VIQC, VRC) = 110
                        spanYellow];     // (NTG, VIQC, VRC) = 111
                    break;
            }
        }

        icon_map.icon = data[code];


        let marker = L.marker(latLng, icon_map);

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



        if (mymap.getZoom() < 6) {
            console.log(mymap.getZoom());
            marker.bindTooltip(geoJsonPoint.properties.School,
                {
                    permanent: true,
                    direction: 'center',
                    className: 'transparent-tooltip'

                });
            layer.addTo(mymap);
        }
        return marker;
    }
}).addTo(mymap);

//adding search bar for school names
function matchInputAtStartOfWord(text, searchTerm) {
    const escapedInput = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
    const searchExpression = RegExp("\\b" + escapedInput, "i");
    const match = text.match(searchExpression);
    return (match !== null);
}

$(document).on('keyup', '#search', function (e) {
    var userInput = e.target.value;
    addedSchools.eachLayer(function (layer) {
        if (matchInputAtStartOfWord(layer.feature.properties.School, userInput)) {
            layer.addTo(mymap);
        } else {
            mymap.removeLayer(layer);
        }
    });
});

/**
 * This function filters the list of schools by two criteria: the value of
 * the dropdown control in the Advanced Toggle menu, and one of the
 * statistics listed below the drop-down.
 *
 * @param {string} dropdownValue One of the following strings: `NTG`, `VIQC`,
 *                               `VRC`, or an empty string to represent all
 *                               schools.
 * @param {string} statValue     One of the following strings: `Workshop`.
 *                               This represents a statistic row that we are
 *                               trying to obtain the list for.
 * @return Returns a filtered array.
 */
function testFilter(dropdownValue, statValue) {

    return schools["features"].filter(function (currentElement) {
        let dropdownMatched = false;
        let statValueMatched = false;
        const schoolTypes = ["elementary", "middle", "high", "span"];

        if (dropdownValue === "" ||
            ((dropdownValue === "VIQC" && isVIQC(currentElement)) ||
             (dropdownValue === "VRC" && isVRC(currentElement)) ||
             (dropdownValue === "NTG" && isNTG(currentElement))) ||
            (schoolTypes.includes(dropdownValue.toLowerCase()) && currentElement.properties.Grade.toLowerCase() === dropdownValue.toLowerCase())) {

            dropdownMatched = true;
        }

        if (statValue == "Workshop" && "Workshop" in currentElement.properties) {
            statValueMatched = true;
        } else if (schoolTypes.includes(statValue.toLowerCase()) &&
            currentElement.properties.Grade.toLowerCase() === statValue.toLowerCase()) {
            statValueMatched = true;
        }

        return statValueMatched && dropdownMatched;
    });
}

//School filter
$(document).on('change', '#filter-select', function (e) {
    var filterSelect = e.target.value;
    if (filterSelect !== '') {
        addedSchools.eachLayer(function (layer) {
            if (filterSelect === layer.feature.properties.Grade) {
                layer.addTo(mymap);
            } else if (filterSelect === "NTG") {
                if (isNTG(layer.feature)) {
                    layer.addTo(mymap);
                } else {
                    mymap.removeLayer(layer);
                }
            } else if (filterSelect === "VIQC") {
                if (isVIQC(layer.feature)) {
                    layer.addTo(mymap);
                } else {
                    mymap.removeLayer(layer);
                }
            } else if (filterSelect === "VRC") {
                if (isVRC(layer.feature)) {
                    layer.addTo(mymap);
                } else {
                    mymap.removeLayer(layer);
                }
            } else if (filterSelect === "Hosting") {
                if (layer.feature.properties.Hosting.toLowerCase().trim() === "yes") {
                    layer.addTo(mymap);
                } else {
                    mymap.removeLayer(layer);
                }
            } /* else if (filterSelect === "Workshop") {
                 if (layer.feature.properties.Workshop.toLowerCase().trim() === "yes") {
                    layer.addTo(mymap);
                }else {
                    mymap.removeLayer(layer);
                }
            } */ else {
                mymap.removeLayer(layer);
            }
        });

    } else {
        addedSchools.eachLayer(function (layer) {
            layer.addTo(mymap);
        });

    }


});
