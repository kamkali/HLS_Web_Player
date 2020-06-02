let videoSrc;
const hls = new Hls();

const setQuality = level => {
    let setLevel = level;
    hls.currentLevel = setLevel;
    if (setLevel === -1)
        setLevel = "auto";
    document.getElementById("current-level").innerHTML = `<p>Current level: ${setLevel}</p>`;
}

const loadAndPlayVideo = videoSrc => {
    if (Hls.isSupported()) {
        hls.loadSource(videoSrc);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
            video.play();
            setQuality(-1);
        });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = videoSrc;
        video.addEventListener('loadedmetadata', () => {
            video.play();
        });
    }
};

const urlParams = new URLSearchParams(window.location.search);
videoSelect = urlParams.get('video-select');

switch (videoSelect) {
    case "1":
        videoSrc = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";
        break;
    case "2":
        videoSrc = 'https://mnmedias.api.telequebec.tv/m3u8/29880.m3u8';
        break;
    case "3":
        videoSrc = "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8";
        break;
    default:
        videoSrc = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";
        break;
}

const video = document.getElementById('video');

document.getElementById('submit-button').addEventListener('click', e => {
    videoSrc = document.getElementById('url-input').value;
    loadAndPlayVideo(videoSrc);
});


document.getElementById('btn-1').addEventListener('click', e => setQuality(-1));

document.getElementById('btn0').addEventListener('click', e => setQuality(0));

document.getElementById('btn1').addEventListener('click', e => setQuality(1));

document.getElementById('btn2').addEventListener('click', e => setQuality(2));

document.getElementById('btn3').addEventListener('click', e => setQuality(3));

document.getElementById('btn4').addEventListener('click', e => setQuality(4));

loadAndPlayVideo(videoSrc);
