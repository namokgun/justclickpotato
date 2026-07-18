const potato = document.getElementById("potato");

const popSound = new Audio("pop.mp3");
const tada = new Audio("tada1.mp3");

let isFries = false;

function clickPotato() {

    if (isFries) return;

    popSound.currentTime = 0;
    popSound.play();


    const random = Math.random();

    if (random < 0.01) {

        potato.src = "fries.png";

        isFries = true;

        tada.currentTime = 0;
        tada.play();
    }
}


potato.addEventListener("pointerdown", clickPotato);