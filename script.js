const potato = document.getElementById("potato");

const tadaSound = new Audio("tada.mp3");

let isFries = false;
let isLocked = false;


// 감자 누르기
function clickPotato() {

    // 감튀 상태거나 변신 중이면 클릭 무시
    if (isLocked) return;

    potato.classList.add("pressed");


    const random = Math.random();


    // 1% 확률
    if (random < 0.01) {

        isLocked = true;
        isFries = true;


        // 감튀로 변경
        potato.src = "fries.png";


        // 효과음
        tadaSound.currentTime = 0;
        tadaSound.play();


        // 3초 후 다시 감자
        setTimeout(() => {

            potato.src = "potato.png";

            isFries = false;
            isLocked = false;

        }, 3000);
    }
}


// 손 뗌
function releasePotato() {
    potato.classList.remove("pressed");
}

document.addEventListener("pointerdown", () => {
    tadaSound.load();
}, { once: true });

potato.addEventListener("pointerdown", clickPotato);
potato.addEventListener("pointerup", releasePotato);
potato.addEventListener("pointerleave", releasePotato);
potato.addEventListener("pointercancel", releasePotato);

document.addEventListener("touchmove", function (e) {
    e.preventDefault();
}, { passive: false });