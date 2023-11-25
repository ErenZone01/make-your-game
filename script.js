var deplacement = 1;;
var animation;
var timer;
var settime;
var direction;
var fond = document.querySelector(".background");
var imageDeplacement = ["dep0.png", "dep1.png", "dep2.png"];
var imageHit = ["hit01.png", "hit02.png", "hit03.png", "hit04.png", "hit05.png", "hit06.png"];
var mainImage = document.querySelector(".main");
let indexFramedep = 0;
let indexFramehit = 0;
let timerJump;
var miniJump = 0;
var actif = true;
var timeJump;
var authoJump = true
var test;
var dep = false;
//bruitage air
var keysPressed = {};

document.addEventListener("keydown", async(event) => {
    keysPressed[event.key] = true;
    handleKeyPress();
});

document.addEventListener("keyup", (event) => {
    keysPressed[event.key] = false;
    handleKeyPress();
});

function handleKeyPress() {
    if (keysPressed["ArrowDown"]) {
        // Gérer l'action pour ArrowDown
        alert("bas");
    }

    if (keysPressed["ArrowLeft"]) {
        // Gérer l'action pour ArrowLeft
        eventleft();
    }

    if (keysPressed["ArrowRight"]) {
        // Gérer l'action pour ArrowRight
        eventright();
    }

    if (keysPressed["ArrowUp"]) {
        // Gérer l'action pour ArrowUp
        eventJump();
    }

    if (keysPressed[" "]) {
        // Gérer l'action pour la barre d'espace
        attack();
    }
    setTimeout(() => {
        requestAnimationFrame(handleKeyPress)
    }, 5000);
}


const attack = () => {
    var air = document.createElement("audio")
    air.src = "./SF-epee-15.mp3";
    air.play();
    direction = "attack"
    renderImage();
}

// document.addEventListener("keyup", (event) => {
//     cancelAnimationFrame(animation)
// });

function eventJump() {
    if (authoJump) {
        direction = "haut"
        timerJump = 100
        renderImage();
        animateJump();
    }
}

function eventleft() {
    direction = "gauche"
    timerJump = 100
    renderImage()
    animateDep();
}

function eventright() {
    direction = "droite"
    timerJump = 100
    renderImage();
    animateDep();
}


function animateJump() {
    if (actif) {
        miniJump += 5;
        authoJump = false
        if (miniJump == 300) {
            actif = false
        }
    } else {
        miniJump -= 3;
        if (miniJump == 0) {
            authoJump = true;
            cancelAnimationFrame(timeJump)
            let mainImage = document.querySelector(".main");
            mainImage.setAttribute("src", "./per0.png");
            actif = true;
        }
    }
    jumpAndScroll()
        // settime = setTimeout(() => {
    if (miniJump != 0) {
        timeJump = requestAnimationFrame(animateJump)
    }
    // }, 5);
}
//deplacement innerhtml et scroll top and bottom
const jumpAndScroll = () => {
    let perso = document.querySelector(".main");
    perso.style.bottom = `${40 + miniJump}px`; //changer la position du personnage par rapport a la gauche de l'element parent
}

function animateDep() {
    if (deplacement % 10 != 0) {
        if (direction == "droite") {
            if (deplacement < fond.clientWidth - 200) {
                deplacement += 3, 2;
            }
        } else if (direction == "gauche") {
            if (deplacement > 0) {
                deplacement -= 3, 2;
            }
        }
        dep = true
        moveAndScroll()
        clearTimeout(test)
        settime = setTimeout(() => {
            timer = requestAnimationFrame(animateDep)
        }, 100);
    } else {
        if (direction == "droite") {
            deplacement += 3, 2;
        } else if (direction == "gauche") {
            deplacement -= 3, 2;
        }
        dep = false
        test = setTimeout(() => {
            if ((miniJump == 0) && !dep) {
                let mainImage = document.querySelector(".main");
                mainImage.setAttribute("src", "./per0.png");
            }
        }, 30);
        clearTimeout(settime)
        cancelAnimationFrame(timer)
    }
}
//a chaque rechargement de la page ramaner le scroll a 0
window.addEventListener("beforeunload", (event) => {
    window.scrollTo(0, 0);
});

//deplacement innerhtml et scroll left and right
const moveAndScroll = async() => {
    let perso = document.querySelector(".main");
    perso.style.left = `${deplacement}px`; //changer la position du personnage par rapport a la gauche de l'element parent
    if (deplacement >= 50) { //deplacement: position actuel du personnage, si il est > 50 scroll de 500 NB:j'ai tiré des nombres au hasard
        window.scrollTo(deplacement - 500, 0)
    }
    // 
}

const renderImage = async() => {
    // Éviter de dépasser l'index de la taille du tableau d'images
    if (indexFramedep === imageDeplacement.length) {
        indexFramedep = 0;
    }
    if (indexFramehit === imageHit.length) {
        indexFramehit = 0;
    }
    // Sélectionner l'image du personnage principal
    let mainImage = document.querySelector(".main");
    // Changer la source de l'image et faire apparaître la nouvelle image
    if (direction === "attack") {
        let pos = imageHit[indexFramehit++];
        mainImage.setAttribute("src", `./${pos}`);
        // if (indexFramehit == 6) {
        if (!authoJump) {
            setTimeout(() => {
                mainImage.setAttribute("src", `./atterir.png`);
            }, 400);
        } else {
            setTimeout(() => {
                mainImage.setAttribute("src", "./per0.png")
            }, 400);
        }
        // }
    } else if (direction == "droite" || direction == "gauche") {
        imageDeplacement = ["dep0.png", "dep1.png", "dep2.png"];
        let pos = imageDeplacement[indexFramedep++];
        mainImage.setAttribute("src", `./${pos}`);
    } else if (direction === "haut" && !authoJump) {
        imageDeplacement = ["dep0.png", "dep1.png", "dep2.png"];
        let pos = imageDeplacement[indexFramedep++];
        mainImage.setAttribute("src", `./${pos}`);
        setTimeout(() => {
            mainImage.setAttribute("src", `./atterir.png`);
        }, 1000);
    } else if (miniJump <= 0) {
        mainImage.setAttribute("src", "./per0.png");
    }

    // Tourner l'image en fonction de la direction
    if (direction === "gauche") {
        mainImage.style.transform = "scaleX(-1)";
    } else if (direction === "droite") {
        mainImage.style.transform = "scaleX(1)";
    }
    // Exécuter les instructions une fois que l'image est chargée
    mainImage.onload = () => {
        // let timeout = setTimeout(() => {
        if ((indexFramedep >= imageDeplacement.length) || (indexFramehit >= imageHit.length)) {
            cancelAnimationFrame(animation);
            animation = null;
        } else {
            animation = requestAnimationFrame(renderImage);
        }
        // }, 2000);
    };
};