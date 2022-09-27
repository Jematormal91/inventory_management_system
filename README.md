# INVENTORY MANAGEMENT SYSTEM
### Frontend Development using React / Bootstrap
### Backend Development using Express / Cors / RESTful APIs
### Database made with MySQL and routed through API endpoints

## Run frontend:
````
AWS Amplify hosted web app can be found [here](https://dev.d1w4qt98db7pyr.amplifyapp.com)
````
## Instructions to sample with backend MySQL database endpoint:

# Create MySQL database
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
# UPDATE db.config.js file for user account permissions


open backend/app/config/db.config.js and update with your user password

``````
module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "your_password"
  DB: "inventory"
};
``````
# Test localhost server 

```
cd react-web-app/backend
node server.js
```
# Run localhost

```
cd react-web-app/frontend
npm start
```




