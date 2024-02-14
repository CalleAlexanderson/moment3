// Globala konstanter och variabler

let cardQ;
let cardA;

// --------------------------------------------------
// Initiera globala variabler och händelsehanterare
function init(){

cardQ = document.getElementById('div1');
cardA = document.getElementById('div2');

cardQ.addEventListener('click', getAnswer);
cardA.addEventListener('click', resetCards);

} // Slut init
window.addEventListener('load', init);
// --------------------------------------------------

function getAnswer() {
    cardQ.classList.add("animationShowACardQ");
    cardA.classList.add("animationShowACardA");

    cardQ.classList.remove("animationShowQCardQ");
    cardA.classList.remove("animationShowQCardA");
    console.log(this);
}

function resetCards() {
    cardQ.classList.remove("animationShowACardQ");
    cardA.classList.remove("animationShowACardA");

    cardQ.classList.add("animationShowQCardQ");
    cardA.classList.add("animationShowQCardA");
    console.log(this);
}