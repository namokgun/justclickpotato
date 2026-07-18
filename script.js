const potato = document.getElementById("potato");

// 오디오
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

let popBuffer;

async function loadSound() {
    const response = await fetch("tada.mp3");
    const arrayBuffer = await response.arrayBuffer();
    popBuffer = await audioContext.decodeAudioData(arrayBuffer);
}

loadSound();

// 첫 터치 시 오디오 활성화 (모바일 대응)
document.addEventListener("pointerdown", () => {
    if (audioContext.state === "suspended") {
        audioContext.resume();
    }
}, { once: true });

// 효과음 재생
function playSound() {
    if (!popBuffer) return;

    const source = audioContext.createBufferSource();
    source.buffer = popBuffer;
    source.connect(audioContext.destination);
    source.start(0);
}

// ------------------------

let isLocked = false;

// 누를 때
function press() {

    if (isLocked) return;

    potato.classList.add("pressed");

    const random = Math.random();

    // 1% 확률
    if (random < 0.01) {

        isLocked = true;

        potato.src = "fries.png";

        playSound();

        setTimeout(() => {

            potato.src = "potato.png";

            isLocked = false;

        }, 3000);
    }
}

// 뗄 때
function release() {
    potato.classList.remove("pressed");
}

// 이벤트
potato.addEventListener("pointerdown", press);
potato.addEventListener("pointerup", release);
potato.addEventListener("pointerleave", release);
potato.addEventListener("pointercancel", release);

// 드래그 및 우클릭 방지
potato.addEventListener("dragstart", e => e.preventDefault());
potato.addEventListener("contextmenu", e => e.preventDefault());
