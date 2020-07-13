# Passport base project

## Overview

This app is for user registration and login. The app has two microservices. A server which has the backend and serves frontend views, and a database which store the user information.

It uses [Node.js](https://nodejs.org/en/), [Express](https://expressjs.com/), [Passport](http://www.passportjs.org/), [Mongoose](https://mongoosejs.com/), [EJS](https://ejs.co/), [bcrypt](https://www.npmjs.com/package/bcrypt) and [Sessions](https://github.com/expressjs/session) on server, and the database uses [MongoDB](https://www.mongodb.com/). The microservices run in [Docker](https://www.docker.com/) containers that are spun up with [docker-compose](https://docs.docker.com/compose/).


## Usage

Depencencies are listed in `package.json`. Install these with

    npm install

Start the app with

    docker-compose up

Then open the browser in `localhost:5000` to see the app.

The server will hot reload if changes are made to the code.

Environment variables are in a `.env` file at the root of the project. These are loaded by docker-compose when the project starts.


## App views

The app has the following views:

- `welcome` is the front page and links to the registration page and the login page
- `register` is for new users to register their name, email and password
- `login` is for the login of registered users
- `dashboard` is the view once a user has logged in
- `layout` is a general layout view, and all other layouts are visible within it


## Passport authentication

[Passport](http://passportjs.org/) is used for authentication, and [`passport-local`](https://www.npmjs.com/package/passport-local) to enable local authentication.

In `index.js` the `ensureAuthenticated` callback to `config/auth.js` ensures that only authenticated users are able to view the dashboard

    router.get('/dashboard', ensureAuthenticated, (request, response) =>

[Router documentation](https://expressjs.com/en/api.html#router)


## Docker usage

Start the containers with

    docker-compose up

Shut down the containers:

    docker-compose down

Delete docker images:

    docker image prune

Delete all container volumes

    docker system prune -a --volumes

## Models

The models that make up the database schema are in `models` folders. These are used by Mongoose to store user data into the Mongo database. In the database, the name of the data containing collection is the [pluralized name of the model](https://mongoosejs.com/docs/guide.html#collection).

## Database

The app uses MongoDB to store user data.

## Interacting with the database container

Log into the database container with

    docker exec -it mongo bash

Inside the container, launch the mongo shell client

    mongo

List the databases

    show dbs

Select the database to use

    use <databasename>

Show collections in the database

    show collections

Show collection data

    db.<collectionname>.find()

Remove all entries in collection

    db.<collectionname>.remove({})

Remove all entries in collection with [hyphenated name](https://stackoverflow.com/questions/24711939/mongodb-collection-hyphenated-name)

    db['<collectionname>'].remove({})
    // or
    db.getCollection('<collectionname>').remove({})

Quit the database shell

    quit()


## Todo

- move frontend functionality to its own microservice

## Credits

Based on this [passport authentication tutorial](https://www.youtube.com/watch?v=6FOq4cUdH8k).