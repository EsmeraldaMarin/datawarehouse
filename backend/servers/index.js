const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')

let app = express()

const {defineRol, validateRol, validateAcount}= require('./middlewares/authorization');
const {selectContacts, insertContact, updateContact, deleteContact} = require('./controllers/contacts')
const {getChannelsById} = require('./controllers/channels');

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
app.post('/contacts', insertContact);
app.put('/contacts/:id', updateContact);
app.delete('/contacts/:id', deleteContact);

//channels

app.get('/channels/:id', getChannelsById);


//companies

app.get('/companies', );
app.post('/companies', );
app.put('/companies', );
app.delete('/companies', );

//regiones

app.get('/regions', );
app.post('/regions', );
app.put('/regions', );
app.delete('/regions', );

//countries

app.get('/countries', );
app.post('/countries', );
app.put('/countries', );
app.delete('/countries', );

//cities

app.get('/cities', );
app.post('/cities', );
app.put('/cities', );
app.delete('/cities', );



app.listen(3000, ()=>{
    console.log("The server is running on port 3000")
})