const potato = document.getElementById("potato");

// 오디오
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

let popBuffer;
let tadaBuffer;

async function loadSound() {
    // pop
    const popResponse = await fetch("pop.mp3");
    const popArrayBuffer = await popResponse.arrayBuffer();
    popBuffer = await audioContext.decodeAudioData(popArrayBuffer);

    // tada
    const tadaResponse = await fetch("tada1.mp3");
    const tadaArrayBuffer = await tadaResponse.arrayBuffer();
    tadaBuffer = await audioContext.decodeAudioData(tadaArrayBuffer);
}

loadSound();

// 첫 클릭 시 오디오 활성화
document.addEventListener("pointerdown", () => {
    if (audioContext.state === "suspended") {
        audioContext.resume();
    }
}, { once: true });

// 효과음 재생
function playSound(buffer) {
    if (!buffer) return;

    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start(0);
}

let isLocked = false;

// 누를 때
function press() {

    if (isLocked) return;

    potato.classList.add("pressed");

    // 기본 클릭 소리
    playSound(popBuffer);

    const random = Math.random();

    if (random < 0.01) {

        isLocked = true;

        potato.classList.remove("pressed");

        potato.src = "fries.png";

        playSound(tadaBuffer);

        setTimeout(() => {

            potato.src = "potato.png";

            isLocked = false;

        }, 3000);
    }
}

// 뗄 때
function release() {

    if (isLocked) return;

    potato.classList.remove("pressed");
}

potato.addEventListener("pointerdown", press);
potato.addEventListener("pointerup", release);
potato.addEventListener("pointerleave", release);
potato.addEventListener("pointercancel", release);

// 드래그 방지
potato.addEventListener("dragstart", e => e.preventDefault());
potato.addEventListener("contextmenu", e => e.preventDefault());
