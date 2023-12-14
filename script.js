var fond = document.querySelector(".background");
var imageDeplacement = ["dep0.png", "dep1.png", "dep2.png"];
var imageHit = ["hit01.png", "hit02.png", "hit03.png", "hit04.png", "hit05.png", "hit06.png"];
var mainImage = document.querySelector(".main");
var deplacement = 1;
var life = 100;
var degat = 2;
var point = 0;
var animation;
var timer;
var settime;
var direction;
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
//blood
var indexblood = 1;
var animateblood;
var timeblood;
//name titan
var nameTitan = ["titan", "cuirasse"];
//nbr titan
let numberOfTitans = 4;
const titans = [];
let createTitantimer = null;
//Creer un timer
let duration = null;
let heure = 120;
var backgroundsound;
var saut = null;
//creation de sang
let bloods = document.createElement("img");
bloods.style.position = "absolute";
bloods.style.left = `0px`;
bloods.style.bottom = "45px";
bloods.id = "sang";
bloods.style.visibility = "hidden";
bloods.style.width = `5%`;
bloods.setAttribute("src", `./aot model/blood/blood${indexblood++}.png`);
document.body.append(bloods);
//initialisation des points
let pointdiv = document.getElementById("point")
pointdiv.textContent = point;
//pause
var pause = false
const initGame = () => {
    deplacement = 1;
    life = 100;
    degat = 2;
    point = 0;
    animation;
    timer;
    settime;
    direction;
    indexFramedep = 0;
    indexFramedeptitan = 0;
    miniJump = 0;
    actif = true;
    timerJump;
    timeJump;
    authoJump = true
    test;
    dep = false;
    keysPressed = {};
    ImageTitan = 8;
    end;
    //blood
    indexblood = 1;
    animateblood;
    timeblood;
    //nbr titan
    numberOfTitans = 4;
    const titans = [];
    createTitantimer = null;
    //Creer un timer
    duration = null;
    heure = 120;
    backgroundsound;
    saut = null;
    pause = false
}

const BackgroundSound = () => {
    backgroundsound = document.createElement("audio")
    backgroundsound.src = "./background.mp3";
    backgroundsound.loop = true;
    backgroundsound.play();
}

const endanimation = async () => {
    for (let i = 0; i < titans.length; i++) {
        clearTimeout(await titans[i].timeAnimateTitan);
        clearTimeout(await titans[i].timehit);
        clearTimeout(timerJump);
        clearTimeout(duration);
        clearTimeout(timer);
        clearTimeout(test);
        clearTimeout(settime);
        cancelAnimationFrame(timeJump);
        cancelAnimationFrame(animation);
        cancelAnimationFrame(await titans[i].animatehit);
        cancelAnimationFrame(await titans[i].animateTitan);
        cancelAnimationFrame(end);
    }
}

const Endgame = async () => {
    if (((life <= 0) || (heure <= 0)) || ((heure < 110) && (titans.length == 0))) {
        await endanimation();
        if ((heure < 110) && (titans.length == 0)) {
            let win = document.getElementsByClassName("block3")[0];
            win.style.visibility = "visible";
        } else {
            let mainImage = document.getElementsByClassName("main")[0];
            mainImage.src = "./die.png"
            setTimeout(() => {
                let lose = document.getElementsByClassName("block4")[0];
                lose.style.visibility = "visible";
            }, 2000);
        }

    } else {
        end = requestAnimationFrame(Endgame)
    }
}

const GameDuration = () => {
    if (!pause) {
        let timerid = document.getElementById("heure")
        timerid.textContent = heure
        if ((heure == 0) || ((heure < 110) && (titans.length == 0))) {
            clearTimeout(duration)
            Endgame();
        } else {
            duration = setTimeout(() => {
                heure--;
                requestAnimationFrame(GameDuration);
            }, 1000);
        }
    } else {
        requestAnimationFrame(GameDuration)
    }

}

class Titan {
    constructor(id, name) {
        this.id = id;
        this.deplacementTitan = fond.clientWidth - 200;
        this.lifetitan = 100;
        this.degatTitan = 1;
        this.indexFrametitan = 1;
        this.indexFramehit = 1;
        this.animateTitan = null;
        this.hpbarre = null;
        this.hp = null;
        this.tailles = null;
        this.animatehit = null;
        this.timehit = null;
        this.timeAnimateTitan = null;
        this.name = name
        this.indexflash = 1;
        this.timeflash = null;
        this.animateflash = null;
        this.height = null;
        this.animationtitan = 450;
        this.position = "";
        //poussiere
        this.indexpoussiere = 1;
        this.animatepoussiere = null;
        this.timepoussiere = null;
        //impact
        this.indeximpact = 1;
        this.animateimpactframe = null;
        this.timeimpact = null;
        //les methodes
        this.createTitan();
        this.flash();
        this.createHPBar();
        this.createimpact();
        this.createpoussiere();
        this.renderTitan();

    }
    //apparition titan
    flash = () => {
        if (!pause) {
            if (this.indexflash == 1) {
                let flashs = document.createElement("img");
                flashs.setAttribute("src", `./aot model/apparition/flash${1}.png`);
                flashs.style.position = "absolute";
                flashs.style.width = "2%";
                flashs.style.height = "100%";
                flashs.style.left = `${this.deplacementTitan}px`;
                flashs.style.bottom = `45px`;
                flashs.style.visibility = "hidden";
                flashs.id = "flash";
                document.body.append(flashs)
                var thunder = document.createElement("audio")
                thunder.src = "./thunder.mp3";
                thunder.play();
            }
            let div = document.getElementById("flash");
            div.style.visibility = "visible";
            div.src = `./aot model/apparition/flash${this.indexflash++}.png`;
            if (this.indexflash == 7) {
                var beast = document.createElement("audio")
                beast.src = "./awake.mp3";
                beast.play();
                clearTimeout(this.timeflash);
                cancelAnimationFrame(this.animateflash);
                div.style.visibility = "hidden";
                this.indexflash = 1;
            } else {
                this.timeflash = setTimeout(() => {
                    this.animateflash = requestAnimationFrame(() => this.flash())
                }, 500);
            }
        } else {
            requestAnimationFrame(() => { this.flash() });
        }
    }

    createTitan() {
        if (!pause) {
            this.titan = document.createElement("img");
            if (this.name == nameTitan[0]) {
                this.titan.setAttribute("src", `./aot model/pose/${nameTitan[0]}0.png`);
            } else if (this.name == nameTitan[1]) {
                this.titan.setAttribute("src", `./aot model/pose/${nameTitan[1]}1.png`);
            }
            this.titan.style.width = "5%";
            this.titan.style.height = "280px";
            this.titan.style.bottom = "55px";
            this.titan.style.position = "absolute";
            this.titan.style.right = `0px`;
            this.titan.id = this.id;
            this.titan.classKList = "titan";
            document.body.append(this.titan);
            let test = document.getElementById(this.id);
            let info = test.getBoundingClientRect();
            this.tailles = info.width;
            this.height = info.top;
        } else {
            requestAnimationFrame(() => { this.createTitan() })
        }
    }

    createHPBar() {
        if (!pause) {
            this.hpbarre = document.createElement("div");
            this.hpbarre.classList = "healthbarretitan";
            this.hpbarre.id = this.id;
            this.hptitan = document.createElement("div");
            this.hptitan.classList = "healthtitan";
            this.hptitan.style.width = `${this.lifetitan}%`;
            this.hptitan.id = "health" + this.id;;
            this.hpbarre.appendChild(this.hptitan);
            document.body.append(this.hpbarre);
        } else {
            requestAnimationFrame(() => { this.createHPBar() })
        }
    }

    createpoussiere() {
        //creation poussiere
        if (!pause) {
            let bloods = document.createElement("img");
            bloods.style.position = "absolute";
            bloods.style.left = `0px`;
            bloods.style.bottom = "45px";
            bloods.id = `poussiere${this.id}`;
            bloods.style.visibility = "hidden";
            bloods.style.width = `5%`;
            bloods.setAttribute("src", `./aot model/poussiere/poussiere${this.indexpoussiere++}.png`);
            document.body.append(bloods);
        } else {
            requestAnimationFrame(() => { this.createpoussiere() })
        }
    }
    createimpact() {
        //creation poussiere
        if (!pause) {
            let impact = document.createElement("img");
            impact.style.position = "absolute";
            impact.style.left = `0px`;
            impact.style.bottom = "45px";
            impact.id = `impact${this.id}`;
            impact.style.visibility = "hidden";
            impact.style.width = `5%`;
            impact.setAttribute("src", `./aot model/impact/impact (${this.indeximpact++}).png`);
            document.body.append(impact);
        } else {
            requestAnimationFrame(() => { this.createimpact() })
        }
    }

    hitTitan() {
        if (!pause) {
            this.animationtitan = 450;
            let pre = document.getElementById(`${this.id}`);
            pre.style.height = "280px";
            pre.style.bottom = "55px";
            pre.style.width = "5%";
            let pos;
            let nbrimage;

            if (this.name == nameTitan[0]) {
                pos = `./aot model/hit/hit${this.indexFramehit++}.png`;
                this.titan.setAttribute("src", `${pos}`);
                nbrimage = 5;
            } else if (this.name == nameTitan[1]) {
                pos = `./aot model/hit/cuirasse${this.indexFramehit++}.png`;
                this.titan.setAttribute("src", `${pos}`);
                nbrimage = 4;
            }
            // Logique pour gérer les attaques du titan
            // ...
            //this.indexFramehit++;
            this.timehit = setTimeout(() => {
                this.animatehit = requestAnimationFrame(() => this.hitTitan())
            }, 800);

            if (this.indexFramehit === nbrimage) {
                // Logique après l'animation d'attaque du titan
                // ...
                //bruit de frappe sur le sol
                let hit = document.createElement("audio")
                hit.src = "./rock.mp3";
                hit.currentTime = 2;
                hit.volume = 0.5;
                hit.play();
                //faire l'impact
                this.animateimpact();

                if (((this.deplacementTitan - deplacement >= 0) && (this.deplacementTitan - deplacement <= 50)) || ((this.deplacementTitan - deplacement < 0) && (this.deplacementTitan - deplacement >= -50))) {
                    life -= this.degatTitan
                    let hpmain = document.getElementById("health");
                    hpmain.style.width = life + "%";
                    if (life == 50) {
                        hpmain.style.backgroundColor = "orange";
                    } else if (life == 30) {
                        hpmain.style.backgroundColor = "red";
                    }
                    mainImage = document.querySelector(".main");
                    mainImage.style.bottom = "45px"
                    if (life <= 0) {
                        Endgame();
                    }
                }
                this.indexFramehit = 1;
                clearTimeout(this.timehit);
                cancelAnimationFrame(this.animatehit);
            }
        } else {
            clearTimeout(this.timehit)
            requestAnimationFrame(() => { this.hitTitan() })
        }

    }

    animatepoussierefunc() {
        if (!pause) {
            let poussiere = document.getElementById(`poussiere${this.id}`);
            if (this.indexpoussiere > 12) {
                this.indexpoussiere = 1;
                poussiere.style.visibility = "hidden";
                cancelAnimationFrame(this.animatepoussiere)
            } else {
                poussiere.src = `./aot model/poussiere/poussiere${this.indexpoussiere++}.png`;
                poussiere.style.visibility = "visible";
                poussiere.style.transform = this.position;
                if (this.position == "scaleX(-1)") {
                    poussiere.style.left = `${this.deplacementTitan + this.tailles}px`
                } else {
                    poussiere.style.left = `${this.deplacementTitan}px`
                }
                this.animatepoussiere = requestAnimationFrame(() => this.animatepoussierefunc());
            }
        } else {
            requestAnimationFrame(() => { this.animatepoussierefunc(); })
        }
    }

    animateimpact() {
        if (!pause) {
            let impact = document.getElementById(`impact${this.id}`);
            if (this.indeximpact > 10) {
                this.indeximpact = 1;
                impact.style.visibility = "hidden";
                clearTimeout(this.timeimpact);
                cancelAnimationFrame(this.animateimpactframe);
            } else {
                impact.src = `./aot model/impact/impact (${this.indeximpact++}).png`;
                impact.style.visibility = "visible";
                impact.style.transform = this.position;
                // if (this.position == "scaleX(-1)") {
                //     impact.style.left = `${this.deplacementTitan + this.tailles}px`
                // } else {
                impact.style.left = `${this.deplacementTitan}px`;
                //}
                this.timeimpact = setTimeout(() => {
                    this.animateimpactframe = requestAnimationFrame(() => this.animateimpact());
                }, 500);;
            }
        } else {
            requestAnimationFrame(() => { this.animateimpact(); })
        }
    }

    renderTitan() {
        if (!pause) {
            if (this.lifetitan > 0) {
                if (this.indexFrametitan > ImageTitan) {
                    this.indexFrametitan = 1;
                }
                let pos;
                let actif = false
                if (this.name == nameTitan[0]) {
                    let pre = document.getElementById(`${this.id}`);
                    pre.style.height = "280px";
                    pre.style.bottom = "55px";
                    pre.style.width = "5%";
                    pos = `./aot model/depTitan/dep (${this.indexFrametitan++}).png`;
                    this.titan.setAttribute("src", `${pos}`);
                } else if (this.name == nameTitan[1]) {
                    if (((this.deplacementTitan - deplacement >= 0) && (this.deplacementTitan - deplacement <= 400)) || ((this.deplacementTitan - deplacement < 0) && (this.deplacementTitan - deplacement >= -400))) {
                        let pre = document.getElementById(`${this.id}`);
                        pre.style.height = "400px";
                        pre.style.bottom = "-30px";
                        pre.style.width = "10%";
                        pos = `./aot model/depTitan/cuirasseRun${this.indexFrametitan++}.png`;
                        actif = true;
                    } else {
                        let pre = document.getElementById(`${this.id}`);
                        pre.style.height = "280px";
                        pre.style.bottom = "55px";
                        pre.style.width = "5%";
                        pos = `./aot model/depTitan/cuirasse${this.indexFrametitan++}.png`;
                    }
                    this.titan.setAttribute("src", `${pos}`);
                }

                // Logique pour animer le mouvement du titan
                // ...
                if ((this.deplacementTitan - deplacement >= 0) && (this.deplacementTitan - deplacement <= 500)) {
                    this.titan.style.transform = "scaleX(-1)"
                    this.position = "scaleX(-1)"
                    if ((this.deplacementTitan - deplacement >= 0) && (this.deplacementTitan - deplacement <= 50)) {
                        this.hitTitan();
                    } else {
                        //controle du titan cuirasser
                        if (actif) {
                            this.deplacementTitan -= 15;
                            this.animationtitan = 150;
                            this.animatepoussierefunc();
                            actif = false
                        } else {
                            this.animationtitan = 450;
                            this.deplacementTitan -= 10
                        }
                    }
                } else if ((this.deplacementTitan - deplacement < 0) && (this.deplacementTitan - deplacement >= -500)) {
                    this.titan.style.transform = "scaleX(1)"
                    this.position = "scaleX(1)"
                    if ((this.deplacementTitan - deplacement < 0) && (this.deplacementTitan - deplacement >= -50)) {
                        this.hitTitan();
                    } else {
                        //controle du titan cuirasser
                        if (actif) {
                            this.deplacementTitan += 15;
                            this.animationtitan = 150;
                            this.animatepoussierefunc();
                            actif = false
                        } else {
                            this.animationtitan = 450;
                            this.deplacementTitan += 10
                        }
                    }
                } else {
                    let pre = document.getElementById(`${this.id}`);
                    pre.style.height = "280px";
                    pre.style.bottom = "55px";
                    pre.style.width = "5%";
                    this.titan.style.transform = "scaleX(-1)";
                    this.animationtitan = 450;
                    this.deplacementTitan -= 10;
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
                }, this.animationtitan);
            }
        } else {
            requestAnimationFrame(() => { this.renderTitan(); })
        }
    }
}

// Créer les titan
var createTitanAnimation = null;
const creationtitan = () => {
    if (!pause) {
        if (numberOfTitans == 0) {
            clearTimeout(createTitantimer)
            cancelAnimationFrame(createTitanAnimation)
        } else {
            let titan;
            if (numberOfTitans % 2 == 0) {
                titan = new Titan(numberOfTitans, nameTitan[1]);
            } else {
                titan = new Titan(numberOfTitans, nameTitan[0]);
            }
            titan.deplacementTitan -= 100 * numberOfTitans
            titans.push(titan);
            createTitantimer = setTimeout(() => {
                numberOfTitans--;
                createTitanAnimation = requestAnimationFrame(creationtitan);
            }, 10000);
        }
    } else {
        clearTimeout(createTitantimer)
        requestAnimationFrame(() => { creationtitan(); })
    }
}
const StartGame = () => {
    BackgroundSound();
    GameDuration();
    creationtitan();
    let start = document.getElementsByClassName("block")[0];
    start.style.visibility = "hidden"
    var overlay = document.getElementsByClassName('ombre')[0];
    overlay.style.display = "none"

}
const RestartGame = async () => {
    window.location.reload();
}
const ContinueGame = () => {
    pause = !pause
    var overlay = document.getElementsByClassName('ombre')[0];
    overlay.style.display = "none"
    var block2 = document.getElementsByClassName("block2")[0];
    block2.style.visibility = "hidden"
}
const PauseGame = () => {
    pause = !pause
    var overlay = document.getElementsByClassName('ombre')[0];
    overlay.style.display = "block"
    var block2 = document.getElementsByClassName("block2")[0];
    block2.style.visibility = "visible"
}

//}
//FIN DE JEU

document.addEventListener("keydown", async (event) => { //boutton de direction
    if ((life > 0) && (heure > 0) && (titans.length != 0) && (!pause)) {
        keysPressed[event.key] = true;
        handleKeyPress();
    }
});


document.addEventListener("keydown", async (event) => { //continue
    if (event.key == "C" || event.key == "c") {
        for (let i = 0; i < titans.length; i++) {
            titans[i].renderTitan();
        }
    }
})


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
var authoattack = true
const attack = () => {
    if (!pause) {

        if (authoattack) {
            authoattack = false
            // setTimeout(() => {
            authoattack = true
            // }, 200);
            var air = document.createElement("audio")
            air.src = "./SF-epee-15.mp3";
            air.volume = 0.2;
            air.play();
            direction = "attack"
            renderImage();
        }
    } else {
        air.stop();
        requestAnimationFrame(attack)
    }
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
    if (!pause) {
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
    } else {
        requestAnimationFrame(animateJump)
    }
    // }, 5);
}
//deplacement innerhtml et scroll top and bottom
const jumpAndScroll = () => {
    let perso = document.querySelector(".main");
    perso.style.bottom = `${45 + miniJump}px`; //changer la position du personnage par rapport a la gauche de l'element parent
}

function animateDep() {
    if (!pause) {
        if (deplacement % 10 != 0) {
            clearTimeout(test)
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
            settime = setTimeout(() => {
                timer = requestAnimationFrame(animateDep)
            }, 150);
        } else {
            clearTimeout(settime)
            cancelAnimationFrame(timer)
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
            }, 150);
        }
    } else {
        requestAnimationFrame(animateDep)
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
        if (pause) {
            let block2 = document.getElementsByClassName("block2");
            block2.style = " top: 50%; left: 50%; transform: translate(-50 % , -50 % ) rotate(180 deg);"
        }
    }
    // 
}

const blood = () => {
    if (!pause) {
        if (indexblood > 6) {
            indexblood = 1;
            bloods.style.visibility = "hidden";
            clearTimeout(timeblood);
            cancelAnimationFrame(animateblood);
        } else {
            let mainImage = document.querySelector(".main");
            let info = mainImage.getBoundingClientRect();
            let bloods = document.getElementById("sang");
            bloods.style.visibility = "visible"
            if (direction === "gauche") {
                bloods.style.transform = "scaleX(-1)";
            } else if (direction === "droite") {
                bloods.style.transform = "scaleX(1)";
            }
            bloods.style.left = `${deplacement + 30}px`;
            bloods.style.bottom = info.bottom + "px";
            bloods.setAttribute("src", `./aot model/blood/blood${indexblood++}.png`);
            timeblood = setTimeout(() => {
                animateblood = requestAnimationFrame(blood)
            }, 100);
        }
    } else {
        requestAnimationFrame(blood)
    }
}

const renderImage = async () => {
    if (!pause) {
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
            if (indexFramedeptitan == imageHit.length) {
                for (let i = 0; i < titans.length; i++) {
                    let titan = titans[i];
                    let taille = titan.tailles;
                    let height = titan.height;
                    mainImage = document.querySelector(".main");
                    let maininf = mainImage.getBoundingClientRect();
                    let hauteur = maininf.top;
                    if (((titan.deplacementTitan - deplacement >= 0) && (titan.deplacementTitan - deplacement <= taille) && ((hauteur >= height - 30) && (hauteur <= height + 30))) || ((titan.deplacementTitan - deplacement < 0) && (titan.deplacementTitan - deplacement >= -taille) && ((hauteur >= height - 30) && (hauteur <= height + 30)))) {
                        titan.lifetitan -= degat;
                        blood();
                        let hp = document.getElementById("health" + titan.id);
                        hp.style.width = titan.lifetitan + "%";
                        if (titan.lifetitan <= 0) {
                            if (titan.name == nameTitan[0]) {
                                point += 10;
                            } else if (titan.name == nameTitan[1]) {
                                point += 15;
                            }
                            let pointdiv = document.getElementById("point")
                            pointdiv.textContent = point + "+";
                            pointdiv.style.color = "yellow";
                            pointdiv.style.fontSize = "200%"
                            setTimeout(() => {
                                pointdiv.textContent = point;
                                pointdiv.style.color = "white";
                                pointdiv.style.fontSize = "100%"
                            }, 300);
                            //si le titan n'a plus de vie
                            titan.titan.style.display = "none";
                            titan.titan.style.visibility = "none";
                            titan.hpbarre.style.display = "none";
                            titan.hpbarre.style.visibility = "none";
                            titans.splice(i, 1)
                            console.log("taille : " + titans.length)
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
            saut = setTimeout(() => {
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
            // setTimeout(() => {
            animation = requestAnimationFrame(renderImage);
            // }, 100);
        }
        //  }, 2000);
    } else {
        requestAnimationFrame(renderImage);
        clearTimeout(saut)
    }

    // };
};