document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("videoInput");
    const video = document.getElementById("videoPlayer");
    const source = document.getElementById("videoSource");
    const start_btn = document.getElementById("videoStart")
    const timeElement = document.getElementById("timeDisplay")
    const captureBtn = document.getElementById("captureFrame")
    const transcripts  = document.getElementById("transcripts")
    let url = null;

    input.addEventListener("change", e => {
        const file = input.files[0];
        if (file) {
            url = URL.createObjectURL(file);
            source.src = url;
            video.load();
            video.play();
            if(video.play){
                start_btn.textContent = "Pause a video";
            }
            console.log(url);
        }
    });


    start_btn.addEventListener("click", () =>{
        if(video.paused){
            video.play();
            start_btn.textContent = "Pause a video";
        }else{
            video.pause();
            start_btn.textContent = "Play a video";
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
    const img = document.getElementById("frameImg")

    captureBtn.addEventListener("click", async() => {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(async (blob) => {

            const video_file = input.files[0];
            const timestamp = video.currentTime;

            const formData = new FormData();
            formData.append("video_file", video_file);
            formData.append("timestamp", timestamp);

            const response = await fetch("/capture_frame", {
                            method: "POST",
                            body: formData,
            }).then(response => response.json())
                .then(data => {
                    console.log(data.text);
                    document.getElementById("transcripts").innerText = data.text;
                })
            // const result = await response.json();
            // console.log(result);
        });
    });


    const saveFileBtn = document.getElementById("saveFile");
    saveFileBtn.addEventListener("click", async() => {

        const transcripts = document.getElementById("transcripts");
        const formData = new FormData();
        formData.append("text", transcripts.innerText);
        console.log(formData);

        const response = await fetch("/save_file", {
            method: "POST",
            body: formData,
        })
    });


}); // end DOM


