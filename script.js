const potato = document.getElementById("potato");

const audioContext = new (window.AudioContext || window.webkitAudioContext)();

let popBuffer;
let tadaBuffer;

let isFries = false;
let isLocked = false;


// 효과음 불러오기
async function loadSound() {
    const [popResponse, tadaResponse] = await Promise.all([
        fetch("pop.mp3"),
        fetch("tada1.mp3")
    ]);

    const popArrayBuffer = await popResponse.arrayBuffer();
    const tadaArrayBuffer = await tadaResponse.arrayBuffer();

    popBuffer = await audioContext.decodeAudioData(popArrayBuffer);
    tadaBuffer = await audioContext.decodeAudioData(tadaArrayBuffer);
}

loadSound();


// 첫 터치 시 오디오 활성화
document.addEventListener("pointerdown", async () => {
    if (audioContext.state === "suspended") {
        await audioContext.resume();
    }
}, { once: true });


// pop 효과음 재생
function playPopSound() {
    if (!popBuffer) return;

    const source = audioContext.createBufferSource();
    source.buffer = popBuffer;
    source.connect(audioContext.destination);
    source.start();
}


// tada 효과음 재생
function playTadaSound() {
    if (!tadaBuffer) return;

    const source = audioContext.createBufferSource();
    source.buffer = tadaBuffer;
    source.connect(audioContext.destination);
    source.start();
}


// 감자 누르기
function press(e) {
    e.preventDefault();

    // 감튀 상태거나 변신 중이면 클릭 무시
    if (isLocked) return;

    potato.classList.add("pressed");

    // 기본 효과음
    playPopSound();

    const random = Math.random();


    // 1% 확률
    if (random < 0.01) {

        isLocked = true;
        isFries = true;

        potato.classList.remove("pressed");

        // 감튀로 변경
        potato.src = "fries.png";

        // 당첨 효과음
        playTadaSound();


        // 3초 후 다시 감자
        setTimeout(() => {

            potato.src = "potato.png";

            isFries = false;
            isLocked = false;

        }, 3000);
    }
}


// 손 뗄 때
function release(e) {
    e.preventDefault();

    if (isFries) return;

    potato.classList.remove("pressed");
}


// 이벤트 등록
potato.addEventListener("pointerdown", press);
potato.addEventListener("pointerup", release);
potato.addEventListener("pointerleave", release);
potato.addEventListener("pointercancel", release);


// 드래그, 우클릭 방지
potato.addEventListener("dragstart", e => e.preventDefault());
potato.addEventListener("contextmenu", e => e.preventDefault());


// 화면 스크롤 방지
document.addEventListener("touchmove", e => {
    e.preventDefault();
}, { passive: false });


// iPhone 제스처(핀치 줌) 방지
document.addEventListener("gesturestart", e => e.preventDefault());
document.addEventListener("gesturechange", e => e.preventDefault());
document.addEventListener("gestureend", e => e.preventDefault());
