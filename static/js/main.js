
const input = document.getElementById("videoInput");
const video = document.getElementById("videoPlayer");
const source = document.getElementById("videoSource");
const start_btn = document.getElementById("videoStart")
const timeElement = document.getElementById("timeDisplay")
const captureBtn = document.getElementById("captureFrame")
let url = null;

input.addEventListener("change", e => {
    const file = input.files[0];
    if (file) {
        url = URL.createObjectURL(file);
        source.src = url;
        video.load();
        video.play();
        start_btn.textContent = "Pause a video"
        console.log(url);
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

video.ontimeupdate = function(){
    const currentTime = video.currentTime;
    const minutes = Math.floor(currentTime / 60);
    const seconds = Math.floor(currentTime % 60);
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds
    // console.log(currentTime)
    timeElement.textContent = `${minutes}:${formattedSeconds}`;
};


const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
const metadataInfo = document.querySelector("#metadata-info");
captureBtn.addEventListener("click", function (){
    const updateCanvas = function (now) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const metadata = {
            width: video.videoWidth,
            height: video.videoHeight,
            duration: video.duration,
            currentTime: video.currentTime
        };
        metadataInfo.innerText = JSON.stringify(metadata, null, 2);

        canvas.toBlob((blob) => {
            const formData = new FormData();
            formData.append("file", blob, "frame.png");

            // upload to FastAPI
            fetch("/upload_frame", {
                method: "post",
                body: formData
            })
        }, "img/png");

        video.requestVideoFrameCallback(updateCanvas)
    }

    video.requestVideoFrameCallback(updateCanvas)

});


