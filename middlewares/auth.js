'use strict'

const service = require ('../services')

//// como es un middleware añadimos un tercer parametro  "next" para que pase la tura
// cuando creemos la ruta con el controlador le pase la funcionalidad al controlador final

function isAuth(req,res,next){

      // comprobamos que en el objeto request de la peticion vaya
     if(!req.headers.authorization){return res.status(403).send({message: "no tienes autorización"})}

     const token = req.headers.authorization.split(' ')[1]

     service.decodeToken(token)
     .then( response => {
          req.user = response
          next()
     }) // si se ha resuelto correcto
     .catch( error => {
          res.status(error.status )
     }) // si ha ocurrido error
}


module.exports = isAuth
