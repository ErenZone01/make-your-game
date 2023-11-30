var deplacement = 1;
var life = 100;
var degat = 8;
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
var miniJump = 0;
var actif = true;
var timerJump;
var timeJump;
var authoJump = true
var test;
var dep = false;
var keysPressed = {};
var ImageTitan = 8;
var end;
class Titan {
    constructor(id) {
        this.id = id;
        this.deplacementTitan = fond.clientWidth - 200;
        this.lifetitan = 100;
        this.degatTitan = 5;
        this.indexFrametitan = 1;
        this.indexFramehit = 1;
        this.animateTitan = null;
        this.hpbarre = null;
        this.hp = null;
        this.tailles = null;
        this.animatehit = null;
        this.timehit = null;
        this.timeAnimateTitan = null;

        this.createTitan();
        this.createHPBar();
        this.renderTitan();
    }

    createTitan() {
        this.titan = document.createElement("img");
        this.titan.setAttribute("src", `./aot model/pose/titan0.png`);
        this.titan.style.width = "5%";
        this.titan.style.bottom = "55px";
        this.titan.style.position = "absolute";
        this.titan.style.right = `0px`;
        this.titan.id = this.id;
        this.titan.classList = "titan";
        document.body.append(this.titan);
        let test = document.getElementById(this.id);
        let info = test.getBoundingClientRect();
        this.tailles = info.width;
    }

    createHPBar() {
        this.hpbarre = document.createElement("div");
        this.hpbarre.classList = "healthbarretitan";
        this.hpbarre.id = this.id;
        this.hptitan = document.createElement("div");
        this.hptitan.classList = "healthtitan";
        this.hptitan.style.width = `${this.lifetitan}%`;
        this.hptitan.id = "health" + this.id;;
        this.hpbarre.appendChild(this.hptitan);
        document.body.append(this.hpbarre);
    }

    hitTitan() {
        let pos = `./aot model/hit/hit${this.indexFramehit++}.png`;
        this.titan.setAttribute("src", `${pos}`);

        // Logique pour gérer les attaques du titan
        // ...
        //this.indexFramehit++;
        this.timehit = setTimeout(() => {
            this.animatehit = requestAnimationFrame(() => this.hitTitan())
        }, 800);

        if (this.indexFramehit === 5) {
            // Logique après l'animation d'attaque du titan
            // ...
            if (((this.deplacementTitan - deplacement >= 0) && (this.deplacementTitan - deplacement <= 50)) || ((this.deplacementTitan - deplacement < 0) && (this.deplacementTitan - deplacement >= -50))) {
                life -= this.degatTitan
                var hpmain = document.getElementById("health");
                hpmain.style.width = life + "%";
                if (life == 50) {
                    hpmain.style.backgroundColor = "orange";
                } else if (life == 30) {
                    hpmain.style.backgroundColor = "red";
                }
                mainImage = document.querySelector(".main");
                mainImage.style.bottom = "45px"
                    //mainImage.src = "./asset/die.png"
            }
            this.indexFramehit = 1;
            clearTimeout(this.timehit);
            cancelAnimationFrame(this.animatehit);
        }
    }

    renderTitan() {
        if (this.lifetitan > 0) {
            if (this.indexFrametitan > ImageTitan) {
                this.indexFrametitan = 1;
            }

            let pos = `./aot model/depTitan/dep (${this.indexFrametitan++}).png`;
            this.titan.setAttribute("src", `${pos}`);

            // Logique pour animer le mouvement du titan
            // ...
            if ((this.deplacementTitan - deplacement >= 0) && (this.deplacementTitan - deplacement <= 500)) {
                this.titan.style.transform = "scaleX(-1)"
                if ((this.deplacementTitan - deplacement >= 0) && (this.deplacementTitan - deplacement <= 50)) {
                    this.hitTitan();
                } else {
                    this.deplacementTitan -= 10
                }
            } else if ((this.deplacementTitan - deplacement < 0) && (this.deplacementTitan - deplacement >= -500)) {
                this.titan.style.transform = "scaleX(1)"
                if ((this.deplacementTitan - deplacement < 0) && (this.deplacementTitan - deplacement >= -50)) {
                    this.hitTitan();
                } else {
                    this.deplacementTitan += 10
                }
            } else {
                this.titan.style.transform = "scaleX(-1)"
                this.deplacementTitan -= 10
            }

            if (this.deplacementTitan <= 0) {
                clearTimeout(this.timeAnimateTitan);
                cancelAnimationFrame(this.animateTitan);
                alert("Tu as perdu");
            }

            this.titan.style.left = `${this.deplacementTitan}px`;
            let height = this.titan.getBoundingClientRect();
            this.hpbarre.style.left = `${this.deplacementTitan}px`;
            this.hpbarre.style.top = `${height.top - 20}px`;

            this.timeAnimateTitan = setTimeout(() => {
                this.animateTitan = requestAnimationFrame(() => this.renderTitan());
            }, 450);
        }
    }
}

const numberOfTitans = 1;
const titans = [];

// Créer le premier titan (le joueur)
const playerTitan = new Titan(0);
titans.push(playerTitan);

// Créer les autres titans
for (let i = 1; i <= numberOfTitans; i++) {
    setTimeout(() => {
        let titan = new Titan(i);
        titan.deplacementTitan -= 50
        titans.push(titan);
    }, 10000);;
}
//FIN DE JEU
const Endgame = async() => {
    if (life <= 0) {
        alert("Vous avez perdu");
        for (let i = 0; i < titans.length; i++) {
            clearTimeout(await titans[i].timeAnimateTitan);
            clearTimeout(await titans[i].timehit);
            clearTimeout(timerJump);
            clearTimeout(timer);
            clearTimeout(test);
            clearTimeout(settime);
            cancelAnimationFrame(timeJump);
            cancelAnimationFrame(animation);
            cancelAnimationFrame(await titans[i].animatehit);
            cancelAnimationFrame(await titans[i].animateTitan);
            cancelAnimationFrame(end);
        }
    } else {
        end = requestAnimationFrame(Endgame)
    }
}
Endgame();

document.addEventListener("keydown", async(event) => {
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
                deplacement += 1;
            }
        } else if (direction == "gauche") {
            if (deplacement > 0) {
                deplacement -= 1;
            }
        }
        dep = true
        moveAndScroll()
        clearTimeout(test)
        settime = setTimeout(() => {
            timer = requestAnimationFrame(animateDep)
        }, 300);
    } else {
        if (direction == "droite") {
            deplacement += 1;
        } else if (direction == "gauche") {
            deplacement -= 1;
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
var indexblood = 1;
var animateblood;
var timeblood;
const blood = () => {
    if (indexblood > 7) {
        indexblood = 1;
        clearTimeout(timeblood);
        cancelAnimationFrame(animateblood);
    } else {
        let mainImage = document.querySelector(".main");
        let info = mainImage.getBoundingClientRect();
        let bloods = document.createElement("img");
        bloods.style.position = "absolute";
        bloods.style.left = `${deplacement+10}px`;
        bloods.style.bottom = info.bottom + "px"
        bloods.style.width = `2%`;
        bloods.setAttribute("src", `./aot model/blood/blood (${indexblood++}).png`);
        document.body.append(bloods);
        timeblood = setTimeout(() => {
            animateblood = requestAnimationFrame(blood)
        }, 10);
    }
}


const renderImage = async() => {
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
            for (let i = 0; i < titans.length; i++) {
                let titan = titans[i];
                let taille = titan.tailles;
                if (((titan.deplacementTitan - deplacement >= 0) && (titan.deplacementTitan - deplacement <= taille)) || ((titan.deplacementTitan - deplacement < 0) && (titan.deplacementTitan - deplacement >= -taille))) {
                    titan.lifetitan -= degat
                    let hp = document.getElementById("health" + titan.id);
                    hp.style.width = titan.lifetitan + "%";
                    if (titan.lifetitan <= 0) {
                        //si le titan n'a plus de vie
                        titan.titan.style.display = "none"
                        titan.titan.style.visibility = "none"
                        titan.hpbarre.style.display = "none"
                        titan.hpbarre.style.visibility = "none"
                    }
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