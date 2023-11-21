var deplacement = 1;;
var animation;
var timer;
var settime;
var direction;
var fond = document.querySelector(".background");
var imageDeplacement = ["dep0.png", "dep1.png", "dep2.png"];
var mainImage = document.querySelector(".main");
let indexFrame = 0;
let timerJump;
var miniJump = 0;
var actif = true;
var timeJump;
var authoJump = true

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") {
        if (authoJump) {
            direction = "haut"
            timerJump = 1600
            renderImage();
            animateJump();
        }
    } else if (event.key === "ArrowDown") {
        alert("bas");
    } else if (event.key === "ArrowLeft") {
        direction = "gauche"
        timerJump = 200
        renderImage()
        animateDep();
    } else if (event.key === "ArrowRight") {
        direction = "droite"
        timerJump = 200
        renderImage();
        animateDep();
    }
});


function animateJump() {
    if (actif) {
        miniJump += 2;
        authoJump = false
        if (miniJump == 300) {
            actif = false
        }
    } else {
        miniJump -= 2;
        if (miniJump == 0) {
            authoJump = true;
            cancelAnimationFrame(timeJump)
            actif = true;
        }
    }
    jumpAndScroll()
    settime = setTimeout(() => {
        if (miniJump != 0) {
            timeJump = requestAnimationFrame(animateJump)
        }
    }, 10);
}
//deplacement innerhtml et scroll top and bottom
const jumpAndScroll = () => {
    let perso = document.querySelector(".main");
    perso.style.bottom = `${40+miniJump}px`; //changer la position du personnage par rapport a la gauche de l'element parent
    // if (deplacement >= 50) { //deplacement: position actuel du personnage, si il est > 50 scroll de 500 NB:j'ai tiré des nombres au hasard
    //     window.scrollTo(deplacement - 500, 0)
    // }
    // 
}

function animateDep() {
    if (deplacement < fond.clientWidth - 150) {
        if (deplacement % 10 != 0) {
            if (direction == "droite") {
                deplacement += 1;
            } else if (direction == "gauche") {
                if (deplacement > 0) {
                    deplacement -= 1;
                }
            }
            moveAndScroll()
            settime = setTimeout(() => {
                timer = requestAnimationFrame(animateDep)
            }, 200);
        } else {
            if (direction == "droite") {
                deplacement += 1;
            } else if (direction == "gauche") {
                deplacement -= 1;
            }
            cancelAnimationFrame(timer)
            clearTimeout()
        }
    }
}
//a chaque rechargement de la page ramaner le scroll a 0
window.addEventListener("beforeunload", (event) => {
    window.scrollTo(0, 0);
});

//deplacement innerhtml et scroll left and right
const moveAndScroll = () => {
    let perso = document.querySelector(".main");
    perso.style.left = `${deplacement}px`; //changer la position du personnage par rapport a la gauche de l'element parent
    //perso.style.bottom = `${miniJump+40}px`;
    if (deplacement >= 50) { //deplacement: position actuel du personnage, si il est > 50 scroll de 500 NB:j'ai tiré des nombres au hasard
        window.scrollTo(deplacement - 500, 0)
    }
    // 
}

const renderImage = () => {
    //eviter de depasser l'index de la taille du tableau d'image
    if (indexFrame == imageDeplacement.length) {
        indexFrame = 0;
    }
    //selectionner l'image du personnage principale
    let mainImage = document.querySelector(".main");
    //si l'image est charger execute les instructions ci dessous
    mainImage.onload = () => {
        if (direction == "gauche") {
            mainImage.style.transform = "scaleX(-1)" //tourner a gauche
        } else if (direction == "droite") {
            mainImage.style.transform = "scaleX(1)" //tourner a droite
        }
        let timeout = setTimeout(() => {
            if (indexFrame >= imageDeplacement.length) {
                cancelAnimationFrame(animation)
                    // if (direction == "haut" && !authoJump) {
                    //     mainImage.setAttribute("src", `./per0.png`);
                    // }
                mainImage.setAttribute("src", `./per0.png`);
                animation = null
                clearTimeout(timeout)
            } else {
                animation = requestAnimationFrame(renderImage); //executer les images chaque 250 milliseconde pour avoir un meilleur rendu
            }
        }, timerJump);;
    };
    let pos = imageDeplacement[indexFrame];
    indexFrame++;
    //changer la source de l'image et faire apparaitre la nouvelle image
    mainImage.setAttribute("src", `./${pos}`);
}