'use strict';

/**

ARCHIVO DE CONFIGURACION CON EXPRESS

**/
const express     = require('express'); // cargamos libreria express (framework para node)
const bodyParser  = require('body-parser'); // cargamos libreria body-parser. para dar cuerpo a las peticiones que lleguen/envien
const api          = require('./routes')
const app = express();
app.use(bodyParser.urlencoded({extended:false}) );
app.use(bodyParser.json() ); // indicamos el tipo de dato con el que vamos a trabajar
app.use('/api',api) // decimos que vamos a usar la url /api con el modulo api creado en routes [api es la variable que referencia a routes

module.exports = app
