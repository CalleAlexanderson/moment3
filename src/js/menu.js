// Globala konstanter och variabler

// --------------------------------------------------
// Initiera globala variabler och händelsehanterare
function init() {
    let menuElem = document.getElementById('mobile_menu');
    
    document.getElementById('menu_btn').addEventListener('click', () => {
        menuElem.style.visibility = "visible";
        menuElem.style.height = "100vh";
        document.getElementsByTagName('body')[0].style.overflowY = "hidden";
        if (document.title == "Animationer") {
            document.getElementById('animations_main').style.zIndex = "-1";
        }
    });
    document.getElementById('menu_btn_x').addEventListener('click', () => {
        menuElem.style.visibility = "hidden";
        menuElem.style.height = "0";
        document.getElementsByTagName('body')[0].style.overflowY = "auto";

        if (document.title == "Animationer") {
            document.getElementById('animations_main').style.zIndex = "initial";
        }
    });

    menuElem.style.visibility = "hidden";
    menuElem.style.height = "0";

    window.addEventListener('resize', () => {
        if (window.screen.width > 601) {
            menuElem.style.visibility = "hidden";
            menuElem.style.height = "0";
        }
    })
} // Slut init
window.addEventListener('load', init);
// --------------------------------------------------