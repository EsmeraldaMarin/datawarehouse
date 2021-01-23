const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');

let upload = multer();

let app = express()

const {defineRol, validateRol, validateAcount}= require('./middlewares/authorization');
const {selectContacts, insertContact, updateContact, deleteContact} = require('./controllers/contacts')
const {getChannelsById} = require('./controllers/channels');
const {selectRegions} = require('./controllers/regions');
const {selectCountries} = require('./controllers/countries');
const {selectCities} = require('./controllers/cities');
const {selectCompanies} = require('./controllers/companies');

app.use(cors())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json());

//ROUTES

//user routes
// si es regular, se elimina la pestana de usuarios en el header
app.get('/users', defineRol, validateRol);
app.post('/users', defineRol, validateRol); //se crea un usuario
app.put('/users', defineRol, validateRol );
app.delete('/users', defineRol, validateRol );

//login

app.post('/users/login', validateAcount); //se loguea un usuario

//contactos

app.get('/contacts', selectContacts);
app.post('/contacts', upload.none(), insertContact);
app.put('/contacts/:id', updateContact);
app.delete('/contacts/:id', deleteContact);

//channels

app.get('/channels/:id', getChannelsById);


//companies

app.get('/companies', selectCompanies);
app.post('/companies', );
app.put('/companies', );
app.delete('/companies', );

//regiones

app.get('/regions', selectRegions);
app.post('/regions', );
app.put('/regions', );
app.delete('/regions', );

//countries

app.get('/countries', selectCountries);
app.post('/countries', );
app.put('/countries', );
app.delete('/countries', );

//cities

app.get('/cities', selectCities);
app.post('/cities', );
app.put('/cities', );
app.delete('/cities', );



app.listen(3000, ()=>{
    console.log("The server is running on port 3000")
})