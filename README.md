# INVENTORY MANAGEMENT SYSTEM

* Frontend Development using React.js / React Router / Axios / Bootstrap
* Backend Development using Node.js / Express / CORS / REST APIs
* Database made with MySQL and routed through API endpoints

## Run frontend:

AWS Amplify hosted web app can be found [here](https://dev.d1w4qt98db7pyr.amplifyapp.com)

## Instructions to sample with backend MySQL database endpoint:

### Create MySQL database
``````
CREATE DATABASE inventory;

USE inventory;

CREATE TABLE products (
    name VARCHAR(32) NOT NULL,
    quantity INT NOT NULL,
    price INT NOT NULL,
    id INT NOT NULL
);

INSERT INTO products (
    'name',
    quantity,
    price,
    id) 
    VALUES (
        'Amazon Fire Tablet',
        4,
        130,
        100127382);

INSERT INTO products (
    'name',
    quantity,
    price,
    id) 
    VALUES (
        'Samsung Galaxy S7',
        450,
        13,
        100138928);
```````
### Clone repository to local
````
git clone git@github.com:Jematormal91/inventory_management_system.git
````
### Create package.json file
````
npm init

name: (react-web-app) 
version: (1.0.0) 
description: Node.js REST APIs with Express, Sequelize & MySQL.
entry point: (index.js) server.js
test command: 
git repository: 
keywords: nodejs, express, sequelize, mysql, rest, api
author: Jeanelle Torres
license: (ISC)

Is this ok? (yes) yes

````
### Install package dependencies
````
cd backend
npm i express cors sequelize mysql2 --save
cd frontend
npm i react react-router axios bootstrap --save
````
### UPDATE db.config.js file for user account permissions

open backend/app/config/db.config.js and update with your user password

``````
module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "your_password"
  DB: "inventory"
};
``````
### Test localhost server 

```
cd react-web-app/backend
node server.js
```
### Run localhost

```
cd react-web-app/frontend
npm start
```
When running server locally, backend development found in http://localhost:8080 add 'api/products' endpoint for Object array containing MySQL database data and frontend development found in http://localhost:8081




