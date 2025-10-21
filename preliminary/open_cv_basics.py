"""A basic introduction to Open CV

Instructions
------------

Implement the functions below based on their docstrings.

Notice some docstrings include references to third-party documentation
Some docstrings **require** you to add references to third-party documentation.

Make sure you read the docstrings C.A.R.E.F.U.L.Y (yes, I took the L to check that you are awake!)
"""

# imports - add all required imports here
from pathlib import Path

VID_PATH = Path("resources/name-of-vid-given-to-you-by-instructor.mp4")

def display_metadata(video: Path | str) -> None:
    """Displays key metadata from the video

    Specifically, the following information is shown:
        FPS - Number of frames per second rounded to two decimal points
        FRAME COUNT - The total number of frames in the video
        DURATION (minutes) - Calculated total duration of the video given FPS and FRAME COUNT

    Reference
   ----------
   https://docs.opencv.org/3.4/d4/d15/group__videoio__flags__base.html#gaeb8dd9c89c10a5c63c139bf7c4f5704d
    """
