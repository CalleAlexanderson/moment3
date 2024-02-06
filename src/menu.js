// Globala konstanter och variabler
let menuElem;
// --------------------------------------------------
// Initiera globala variabler och händelsehanterare
function init() {

    document.getElementById('menu_btn').addEventListener('click', toggleMenu);
    document.getElementById('menu_btn_x').addEventListener('click', toggleMenu);
    
    menuElem = document.getElementById('mobile_menu');
    menuElem.style.visibility = "hidden";
    menuElem.style.height = "0";


} // Slut init
window.addEventListener('load', init);
// --------------------------------------------------

function toggleMenu() {
    if (this == document.getElementById('menu_btn')) {
        menuElem.style.visibility = "visible";
        menuElem.style.height = "100vh";
    } else {

        menuElem.style.visibility = "hidden";
        menuElem.style.height = "0";
    }
}