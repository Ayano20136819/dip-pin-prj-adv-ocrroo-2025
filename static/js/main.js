
const input = document.getElementById("videoInput");
const video = document.getElementById("videoPlayer");
const source = document.getElementById("videoSource");
const start_btn = document.getElementById("videoStart")
const current_time = document.getElementById("")

input.addEventListener("change", e => {
    const file = input.files[0];
    if (file) {
        const url = URL.createObjectURL(file);
        source.src = url;
        video.load();
        video.play();
        start_btn.textContent = "Pause a video"
    }
});

start_btn.addEventListener("click", () =>{
    if(video.play){
        video.pause();
        start_btn.textContent = "Play a video"
    }else if (video.pause){
        video.play();
        start_btn.textContent = "Pause a video"
    }

});