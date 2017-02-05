'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')

//// como es un middleware añadimos un tercer parametro  "next" para que pase la tura
// cuando creemos la ruta con el controlador le pase la funcionalidad al controlador final

function isAuth(req,res,next){

// comprobamos que en el objeto request de la peticion vaya

  if(!req.headers.authorization){

    return res.status(403).send({message: "no tienes autorización"})
  }
  else{

      const token = req.headers.authorization.split(' ')[1]

      const payload = jwt.decode(token,config.SECRET_TOKEN)

      if(payload.exp <= moment().unix() ){

          return res.status(401).send({message: "el token ha expirado"})
      }
      else{

        req.user = payload.sub
        next()
      }

  }

}


module.exports = { isAuth, }
