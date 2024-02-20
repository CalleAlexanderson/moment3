// Globala konstanter och variabler

// --------------------------------------------------
// Initiera globala variabler och händelsehanterare
function init() {

    fetchData();

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
    console.log(gData);
    console.log(programs);
    console.log(courses);
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
                offset: 75,
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
        labels: [
            `${programs[0].name}, ${programs[1].applicantsTotal} personer sökte programmet`,
            `${programs[1].name}, ${programs[2].applicantsTotal} personer sökte programmet`,
            `${programs[2].name}, ${programs[3].applicantsTotal} personer sökte programmet`,
            `${programs[3].name}, ${programs[4].applicantsTotal} personer sökte programmet`,
            `${programs[4].name}, ${programs[5].applicantsTotal} personer sökte programmet`],
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
            labelOffset: 100,
            labelDirection: 'explode',
            labelInterpolationFnc: function (value) {
                return value;
            }
        }],
        ['screen and (min-width: 640px)', {
            chartPadding: 20,
            labelOffset: 100,
            labelDirection: 'explode'
        }],
        ['screen and (min-width: 1024px)', {
            chartPadding: 30,
            labelOffset: 0,
            labelDirection: 'explode'
        }]
    ];

    new Chartist.Pie('#chart2', data, pieOptions, responsiveOptionsPie);
}