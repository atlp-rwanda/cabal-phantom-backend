# cabal-phatom-backend
[![Build Status](https://travis-ci.org/atlp-rwanda/cabal-phantom-backend.svg?branch=develop)](https://travis-ci.org/atlp-rwanda/cabal-phantom-backend)
[![Maintainability](https://api.codeclimate.com/v1/badges/ecd50de02a9e5b9864a1/maintainability)](https://codeclimate.com/github/atlp-rwanda/cabal-phantom-backend/maintainability)
[![Coverage Status](https://coveralls.io/repos/github/atlp-rwanda/cabal-phantom-backend/badge.svg?branch=develop)](https://coveralls.io/github/atlp-rwanda/cabal-phantom-backend?branch=develop)
[![Test Coverage](https://api.codeclimate.com/v1/badges/ecd50de02a9e5b9864a1/test_coverage)](https://codeclimate.com/github/atlp-rwanda/cabal-phantom-backend/test_coverage)

## Vision
Make the journey of travellers easier by searching routes and geolocating buses hence develeloping a modern web app
---
## Project setup
---
### Dotenv setup
 1. ***Getting started***
  * Run ``` npm install ```
  * Create ``` .env ``` in project directory
  * Take a look at the ``` .env.example ```  file which is in the project directory to have a proper on environment variables that are being used in this project
  * Copy all keys from the ``` .env.example ```  file to ``` .env ``` file and add values to corresponding keys. These can be obtained from the project administrator
  * Feel free to add other keys and values according to your feature requirements
  ***NB***: Add keys in ``` .env.example ``` as a sample to ease next setup for other developers.

  2. ***Time to import your environment***
   * First install dotenv package by doing ``` npm install dotenv ```
   * For you to use your new environment variable you have to import ``` dotenv ``` module in the file where you want to utilise your environment variables and configure it. like this: ```import dotenv from 'dotenv';
   dotenv.config();```

   * Then you'll be able to access your environment variables via ``` process.env.YOUR_KEY ```
   * That's it, you're good to go!, happy coding!
### Sequelize ORM setup
1. ***Configuring ```.env```***
   * Download and install [pgAdmin](https://www.postgresql.org/download/)
   * Create two databases, one for testing and another for development.
   * Copy ``` DATABASE_DEV_URL=postgres://your_db_user:your_password@127.0.0.1:5432/your_dev_db_name ``` 
          ``` DATABASE_TEST_URL=postgres://your_db_user:your_password@127.0.0.1:5432/your_test_db_name``` URLs
    from ```.env.example``` to ```.env```
   * Edit them with your real database user, password and database name.
2. ***Running Migrations***
   * Run ``` npm run migrate ``` in terminal to fire up migration
3. ***Undoing Migrations***
  * Run ``` npm run migrate:reset ``` to undo all migrations
4. Running Seeds
 * Run ``` npm run seeding ``` in terminal to run all seeds


### Running server
   * Run `npm run dev` in terminal
### Running tests
   * Run `npm test` in terminal

### Api Documentation
[Swagger Documentation](https://phantom-cabal-staging.herokuapp.com/api-docs/)