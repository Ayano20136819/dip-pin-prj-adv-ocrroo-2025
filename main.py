"""Provides a simple API for your basic OCR client

Drive the API to complete "interprocess communication"

Requirements
"""
import io
import os.path

import pytesseract
from PIL import Image
from fastapi import FastAPI, HTTPException, Request, File, UploadFile, Form
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi import Response
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles
from video import CodingVideo
from preliminary.library_basics import CodingVideo
from pathlib import Path
import shutil

app = FastAPI(title="OCRROO")

BASE_PATH = Path(__file__).parent
print(BASE_PATH)
UPLOAD_PATH = BASE_PATH / "uploads"
os.makedirs(UPLOAD_PATH, exist_ok=True)

app.mount("/static",
          StaticFiles(directory="static"),
          name="static")

app.mount("/css",
          StaticFiles(directory="static/css"),
          name="css")
app.mount("/js",
          StaticFiles(directory="static/js"),
          name="js")

app.mount("/uploads", StaticFiles(directory=UPLOAD_PATH), name="uploads")


templates = Jinja2Templates(directory="templates")



@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse(
        request = request,
        name="pages/home.html",
    )


@app.post("/capture_frame")
async def capture_frame(video_file: UploadFile = File(...), timestamp: float = Form(...)):
    try:

        temp_path = Path("uploads") / video_file.filename
        with open(temp_path, "wb") as buffer:
            shutil.copyfileobj(video_file.file, buffer)

        video = CodingVideo(temp_path)

        output_filename = f"frame_{int(timestamp * 1000)}ms.png"
        output_path = Path(UPLOAD_PATH / output_filename)

        video.save_as_image(seconds=int(timestamp), output_path=str(output_path))
        file_url = f"/uploads/{output_filename}"

        return {"message": "Success", "file_url": file_url}

    except Exception as e:
        return JSONResponse({"message": "Error", "error": str(e)}, status_code=400)

# We'll create a lightweight "database" for our videos
# You can add uploads later (not required for assessment)
# For now, we will just hardcode are samples
# demo -> video ID, Path -> file path
VIDEOS: dict[str, Path] = {
    "demo": BASE_PATH / "resources" / "oop.mp4"
}

class VideoMetaData(BaseModel):
    fps: float
    frame_count: int
    duration_seconds: float
    _links: dict | None = None

@app.get("/video")
def list_videos():
    """List all available videos with HATEOAS-style links."""
    return {
        "count": len(VIDEOS),
        "videos": [
            {
                "id": vid,
                "path": str(path), # Not standard for debug only
                "_links": {
                    "self": f"/video/{vid}",
                    "frame_example": f"/video/{vid}/frame/1.0"
                }
            }
            for vid, path in VIDEOS.items()
        ]
    }

def _open_vid_or_404(vid: str) -> CodingVideo:
    path = VIDEOS.get(vid)
    if not path or not path.is_file():
        raise HTTPException(status_code=404, detail="Video not found")
    try:
        return CodingVideo(path)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=f"Could not open video {e}")

def _meta(video: CodingVideo) -> VideoMetaData:
    return VideoMetaData(
            fps=video.fps,
            frame_count=video.frame_count,
            duration_seconds=video.duration
    )






@app.get("/video/{vid}", response_model=VideoMetaData)
def video(vid: str):
    video = _open_vid_or_404(vid)
    try:
            meta = _meta(video)
            meta._links = {
                "self": f"/video/{vid}",
                "frames": f"/video/{vid}/frame/{{seconds}}"
            }
            return meta
    finally:
        video.capture.release()


@app.get("/video/{vid}/frame/{t}", response_class=Response)
def video_frame(vid: str, t: float):
    try:
        video = _open_vid_or_404(vid)
        return Response(content=video.get_image_as_bytes(t), media_type="image/png")
    finally:
        video.capture.release()


# TODO: add enpoint to get ocr e.g. /video/{vid}/frame/{t}/ocr
@app.get("/video/{vid}/frame/{t}/ocr", response_class=Response)
def ocr(vid: str, t: float):
    video = _open_vid_or_404(vid)
    try:
        img_bytes = video.get_image_as_bytes(t)
        img = Image.open(io.BytesIO(img_bytes))
        text = pytesseract.image_to_string(img)
        return text
    finally:
        video.capture.release()