# Cheatsheets Python Project

## Live Site
[Cheatsheets](https://cheatsheets-group-project.herokuapp.com/) was inspired by [instructables](https://www.instructables.com/) which is a platform for creating step-by-step instructions on how to create things.

## Technologies Used
Javascript | Python | Node.js | Flask | React | Redux | SQLAlchemy | PostgreSQL | AWS

## Getting started

1. Clone this repository (main branch)

   ```bash
   git clone https://github.com/mdepree5/cheatsheets.git
   ```

2. Install backend dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```


3. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file
   ```
   psql -c "CREATE USER <username> WITH PASSWORD '<password>' CREATEDB"
   psql -c "CREATE DATABASE <databasename> WITH OWNER '<username>'"
   ```

4. Create a **.env** file based on the example with proper settings for your
   development environment

5. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. Install frontend dependencies in react-app directory
   ```
   cd ./react-app
   npm install
   ```

7. To run the React App in development run ```npm start``` from ```react-app``` directory
   ```
   cd ./react-app
   npm start
   ```

# Cheatsheets quick overview

## splashpage/Login page
Users can either create a new user, login as existing user, or login with a demo user.
![Login Page](./images/login.PNG)

## Homepage
Homepage features an explore cheatsheets section at the bottom. Logged in users will also have access to publishing a cheatsheet, and searching a title.
![Homepage](./images/homepage.PNG)

Create a new cheatsheet via publish button which will open a modal and redirect them to the new cheatsheet page created. Uploading images with AWS is available
![Publish](./images/publish_modal.PNG)

The user who owns the cheatsheet has access to create, read, edit, and delete functions for the cheatsheet steps, and comments
![editCheatSheet](./images/edit_modal.PNG)
![addStep](./images/addstep_modal.PNG)
![Comments](./images/comments.PNG)

The search function will search and filter by title of cheatsheets.
![search](./images/search.PNG)
