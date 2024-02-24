// Globala konstanter och variabler

// --------------------------------------------------
// Initiera globala variabler och händelsehanterare
function init() {

    if (document.title == "Diagram") {
        fetchData();
    } else if (document.title == "Karta") {
        document.getElementById('place').value = "Mid Sweden University";
        getCords();
        document.getElementById('show_btn').addEventListener('click', getCords);
    }

    window.addEventListener('resize', () => {
        if (document.title == "Karta") {
            document.getElementById('place').value = "Mid Sweden University";
            getCords();
        }
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
    let input = document.getElementById('place').value;

    let inputForFetch = input.replace(/\s/g, '+') //hittade denna metod här: https://flaviocopes.com/how-to-replace-whitespace-javascript/

    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?addressdetails=1&q=${inputForFetch}&format=jsonv2&limit=1`);
        cordsData = await response.json();
    } catch (error) {
        console.log(error);
    }

    if (cordsData != null) {
        let windowLonCords1 = cordsData[0].boundingbox[2];
        let windowLatCords2 = cordsData[0].boundingbox[0];
        let windowLonCords3 = cordsData[0].boundingbox[3];
        let windowLatCords4 = cordsData[0].boundingbox[1];
        let markerLatCords1 = cordsData[0].lat;
        let markerLonCords2 = cordsData[0].lon;
        let url = `https://www.openstreetmap.org/export/embed.html?bbox=${windowLonCords1}%2C${windowLatCords2}%2C${windowLonCords3}%2C${windowLatCords4}&amp;marker=${markerLatCords1}%2C${markerLonCords2}`;

        createMap(url)
    } else {
        document.getElementById('msg').innerHTML = "Något gick fel vi laddning av graferna";
    }
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