const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');

let upload = multer();

let app = express()

const { defineRol, validateRol, validateAcount } = require('./middlewares/authorization');
const { selectContacts, insertContact, updateContact, deleteContact } = require('./controllers/contacts')
const { getChannelsById } = require('./controllers/channels');
const { selectRegions, selectInfoRegion, insertRegion, deleteRegion } = require('./controllers/regions');
const { selectCountries, selectCountryByRegionId, insertCountry } = require('./controllers/countries');
const { selectCities, selectCityByCountryId, insertCity } = require('./controllers/cities');
const { selectCompanies, insertCompany } = require('./controllers/companies');

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
app.put('/users/:id', defineRol, validateRol);
app.delete('/users/:id', defineRol, validateRol);

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
app.post('/companies', upload.none(), insertCompany);
app.put('/companies/:id',);
app.delete('/companies/:id',);

//regiones

app.get('/regions', selectRegions);
app.post('/regions', upload.none(), insertRegion);
app.put('/regions/:id',);
app.delete('/regions/:id', deleteRegion);
app.get('/regions/:id', selectInfoRegion)

//countries

app.get('/countries', selectCountries);
app.post('/countries', upload.none(), insertCountry);
app.put('/countries/:id',);
app.delete('/countries/:id',);
app.get('/countries/:id', selectCountryByRegionId)

//cities

app.get('/cities', selectCities);
app.post('/cities', upload.none(), insertCity);
app.put('/cities/:id',);
app.delete('/cities/:id',);
app.get('/cities/:id', selectCityByCountryId)




app.listen(3000, () => {
    console.log("The server is running on port 3000")
})