'use strict'

/*CARGADO DE MODULOS*/
const express = require('express');
const bodyParser = require('body-parser');


/*EJECUCIÓN DE EXPRESS*/
const app = express();

/*CARGADO DE RUTAS*/
const comment_routes = require('./Routes/Comments');
const suggest_routes = require('./Routes/Suggests');

/*MIDDLEWARES*/
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

/*CORS*/
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


/*ADICIÓN DE PREFIJOS*/
app.use('/', comment_routes);
app.use('/form', suggest_routes)
app.listen(3900, () => (console.log(`Example app listening at http://localhost:3900`)))
/*EXPORTACIÓN DEL MODULO*/
module.exports = app;