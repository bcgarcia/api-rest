"use strict"

/**
* services con funciones de código que se van a usar en otras partes de la app
**/

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')

function createToken(user){

  const payload = {

    sub: user._id // mejor sería usar un id diferente al de la BD pero para probar nos vale
    iat: moment().unix(),        // fecha de cuando se crea el token
    expect: moment().add(14,'days').unix(),     // fecha de cuando expira el token (en 15 días)

  }

 return jwt.enconde(payload,config.SECRET_TOKEN)

}

module.exports{

  createToken

}
