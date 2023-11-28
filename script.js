var deplacement = 1;
var life = 100;
var lifetitan = 100;
var degat = 10;
var degatTitan = 10;
var animation;
var timer;
var settime;
var direction;
var fond = document.querySelector(".background");
var imageDeplacement = ["dep0.png", "dep1.png", "dep2.png"];
var imageHit = ["hit01.png", "hit02.png", "hit03.png", "hit04.png", "hit05.png", "hit06.png"];
var mainImage = document.querySelector(".main");
var indexFramedep = 0;
var indexFramedeptitan = 0;
var indexFramehit = 1
var indexFrametitan = 1;
var miniJump = 0;
var actif = true;
var timerJump;
var timeJump;
var timehit;
var timeAnimateTitan;
var authoJump = true
var test;
var dep = false;
var keysPressed = {};
var deplacementTitan = fond.clientWidth - 200;
var ImageTitan = 8;
var animateTitan;
var animatehit;
var end
//create titan
var titan = document.createElement("img");
titan.setAttribute("src", "./aot model/pose/titan0.png")
titan.style.width = "5%";
titan.style.bottom = "55px"
titan.style.position = "absolute"
titan.style.right = "0px"
document.body.append(titan);
//create hp barre for titan
var hpbarre = document.createElement("div");
hpbarre.classList = "healthbarretitan";
var hptitan = document.createElement("div");
hptitan.classList = "healthtitan";
hptitan.style.width = lifetitan + "%";
hptitan.id = "healthtitan";
hpbarre.appendChild(hptitan)
document.body.append(hpbarre)
//FIN DE JEU
const Endgame = () => {
    end = requestAnimationFrame(Endgame)
    if (life <= 0) {
        alert("Vous avez perdu");
        clearTimeout(timeAnimateTitan);
        clearTimeout(timehit);
        clearTimeout(timerJump);
        clearTimeout(timer);
        clearTimeout(test);
        clearTimeout(settime);
        cancelAnimationFrame(timeJump);
        cancelAnimationFrame(animation);
        cancelAnimationFrame(animatehit);
        cancelAnimationFrame(animateTitan);
        cancelAnimationFrame(end);
    }
}
Endgame();
const hitTitan = () => {
    let pos = `./aot model/hit/hit${indexFramehit}.png`;
    titan.setAttribute("src", `${pos}`)
    indexFramehit++
    timehit = setTimeout(() => {
        animatehit = requestAnimationFrame(hitTitan)
    }, 800);
    if (indexFramehit == 5) {
        //setTimeout(() => {
        if (((deplacementTitan - deplacement >= 0) && (deplacementTitan - deplacement <= 30)) || ((deplacementTitan - deplacement < 0) && (deplacementTitan - deplacement >= -30))) {
            life -= degatTitan
            var hp = document.getElementById("health")
            hp.style.width = life + "%";
            mainImage = document.querySelector(".main");
            mainImage.style.bottom = "45px"
            //mainImage.src = "./asset/die.png"
        }
        //}, 1000);
        indexFramehit = 1
        clearTimeout(timehit)
        cancelAnimationFrame(animatehit)
    }
}
//cretaion de titan
const renderTitan = () => {
    if (lifetitan > 0) {
        if (indexFrametitan > ImageTitan) {
            indexFrametitan = 1
        }
        let pos = `./aot model/depTitan/dep (${indexFrametitan++}).png`;
        titan.setAttribute("src", `${pos}`)
        if ((deplacementTitan - deplacement >= 0) && (deplacementTitan - deplacement <= 500)) {
            titan.style.transform = "scaleX(-1)"
            if ((deplacementTitan - deplacement >= 0) && (deplacementTitan - deplacement <= 60)) {
                hitTitan();
            } else {
                deplacementTitan -= 10
            }
        } else if ((deplacementTitan - deplacement < 0) && (deplacementTitan - deplacement >= -500)) {
            titan.style.transform = "scaleX(1)"
            if ((deplacementTitan - deplacement < 0) && (deplacementTitan - deplacement >= -60)) {
                hitTitan();
            } else {
                deplacementTitan += 10
            }
        } else {
            titan.style.transform = "scaleX(-1)"
            deplacementTitan -= 10
        }
        //console.log("titan : " + deplacementTitan + ",main : " + deplacement)
        titan.style.left = `${deplacementTitan}px`;
        let height = titan.getBoundingClientRect();
        hpbarre.style.left = `${deplacementTitan}px`;
        hpbarre.style.top = `${height.top - 20}px`;
        timeAnimateTitan = setTimeout(() => {
            animateTitan = requestAnimationFrame(renderTitan)
        }, 450);
        if (deplacementTitan <= 0) {
            clearTimeout(timeAnimateTitan)
            cancelAnimationFrame(animateTitan)
            alert("Tu as perdu")
        }
    }
}
renderTitan()
document.addEventListener("keydown", async (event) => {
    if (life > 0) {
        keysPressed[event.key] = true;
        handleKeyPress();
    }
});

document.addEventListener("keyup", (event) => {
    keysPressed[event.key] = false;
    handleKeyPress();
});

function handleKeyPress() {
    if (keysPressed["ArrowDown"]) {
        // Gérer l'action pour ArrowDown
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
    }, 2000);
}

const attack = () => {
    var air = document.createElement("audio")
    air.src = "./SF-epee-15.mp3";
    air.play();
    direction = "attack"
    renderImage();
}

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
    perso.style.bottom = `${45 + miniJump}px`; //changer la position du personnage par rapport a la gauche de l'element parent
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
const moveAndScroll = async () => {
    let perso = document.querySelector(".main");
    perso.style.left = `${deplacement}px`; //changer la position du personnage par rapport a la gauche de l'element parent
    if (deplacement >= 50) { //deplacement: position actuel du personnage, si il est > 50 scroll de 500 NB:j'ai tiré des nombres au hasard
        window.scrollTo(deplacement - 500, 0)
    }
    // 
}

const renderImage = async () => {
    // Éviter de dépasser l'index de la taille du tableau d'images
    if (indexFramedep === imageDeplacement.length) {
        indexFramedep = 0;
    }
    if (indexFramedeptitan === imageHit.length) {
        indexFramedeptitan = 0;
    }
    // Sélectionner l'image du personnage principal
    let mainImage = document.querySelector(".main");
    // Changer la source de l'image et faire apparaître la nouvelle image
    if (direction === "attack") {
        let pos = imageHit[indexFramedeptitan++];
        // setTimeout(() => {
        mainImage.setAttribute("src", `./${pos}`);
        // }, 1000);
        //  if (indexFramedeptitan == 6) {
        if (indexFramedeptitan == imageHit.length) {
            var info = titan.getBoundingClientRect();
            var taille = info.width;
            if (((deplacementTitan - deplacement >= 0) && (deplacementTitan - deplacement <= taille)) || ((deplacementTitan - deplacement < 0) && (deplacementTitan - deplacement >= -taille))) {
                lifetitan -= degat
                let hp = document.getElementById("healthtitan");
                hp.style.width = lifetitan + "%";
                if (lifetitan <= 0) {
                    //si le titan n'a plus de vie
                    titan.style.display = "none"
                    titan.style.visibility = "none"
                    hpbarre.style.display = "none"
                    hpbarre.style.visibility = "none"

                }
            }
            // }
        }
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
        let pos = imageDeplacement[indexFramedep++];
        mainImage.setAttribute("src", `./${pos}`);
    } else if (direction === "haut" && !authoJump) {
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
    // mainImage.onload = () => {
    //  let timeout = setTimeout(() => {
    if ((indexFramedep >= imageDeplacement.length) || (indexFramedeptitan >= imageHit.length)) {
        cancelAnimationFrame(animation);
        animation = null;
    } else {
        animation = requestAnimationFrame(renderImage);
    }
    //  }, 2000);
    // };
};