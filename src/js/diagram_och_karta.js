// Globala konstanter och variabler

// --------------------------------------------------
// Initiera globala variabler och händelsehanterare
function init() {

    if (document.title == "Diagram") {
        fetchData();
    } else if (document.title == "Karta") {
        createMap("https://www.openstreetmap.org/export/embed.html?bbox=2.2917652130126958%2C48.85799170917724%2C2.2962445020675664%2C48.859530503276&amp;layer=mapnik&amp;marker=48.858761112139845%2C2.2940048575401306");
        getCords();
    }

    window.addEventListener('resize', () => {
        createMap("https://www.openstreetmap.org/export/embed.html?bbox=2.2917652130126958%2C48.85799170917724%2C2.2962445020675664%2C48.859530503276&amp;layer=mapnik&amp;marker=48.858761112139845%2C2.2940048575401306")
    })

} // Slut init
window.addEventListener('load', init);
// --------------------------------------------------

async function fetchData() {
    try {
        const response = await fetch("https://studenter.miun.se/~mallar/dt211g/");
        data = await response.json();
    } catch (error) {
        console.log(error);
    }

    if (data != null) {
        makeGraphs(data)
    } else {
        document.getElementById('msg').innerHTML = "Något gick fel vi laddning av graferna";
    }
}

async function makeGraphs(gData) {
    let courses = [];
    let programs = [];
    for (let index = 0; index < gData.length; index++) {
        if (gData[index].admissionRound == "HT2023") {
            if (gData[index].type == "Kurs") {
                courses.push(gData[index])
            } else {
                programs.push(gData[index])
            }
        }
    }
    courses = courses.sort((b, a) => a.applicantsTotal - b.applicantsTotal);

    programs = programs.sort((b, a) => a.applicantsTotal - b.applicantsTotal);

    let barOptions = {
        labelInterpolationFnc: function (value) {
            return value[0]
        },
        reverseData: true,
        horizontalBars: true,
        fullWidth: false,
    };

    let responsiveOptionsBar = [
        ['screen and (min-width: 0)', {
            axisY: {
                offset: 95,
                showGrid: false,
            },
            axisX: {
                // showGrid: false,
            }
        }],
        ['screen and (min-width: 1024px)', {
            axisY: {
                offset: 200,
            }
        }]
    ];

    let barChartData = {
        label: 'sökande',
        labels: [courses[0].name, courses[1].name, courses[2].name, courses[3].name, courses[4].name, courses[5].name],
        series: [
            [courses[0].applicantsTotal, courses[1].applicantsTotal, courses[2].applicantsTotal, courses[3].applicantsTotal, courses[4].applicantsTotal, courses[5].applicantsTotal]
        ]
    };

    new Chartist.Bar('#chart1', barChartData, barOptions, responsiveOptionsBar);

    let data = {
        labels: [`1`, `2`, `3`, `4`, `5`],
        series: [programs[0].applicantsTotal, programs[1].applicantsTotal, programs[2].applicantsTotal, programs[3].applicantsTotal, programs[4].applicantsTotal]
    };

    let pieOptions = {
        labelInterpolationFnc: function (value) {
            return value[0]
        }
    };

    let responsiveOptionsPie = [
        ['screen and (min-width: 0)', {
            chartPadding: 10,
            labelOffset: 10,
            labelDirection: 'explode',
            labelInterpolationFnc: function (value) {
                return value;
            }
        }],
        ['screen and (min-width: 640px)', {
            labelOffset: 20
        }],
        ['screen and (min-width: 1024px)', {
            labelOffset: 30
        }]
    ];

    let ul = document.getElementById('ul_descs');

    // skapade en lista med de datan eftersom label inte blir speciellt lättläst 
    for (let index = 0; index < 5; index++) {
        let li = document.createElement('li');
        let text = document.createTextNode(`${index + 1} = ${programs[index].name}, ${programs[index].applicantsTotal} personer sökte programmet`);
        li.appendChild(text);
        ul.appendChild(li);
    }

    new Chartist.Pie('#chart2', data, pieOptions, responsiveOptionsPie);
}

async function getCords() {
    // createMap("https://www.openstreetmap.org/export/embed.html?bbox=${windowCords1}%2C${windowCords2}%2C${windowCords3}%2C${windowCords4}&amp;layer=mapnik&amp;marker=${markerCords1}%2C${markerCords2}")
    let windowCords1 = "-0.12634277343750003";
    let windowCords2 = "51.499973957576465";
    let windowCords3 = "-0.12280225753784181";
    let windowCords4 = "51.50142992608211";
    let markerCords1 = (51.499973957576465 + 51.50142992608211) / 2;
    let markerCords2 = (-0.12634277343750003 + -0.12280225753784181) / 2;
    console.log(markerCords1);
    console.log(markerCords2);
    let url = `https://www.openstreetmap.org/export/embed.html?bbox=${windowCords1}%2C${windowCords2}%2C${windowCords3}%2C${windowCords4}&amp;marker=${markerCords1}%2C${markerCords2}`;

    console.log(url);
    createMap(url)
}

async function createMap(mapUrl) {

    if (screen.width > 1200) {
        document.getElementById('map_div').innerHTML = `<iframe width="1100" height="600" src="${mapUrl}"></iframe>`;
        document.getElementById('karta_main').style.height = "750px";
    } else if (screen.width > 700) {
        document.getElementById('map_div').innerHTML = `<iframe width="600" height="450" src="${mapUrl}"></iframe>`;
        document.getElementById('karta_main').style.height = "600px";
    } else {
        document.getElementById('map_div').innerHTML = `<iframe width="260" height="150" src="${mapUrl}"></iframe>`;
        document.getElementById('karta_main').style.height = "300px";
    }
}