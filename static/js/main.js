
const input = document.getElementById("videoInput");
const video = document.getElementById("videoPlayer");
const source = document.getElementById("videoSource");

input.addEventListener("change", e => {
    const file = input.files[0];
    if (file) {
        const url = URL.createObjectURL(file);
        source.src = url;
        video.load();
        video.play();
    }
});