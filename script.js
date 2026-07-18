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


function releasePotato() {
    potato.classList.remove("pressed");
}


potato.addEventListener("pointerdown", clickPotato);
potato.addEventListener("pointerup", releasePotato);
potato.addEventListener("pointerleave", releasePotato);
potato.addEventListener("pointercancel", releasePotato);
