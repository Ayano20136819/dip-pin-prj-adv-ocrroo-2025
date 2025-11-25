document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("videoInput");
    const video = document.getElementById("videoPlayer");
    const source = document.getElementById("videoSource");
    //const start_btn = document.getElementById("videoStart")
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
            console.log(url);
        }
    });

    timeElement.addEventListener("keydown", e => {
        if(e.key === "Enter") {
            const value = timeElement.value;
             const [mm, ss] = value.split(":").map(Number);
            const seconds = mm * 60 + ss;

        if (!isNaN(seconds)) {
            video.currentTime = seconds;
        }
        }
    })


    // start_btn.addEventListener("click", () =>{
    //     if(video.paused){
    //         video.play();
    //         start_btn.textContent = "Pause a video";
    //     }else{
    //         video.pause();
    //         start_btn.textContent = "Play a video";
    //     }
    //
    // });

    video.ontimeupdate = function(){
        const currentTime = video.currentTime;
        const minutes = Math.floor(currentTime / 60);
        const seconds = Math.floor(currentTime % 60);
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds
        // console.log(currentTime)
        timeElement.value = `${formattedMinutes}:${formattedSeconds}`;
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
        console.log("Save code to sample_code file");
    });

    // const bookmarkBtn = document.getElementById("createBookmark");
    // bookmarkBtn.addEventListener("click", ()=>{
    //     browser.bookmark.create();
    //    console.log("Added to a bookmark");
    // });

    const inputNameArea = document.getElementById("inputNameArea");
    const inputName = document.getElementById("inputName");
    const nameBtn = document.getElementById("saveName");
    const pageTitle = document.getElementById("pageTitle");
    const alert = document.getElementById("alert");

    nameBtn.addEventListener("click", ()=>{
        name = inputName.value;
        if (validateName(name)){
            pageTitle.textContent = `Welcome to OCRROO ${name}` ;
            inputNameArea.style.display = 'none';
            alert.style.display = 'none';
        }

        alert.textContent = "Please enter a validate name";

    });

    function validateName(name){
        var namePatten = /^[a-zA-Z\s-]+$/;
        if(!namePatten.test(name)){
            return false
        }
        return true
    }


}); // end DOM


