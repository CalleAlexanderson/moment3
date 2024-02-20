// Globala konstanter och variabler

// --------------------------------------------------
// Initiera globala variabler och händelsehanterare
function init() {
    let data = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        series: [
            [5, 2, 4, 2, 10]
        ]
    };

    new Chartist.Line('#chart2', data);


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
            } else{
                programs.push(gData[index])
            }
        }
    }
    console.log(gData);
    console.log(programs);
    console.log(courses);
    courses = courses.sort((b, a) => a.applicantsTotal - b.applicantsTotal);

    let barChartData = {
        labels: [courses[0].name, courses[1].name, courses[2].name, courses[3].name, courses[4].name, courses[5].name],
        series: [
            [courses[0].applicantsTotal, courses[1].applicantsTotal, courses[2].applicantsTotal, courses[3].applicantsTotal, courses[4].applicantsTotal, courses[5].applicantsTotal]
        ]
    };
    
    new Chartist.Bar('#chart1', barChartData);
    // console.log(gData);
}