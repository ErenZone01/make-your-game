var deplacement = 0;;
var animation;
var direction;
var fond = document.querySelector(".background");
var imageDeplacement = ["adventurer-run-00.png", "adventurer-run-01.png", "adventurer-run-02.png", "adventurer-run-03.png", "adventurer-idle-01.png"]


document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") {
        alert("haut");
    } else if (event.key === "ArrowDown") {
        alert("bas");
    } else if (event.key === "ArrowLeft") {
        direction = "gauche"
        renderImage()
        if (deplacement != 0) {
            deplacement -= 10
            moveAndScroll(deplacement)
        }
    } else if (event.key === "ArrowRight") {
        direction = "droite"
        renderImage()
        if (deplacement < fond.clientWidth - 150) {
            deplacement += 10;
            moveAndScroll(deplacement)
        }
    }
});

window.addEventListener("beforeunload", (event) => { //a chaque rechargement de la page ramaner le scroll a 0
    window.scrollTo(0, 0);
})

//deplacement innerhtml et scroll
const moveAndScroll = () => {
    let perso = document.querySelector(".main");
    perso.style.left = `${deplacement}px`; //changer la position du personnage par rapport a la gauche de l'element parent
    if (deplacement >= 50) { //deplacement: position actuel du personnage, si il est > 50 scroll de 500 NB:j'ai tiré des nombres au hasard
        window.scrollTo(deplacement - 500, 0)
    }
    // 
}
let indexFrame = 0;

const renderImage = () => {
    //eviter de depasser l'index de la taille du tableau d'image
    if (indexFrame == imageDeplacement.length) {
        indexFrame = 0;
    }
    let mainImage = document.querySelector(".main"); //selectionner l'image du personnage principale
    mainImage.onload = () => { //si l'image est charger execute les instructions ci dessous
        if (direction == "gauche") {
            mainImage.style.transform = "scaleX(-1)" //tourner a gauche
        } else if (direction == "droite") {
            mainImage.style.transform = "scaleX(1)" //tourner a droite
        }
        //let timeout = setTimeout(() => {
        if (indexFrame >= imageDeplacement.length) {
            cancelAnimationFrame(animation)
            animation = null
                //clearTimeout(timeout)
        } else {
            animation = requestAnimationFrame(renderImage); //executer les images chaque 250 milliseconde pour avoir un meilleur rendu
        }
        //}, 10);;
    };
    let pos = imageDeplacement[indexFrame];
    indexFrame++;
    mainImage.setAttribute("src", `./asset/Adventurer-1.5/Individual Sprites/${pos}`); //changer la source de l'image et faire apparaitre la nouvelle image
}