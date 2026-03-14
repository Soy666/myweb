const bgMusic = document.getElementById('bg-music');
const musicBtn = document.getElementById('musicBtn');
const titleContainer = document.getElementById('titleContainer');
const videoBg = document.querySelector('video');
const homeBtn = document.getElementById('homeBtn');
const startBtn = document.getElementById('startBtn');

let isMusicPlaying = false;
let isAudioLoaded = false;

function ensureVideoPlaying() {
    if (videoBg.paused) {
        videoBg.play().catch(err => {
            console.log('恢复视频播放:', err);
        });
    }
}

async function initAudio() {
    if (isAudioLoaded) return;
    try {
        await bgMusic.load();
        isAudioLoaded = true;
        console.log('音频初始化完成');
    } catch (err) {
        console.log('音频初始化失败:', err);
    }
}

musicBtn.addEventListener('click', async () => {
    if (isMusicPlaying) {
        bgMusic.pause();
        isMusicPlaying = false;
        musicBtn.textContent = "播放音乐";
    } else {
        await initAudio();
        bgMusic.play().then(() => {
            isMusicPlaying = true;
            musicBtn.textContent = "暂停音乐";
            ensureVideoPlaying();
        }).catch(() => {
            alert("请先点击页面空白处解锁音频");
            ensureVideoPlaying();
        });
    }
    ensureVideoPlaying();
});

homeBtn.addEventListener('click', () => {
    ensureVideoPlaying();
    titleContainer.style.display = 'block';
});

startBtn.addEventListener('click', () => {
    window.location.href = './aboutme.html';
});

videoBg.addEventListener('pause', () => {
    setTimeout(ensureVideoPlaying, 100);
});

setInterval(ensureVideoPlaying, 1000);

window.addEventListener('load', () => {
    titleContainer.style.display = 'block';
    videoBg.playbackRate = 0.75;
    initAudio();
});

document.addEventListener('DOMContentLoaded', () => {
    videoBg.load();
});