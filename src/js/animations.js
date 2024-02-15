// Globala konstanter och variabler
let question = 1;

// --------------------------------------------------
// Initiera globala variabler och händelsehanterare
function init() {


    document.getElementById('div1').addEventListener('click', getAnswer);
    document.getElementById('div2').addEventListener('click', resetCards);
    document.getElementById('question_btn').addEventListener('click', changeQuestion);

} // Slut init
window.addEventListener('load', init);
// --------------------------------------------------

function getAnswer() {
    document.getElementById('div1').classList.add("animationShowACardQ");
    document.getElementById('div2').classList.add("animationShowACardA");

    document.getElementById('div1').classList.remove("animationShowQCardQ");
    document.getElementById('div2').classList.remove("animationShowQCardA");
}

function resetCards() {
    document.getElementById('div1').classList.remove("animationShowACardQ");
    document.getElementById('div2').classList.remove("animationShowACardA");

    document.getElementById('div1').classList.add("animationShowQCardQ");
    document.getElementById('div2').classList.add("animationShowQCardA");
}

// satte funktionen till async så jag kan använda timeout
async function changeQuestion() {
    question = question + 1;

    if (question == 6) {
        question = 1;
    }

    if (document.getElementById('div1').classList.contains("animationShowACardQ")) {
        resetCards();
        await new Promise(resolve => setTimeout(resolve, 3000)); //sätter en timeout på 3 sekunder så korten hinner gå igenom sin animation
    }

    switch (question) {
        case 2:
            document.getElementById('div1_p').innerText = 'På vilket hip hop album kan låten "Many men" hittas?';
            document.getElementById('div2_p').innerText = "Get rich or die tryin'";
            break;
        case 3:
            document.getElementById('div1_p').innerText = "Disstracket No vaseline är riktad mot vilken grupp?";
            document.getElementById('div2_p').innerText = "N.W.A";

            break;
        case 4:
            document.getElementById('div1_p').innerText = "Vilka artister förutom Eminem samarbetade på låten bump heads?";
            document.getElementById('div2_p').innerText = "50 Cent, Tony Yayo, Lloyd Banks";
            break;
        case 5:
            document.getElementById('div1_p').innerText = "Disstracket killshot var riktad mot vilken rappare?";
            document.getElementById('div2_p').innerText = "Machine Gun Kelly";

            break;
        default:
            document.getElementById('div1_p').innerText = "Vad hette debut albumet från hip hop gruppen N.W.A?";
            document.getElementById('div2_p').innerText = "Straight Outta Compton";
            break;
    }
}