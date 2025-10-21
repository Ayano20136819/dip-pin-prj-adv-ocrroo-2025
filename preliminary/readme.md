# Overview
This section contains preliminary familiarisation steps with the core libraries of the project. It is also designed to complement (and satisfy) the performance requirements of the preliminary assessment.

## Required performance demonstration

You must demonstrate your ability at:

- Determining an organisation’s technology, development tools, and UI platform
- Enabling interprocess communication in Python while using third-party libraries and referencing third-party documentation


## Instructions

1. Complete the knowledge section (Word document) available via Blackboard
2. Fork this repository
3. Clone the repository to your local computer
4. Install `uv` and check that it is running with `uv --version`
5. Obtain a video that can be used to test the functionality and place in the `resources/` folder - your instructor will provide you with one
6. Follow the steps in the remainder of the guide insuring your commit to git whenever prompted
7. Submit a `zip` of this repository along with the `.git` folder. **Do not include your `venv/`**. Ensure your submission includes the assessment Word document with all of the questions in it attempted.


## Steps
Complete the steps below and fill in the `> block` sections
> If you see a section like this, fill it in!

### OpenCV Installing and running

1. Examine the `pyproject.toml` what dependencies does it currently identify?
>
>
2. Create a `.venv` in this folder using `uv venv`
3. Activate the `venv` as instructed by `uv`
4. In order to complete the project, we need to install OpenCV. Fill in the following:
  - What role does OpenCV have in this project?
  >
  - What is the `uv pip` command to install OpenCV?
  > `uv pip install ????`
  - What is the URL of this library's git repo?
  > [Insert URL Here](https://github.com/opencv/????-?????)
5. Add OpenCV to your project using the `uv add` command:
  > `uv add name-of-open-cv-library

6. Have the dependencies in the `pyproject.toml` changed? If so, how?
  >
  >
7. Why did we use `uv add` over `uv pip`?
  >
  >
8. The `numpy` library is required for OpenCV. Should you add an explicit requirement for it? Why/Why not?
  >
  >
9. Commit the changes so far to git. Use the message `chore: add OpenCV dependency`
10. Go to `preliminary/open_cv_basics.py` and complete the required functionality.
> **Note**: You may have already completed all of the work required during in class activities so you can copy/paste it in
11. Commit your changes with `feat: save video frames`
