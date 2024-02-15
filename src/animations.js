// Globala konstanter och variabler
let questionElem;
let answerElem;
let question;
let cardQ;
let cardA;

// --------------------------------------------------
// Initiera globala variabler och händelsehanterare
function init() {

    question = 1;

    cardQ = document.getElementById('div1');
    cardA = document.getElementById('div2');

    cardQ.addEventListener('click', getAnswer);
    cardA.addEventListener('click', resetCards);
    document.getElementById('question_btn').addEventListener('click', changeQuestion);

    questionElem = document.getElementById('div1_p');
    answerElem = document.getElementById('div2_p');

} // Slut init
window.addEventListener('load', init);
// --------------------------------------------------

function getAnswer() {
    cardQ.classList.add("animationShowACardQ");
    cardA.classList.add("animationShowACardA");

    cardQ.classList.remove("animationShowQCardQ");
    cardA.classList.remove("animationShowQCardA");
}

function resetCards() {
    cardQ.classList.remove("animationShowACardQ");
    cardA.classList.remove("animationShowACardA");

    cardQ.classList.add("animationShowQCardQ");
    cardA.classList.add("animationShowQCardA");
}

// satte funktionen till async så jag kan använda timeout
async function changeQuestion() {
    question = question + 1;

    if (question == 6) {
        question = 1;
    }

    if (cardQ.classList.contains("animationShowACardQ")) {
        resetCards();
        await new Promise(resolve => setTimeout(resolve, 3000)); //sätter en timeout på 3 sekunder så korten hinner gå igenom sin animation
    }

    switch (question) {
        case 2:
            console.log("Fråga 2");
            questionElem.innerText = 'På vilket hip hop album kan låten "Many men" hittas?';
            answerElem.innerText = "Get rich or die tryin'";
            break;
        case 3:
            console.log("Fråga 3");
            questionElem.innerText = "Disstracket No vaseline är riktad mot vilken grupp?";
            answerElem.innerText = "N.W.A";

            break;
        case 4:
            console.log("Fråga 4");
            questionElem.innerText = "Vilka artister förutom Eminem samarbetade på låten bump heads?";
            answerElem.innerText = "50 Cent, Tony Yayo, Lloyd Banks";
            break;
        case 5:
            console.log("Fråga 5");
            questionElem.innerText = "Disstracket killshot var riktad mot vilken rappare?";
            answerElem.innerText = "Machine Gun Kelly";

            break;


        default:
            console.log("Fråga 1");
            questionElem.innerText = "Vad hette debut albumet från hip hop gruppen N.W.A?";
            answerElem.innerText = "Straight Outta Compton";
            break;
    }
}