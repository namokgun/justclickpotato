const potato = document.getElementById("potato");

const tadaSound = new Audio("tada.mp3");

let isFries = false;


// 클릭
function clickPotato() {

    potato.classList.add("pressed");

    if (isFries) return;

    const random = Math.random();

    if (random < 0.01) {

        potato.src = "fries.png";
        isFries = true;

        tadaSound.currentTime = 0;
        tadaSound.play();
    }
}


// 뗄 때
function releasePotato() {
    potato.classList.remove("pressed");
}


potato.addEventListener("pointerdown", clickPotato);
potato.addEventListener("pointerup", releasePotato);
potato.addEventListener("pointerleave", releasePotato);
potato.addEventListener("pointercancel", releasePotato);
