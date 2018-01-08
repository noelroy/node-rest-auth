# REST API with Express, Mongoose and Passport

A simple rest api made with express. Mongodb database is used with mongoose driver. Passport is used for authentication.

## Getting Started

To get the Node server running locally:

- Clone this repo
- `npm install` to install all required dependencies
- Install MongoDB Community Edition ([instructions](https://docs.mongodb.com/manual/installation/#tutorials)) and run it by executing `mongod`
- `npm run startDev` to start the local server

## Endpoints

- POST `/api/signup` - Create account. Pass in username and password
- POST `/api/signin` - Sign in. Pass in username and password
- POST `/api/note` - Create a note. Pass in title and body
- GET `/api/note` - Get all notes

## Authentication

Requests are authenticated using the `Authorization` header with a valid JWT.