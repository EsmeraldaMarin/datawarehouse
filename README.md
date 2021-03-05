# DATA WAREHOUSE
Full Stack Proyect

## Description

Data WareHouse is a website that as a marketing company will allow you to manage the contact of your clients, companies and regions / countries / cities with which you work. You can perform various operations, such as adding contacts, companies, regions and user accounts so that your employees (administrators or not) can also use the website. Other actions such as delete and update are also allowed. The function of exporting and importing contacts is still in process, but will soon have accessibility for its use.

### Technologies used in this project

- nodeJS
- Express
- Cors
- Multer
- JWT (JSON Web Token)
- Nodemon
- mySQL
- mysql2
- Git (for version control)
- Javascript/HTML/CSS
- SASS


## Getting Started 🚀

In this README.md you will find the specifications to install, initialize and use this API

### Installation ⚙️

- Clone this repository:
    https://github.com/EsmeraldaMarin/datawarehouse.git
- Install the dependencies

    _Use_
    ```
    npm install
    ```
     _or_
    ```
    npm i
    ```

    Dependencies:
    ```
    {
        "cors": "^2.8.5",
        "express": "^4.17.1",
        "jsonwebtoken": "^8.5.1",
        "multer": "^1.4.2",
        "mysql2": "^2.2.5",
        "nodemon": "^2.0.7"
    }
    ```
- Create and structure the databases

    - To create the database open a new query in MySql and run the code in the file: backend/database/create_database.sql

    - To create the tables open a new query in MySql and run the code in the file: backend/database/create_tables.sql

    - You can create some users, contacts, regions, countries, cities, companies and channels for the correct use of the web site. Don't forget connect a contacts with at least one channel in the channel table. 

---

### Initialization ⚙️
- Initialize the server

    _Using nodemon:_
    ```
    nodemon backend/servers/index.js
    ```
- If everything is OK you will receive this message: 

    _"The server is running on port 3000"_

---

### Use the API 🚀

#### >> Endpoints

- CONTACTS (http://localhost:3000/contacts)

    Methods:
     - GET
     - POST
     - PUT -> BY ID
     - DELETE -> BY ID
    
- LOGIN (http://localhost:3000/login)

    Methods:
     - POST

    Note: A user can log in if their account already exists and was created from the website by an administrator user

- CHANNELS (http://localhost:3000/channels)

    Methods:
     - GET -> BY ID 
     - POST
     - PUT -> BY ID
     - DELETE -> BY ID

- COMPANIES (http://localhost:3000/companies)

    Methods:
     - GET  
     - POST
     - PUT -> BY ID
     - DELETE -> BY ID

- REGIONS (http://localhost:3000/regions)

    Methods:
     - GET
     - GET -> BY ID 
     - POST
     - PUT -> BY ID
     - DELETE -> BY ID

- COUNTRIES (http://localhost:3000/countries)

    Methods:
     - GET 
     - GET -> BY ID 
     - GET -> BY REGION ID 
     - POST
     - PUT -> BY ID
     - DELETE -> BY ID

- CITIES (http://localhost:3000/cities)

    Methods:
     - GET 
     - GET -> BY ID 
     - GET -> BY COUNTRY ID 
     - POST
     - PUT -> BY ID
     - DELETE -> BY ID
     
- ALL INFO LOCATION (http://localhost:3000/all_info_location)

    Methods:
     - GET 
