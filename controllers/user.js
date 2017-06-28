"use-strict"

const User     = require("../models/user")
const service  = require('../services')

function signUp( req , res ){ // como son controlares de peticiones http y usamos express le vamos a pasar req y res

  const user = new User( {

    email : req.body.email,
    displayName : req.body.email,
    pass: req.body.password
    // la contraseña no teemos que almacenarla aqui ya que en moongose
    //con el squema usuario ya tenemos una funcion de preguardado del objeto en bd
    //que nos crea la contraseña en funcion de los datos que le llega del cliente
  })

     user.save( (err) => {
          if(err) res.status(500).send({ message: "ERRROR: No se ha podido crear el usuario" })
          else res.status(200).send({ message:"Usuario almacenado correctamente", token: service.createToken(user) })
     })
}

function signIn( req , res ){

     user.find({ email: req.body.email } , ( err, us ) => {

          if( err ) return res.status(500).send({message: err})
          if( !us ) return res.status(404).send({message: "No existe el usuario"})
          req.user = user
          return res.status(200).send({
               message:"te has logueado correctamente",
               token: service.createToken(user)
               })
     })
}

module.exports = {
  signUp,
  signIn
}
