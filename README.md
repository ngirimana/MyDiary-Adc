# MyDiary-Adc

MyDiary is an online journal where users can pen down their thoughts and feelings.

[![Build Status](https://travis-ci.org/ngirimana/MyDiary-Adc.svg?branch=develop)](https://travis-ci.org/ngirimana/MyDiary-Adc) [![Coverage Status](https://coveralls.io/repos/github/ngirimana/MyDiary-Adc/badge.svg)](https://coveralls.io/github/ngirimana/MyDiary-Adc) [![Maintainability](https://api.codeclimate.com/v2/badges/83416e7d77df58e984de/maintainability)](https://codeclimate.com/github/ngirimana/MyDiary-Adc/maintainability)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

The project is composed of two different sections:

- User Interface(UI)
- Application Programming Interface(API)

### Prerequisites

- User interface

  - Any Web Browser ( [Google Chrome](https://www.google.com/chrome/) is highly recommended)
  - Text Editor ([Vscode](https://code.visualstudio.com/download) is highly recommended)

- Application Programming Interface(API)

  - [Node JS](https://nodejs.org/)
  - [Postman](https://www.getpostman.com/downloads/)

- For windows O.S user,we recommend to download and install [Git bash](https://git-scm.com/downloads) for easy interaction with github

### Features

###### For user interface

- Required Features

  1. Users can create an account.
  2. User can sign in.
  3. Users can view all entries to their diary.
  4. Users can view the contents of a diary entry.
  5. Users can add entry.
  6. Users can modify an entry.
  7. Users can delete an entry.

- Optional Features

  1. Users can set and get daily notifications that prompt them to add an entry to their diary.

###### For Application Programming Interface(API)

| HTTP Method | Endpoint                   | Description                                     |
| :---------- | :------------------------- | :---------------------------------------------- |
| GET         | /                          | Default route                                   |
| POST        | /api/v2/auth/signup        | User can create an account                      |
| POST        | /api/v2/auth/signin        | User can sign in                                |
| POST        | /api/v2/entries            | User can add an entry in diary                  |
| PATCH       | /api/v2//entries/entrySlug | user can modify entry in diary                  |
| GET         | /api/v2/entries            | User can get all entries in his/her diary       |
| GET         | /api//v2/entries/entrySlug | User can get specific entry in his/her diary    |
| DELETE      | /api//v2/entries/entrySlug | User can delete specific entry in his/her diary |

### Installation

1.  First download and install [Node JS](https://nodejs.org/en/download/)
2.  Download and install [Postman](https://www.getpostman.com/downloads/)
3.  Download and install [postgresql](https://www.postgresql.org/)

4.  Clone repository [MyDiary](https://github.com/ngirimana/MyDiary-Adc/tree/develop) by running
    `git clone https://github.com/ngirimana/MyDiary-Adc.git`
5.  Run `npm install` (`sudo apt install` for linux users) command for installing all project dependencies

### Set up environment variable

- PASSWORD_SALT : for password hashing round salt
- SECRETEKEY: secrete word use when system is generating token
- DATABASE_URL: database connection string. example: postgresql://postgres:12345@localhost/mydiary

### Running

- Running server on local development

  - Run `npm run dev-start` in terminal and test using postman.For example on create account api
    you can send post request on localhost:4000/api/v2/auth/signup
    this is requst body
    ```{
    "firstName":"Ngirimana",
    "lastName":"schasdrack",
    "email":"safarddsshggsishghytySndd12@gmail.com",
    "password":"ffefefe"
    }
    response will be:
    {
    "status": 201,
    "message": "User created successfully",
    "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6OCwidXNlckVtYWlsIjoic2FmYXJkZHNzaGdnc2lzaGdoeXR5U25kZDEyQGdtYWlsLmNvbSIsImlhdCI6MTU3Mjk0ODY5NiwiZXhwIjoxNTczMDM1MDk2fQ.t0Q4KYr_YmwmI6Skmk9nLoBgLJcgX1O1iyWJVMck0NU",
    "userData": {
    "id": 8,
    "firstname": "Ngirimana",
    "lastname": "schasdrack",
    "email": "safarddsshggsishghytySndd12@gmail.com"
    }
    }
    }
    ```

* Running API test in local test environment

  - Run `npm test` in terminal

### Deployment

- User interface on gh-pages

  1. [MyDiary](https://ngirimana.github.io/MyDiary-Adc/UI/)

- For running the API
  1. [Heroku link](https://mydiary-web.herokuapp.com/)
  2. [API documentation](https://mydiary-web.herokuapp.com/api-docs/) using swagger

### Tools

- Server

  - Server side Framework: [Node JS](https://nodejs.org/)/[Express](https://expressjs.com/)
  - Linting Library: [ESLint](https://eslint.org)
  - Style Guide: [Airbnb](https://github.com/airbnb/javascript)
  - Testing Framework: [Mocha](https://mochajs.org/)
  - TDD assertion library: [Chai](https://www.chaijs.com)
  - Documentation Tools: [Swagger](https://swagger.io/tools/swagger-ui/)
  - Database : [postgresql](https://www.postgresql.org/)

- User interface

  - [HTML](https://html.com/)
  - [CSS](https://www.w3schools.com/css/)
  - [Javascript](https://javascript.info/)

- Continuous integration
  - [Travis CI](https://travis-ci.org/) for Continous Integration
- maintainablity
  - [Code climate](https://codeclimate.com/)
- test coverage

  - [Coveralls](https://coveralls.io) for test coverage

### Author

[NGIRIMANA Schadrack](https://github.com/ngirimana/)

### Licence

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/ngirimana/MyDiary-Adc/blob/develop/README.md) file for details

## Acknowledgments

- [Andela Kigali](https://andela.com/)
