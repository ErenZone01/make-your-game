document.addEventListener("keydown", (event) => {
    var perso = document.getElementsByClassName("main")[0]
    if (event.key === "ArrowUp") {
        alert("haut");
    }else if (event.key === "ArrowDown"){
        alert("bas");
    }else if (event.key === "ArrowLeft"){
        perso.style.left = "";
    }else if (event.key === "ArrowRight"){
        alert("right");
    }
});