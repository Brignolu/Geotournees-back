// Express is a minimal and flexible Node.js web application framework
var express = require('express');
// Node.js Path Module
var path = require('path');
// module qui parse les cookies (req.cookies)
var cookieParser = require('cookie-parser');
// module session
var session = require('express-session')
// module logger
var logger = require('morgan');
// module qui va generer la doc avec les commentaires et les decorateurs
var swaggerJSDoc = require('swagger-jsdoc');
// documente les routes de l'API
var swaggerUi = require('swagger-ui-express');
// config env
require('dotenv').config();





const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'TeleAlarme74/Visualisation',
        version: '1.0.0',
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Serveur de Developpement',
        },
    ],
};

const options = {
    swaggerDefinition,
    // Chemin ou sont les definitions Swagger
    apis: ['./routes/*.js'],
};

var swaggerSpec = swaggerJSDoc(options);

// const cors = require('cors');

// importation des routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// Init de l'app
var app = express();


// Init de la db
const db = require('./config/db.config.js');

// init du logger mariaDb
app.use(logger('dev'));
// module pour parser le body des requetes basé sur le module body-parser
app.use(express.json());
// analyse les requêtes entrantes avec un payload encodé
app.use(express.urlencoded({extended: false}));
// Utilisation des cookies
app.use(cookieParser());
// ressources publiques
app.use(express.static(path.join(__dirname, 'public')));
// On autorise les origines multiples
app.use((req, res, next) => {
    //Indicates whether the response can be shared.
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", ["GET,PUT,POST,DELETE,OPTIONS"]);
    next();
});
// Swagger Ui Documentation
app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Session Init
app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: {
        expires: new Date(Date.now() + 3600000),
        maxAge: 3600000
    },
}));
// Definition des routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;

