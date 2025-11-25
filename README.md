# Overview

Include a brief overview of the project, include:

- How do you deploy and run the project?
- What are its core dependencies?
- Who is it for and why?

This application for visual impaired student who want to study programming through tutorial video.


### Getting started

#### Create virtual environment
```bash
python -m venv .venv
source .venv/Scripts/activate 
```

#### Install dependencies
```bash
pip install pyproject-toml
```

#### Install TailwindCSS
https://tailwindcss.com/docs/installation/tailwind-cli


#### Core dependencies

> opencv-python  
> OpenCV (Open Source Computer Vision Library) is an open-source computer vision and machine learning library.  
> https://pypi.org/project/opencv-python/ 

> pytesseract  
> Python-tesseract is an optical character recognition (OCR) tool for python. It will recognize and “read” the text embedded in images  
> https://pypi.org/project/pytesseract/

> pillow:   
> The Python Imaging Library adds image processing capabilities to your Python interpreter.  
> https://pypi.org/project/pillow/

> fastapi
> FastAPI is a modern, fast (high-performance), web framework for building APIs with Python  
> https://fastapi.tiangolo.com/
> 

> TailwindCSS  
> A utility-first CSS framework packed with classes like flex, pt-4, text-center and 
> rotate-90 that can be composed to build any design, directly in your markup.  
> https://tailwindcss.com/


#### Test run
```bash
uvicorn main:app --reload --host 127.0.0.1 --port 8000
or 
npx npm-run-all --parallel dev:*  

```

![homepage.png](resources%2Fhomepage.png)



  