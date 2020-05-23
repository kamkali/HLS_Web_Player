let videoSrc = null;

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
        videoSrc = "https://stream.mux.com/psrJfK9VmRWg5KORgYpcsd8mvvbIDWbH01JZRdsK9sKY.m3u8";
        break;
    default:
        videoSrc = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";
        break;
}

// document.getElementById('submit-button').addEventListener('click', e => {
//     videoSrc = document.getElementById('url-input').value;
// });

const video = document.getElementById('video');
if (Hls.isSupported()) {
    const hls = new Hls();
    hls.loadSource(videoSrc);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
    });
} else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = videoSrc;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    });
}