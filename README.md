![Markdown logo](base/static/images/logoV1.gif)

<div align="center">
 
![GitHub repo size](https://img.shields.io/github/repo-size/Shania-star/quizzProject?color=9cf)
![GitHub repo file count (file type)](https://img.shields.io/github/directory-file-count/Shania-star/quizzProject?color=blueviolet)
 
</div>

# About the app
This is an app that allows you to create your own quizz by category and lets you know how you scored. 

The scoring system is already included(each question counts 1 point and upon choosing the wrong answer, the user loses 0.4 point). Thus, all you need to do is create the category with the related questions.

You first need to create an account in order to use it.

# Features
## **Current features**
* Registration
  * Log in / log out
  * Sign up

* Category / Question
  * Add
  * Edit 
  * Delete

* Question 
  * Add as many options as you want

## **Upcoming features**
* Edit user profile
* Add list of results ordered by date
* Add exam mode (Timer, the correct and wrong answers will only be shown in the end)
* Send feedback
* Make the interface costumizable

# Installation
To run this application, you need to create a python virtual environment and install the packages in the requirements.txt file.
Make sure to get the latest version of django and python as well.
I used PostgreSQL for this project, you may have to edit the database information in the settings.py file for it to match your own local PostgreSQL instance.
```
# Clone this repository
$ git clone https://github.com/Shania-star/quizzProject.git

# Install the requirements
$ pip install -r requirements.txt

# Run migrations
$ python manage.py makemigrations
$ python manage.py migrate

# Create superuser
$ python manage.py createsuperuser

# Run the app
$ python manage.py runserver

``` 
# Demo

Here's a demo of the app -> [FLASH QUIZ](https://drive.google.com/file/d/1sm-bjXCt6Dq8JzSdBZPivUMGzC7qVeOO/view?usp=sharing)

# Credits
The emoji rain in the result template was taken from here -> [EMOJI RAIN](https://codepen.io/robertheiser/pen/NXrqXa)

