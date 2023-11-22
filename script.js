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
            timerJump = 100
            renderImage();
            animateJump();
        }
    } else if (event.key === "ArrowDown") {
        alert("bas");
    } else if (event.key === "ArrowLeft") {
        direction = "gauche"
        timerJump = 100
        renderImage()
        animateDep();
    } else if (event.key === "ArrowRight") {
        direction = "droite"
        timerJump = 100
        renderImage();
        animateDep();
    }

});


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
                deplacement += 3,2;
            }
        } else if (direction == "gauche") {
            if (deplacement > 0) {
                deplacement -= 3,2;
            }
        }
        moveAndScroll()
        settime = setTimeout(() => {
            timer = requestAnimationFrame(animateDep)
        }, 100);
    } else {
        if (direction == "droite") {
            deplacement += 3,2;
        } else if (direction == "gauche") {
            deplacement -= 3,2;
        }
        setTimeout(() => {     
            if (miniJump == 0){
                let mainImage = document.querySelector(".main");
                mainImage.setAttribute("src", "./per0.png");
            }
        }, 100);
        cancelAnimationFrame(timer)
        clearTimeout()
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
    if (deplacement >= 50) { //deplacement: position actuel du personnage, si il est > 50 scroll de 500 NB:j'ai tiré des nombres au hasard
        window.scrollTo(deplacement - 500, 0)
    }
    // 
}

const renderImage = () => {
    // Éviter de dépasser l'index de la taille du tableau d'images
    if (indexFrame === imageDeplacement.length) {
        indexFrame = 0;
    }
    // Sélectionner l'image du personnage principal
    let mainImage = document.querySelector(".main");
    // Changer la source de l'image et faire apparaître la nouvelle image
    if (direction == "droite" || direction == "gauche"){
        let pos = imageDeplacement[indexFrame++];
        mainImage.setAttribute("src", `./${pos}`);
    }else if (direction === "haut" && !authoJump) {
        let pos = imageDeplacement[indexFrame++];
        mainImage.setAttribute("src", `./${pos}`);
        setTimeout(() => {
            mainImage.setAttribute("src", `./atterir.png`);
        }, 1000);
    }else if (miniJump <= 0){
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
        let timeout = setTimeout(() => {
            if (indexFrame >= imageDeplacement.length) {
                cancelAnimationFrame(animation);
                animation = null;
                clearTimeout(timeout);
            } else {
                animation = requestAnimationFrame(renderImage);
            }
        }, timerJump);
    };
};
