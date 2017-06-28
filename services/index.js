"use strict"

/**
* services con funciones de código que se van a usar en otras partes de la app
**/

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')

function createToken(user){

  const payload = {

    sub: user._id, // mejor sería usar un id diferente al de la BD pero para probar nos vale
    iat: moment().unix(),        // fecha de cuando se crea el token
    expect: moment().add(14,'days').unix(),     // fecha de cuando expira el token (en 15 días)

  }

 return jwt.encode(payload,config.SECRET_TOKEN)

}


function decodeToken(token){


     const decoded = new Promise( ( resolve , reject )=> {

          try {

               const payload = jwt.decode(token, config.SECRET_TOKEN)

               if(payload.exp <= moment().unix() ){

                   reject({
                        status: 401,
                        message: "el token ha expirado"
                   })
               }
               resolve(payload.sub)
          }
          catch (e) {

               reject({
                    status: 500,
                    message: "Invalid token"
               })
          }
     })
     return decoded
}

module.exports = {

  createToken,
  decodeToken
}
