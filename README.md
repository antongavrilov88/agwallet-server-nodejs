# NodeJS-Postgresql server

## Description
This is simple NodeJS server dealing with Postgresql via Sequelize.
Tests are made by Jest.
Husky allow commits only if both tests and linter are ok.

## Prepare

Install all dependencies

In the root of the project run
```
npm install
```
## Start

Create the database container
```
docker-compose up --build -d sample-postgres
```
Create the test database container
```
docker-compose up --build -d sample-postgres-test
```

Start the app
```
npm run start
```
