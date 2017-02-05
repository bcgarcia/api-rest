'use strict'

/**

RUTAS QUE VA A TENER NUESTRO API.

tenemos las rutas de producto

usamos un router de express para relacionar la url con la peticion
esta declarado el metodo que se utiliza en el controler

*/

const express = require('express')
const auth = require('../middlewares/auth')

const ProductCtrl = require('../controllers/product')
const api = express.Router()


api.get('/products',ProductCtrl.getProducts );
api.get('/product/:productId',ProductCtrl.getProduct );
api.post('/product', ProductCtrl.saveProduct);
api.put('/product/:productId',ProductCtrl.updateProduct);
api.delete('/product/:productId',ProductCtrl.deleteProduct);

// las rutas anteriores son publicas, es decir no haría falta autenticacion con jwt

// creamos rutas privadas para probar el middleware para comprobar si tiene autorizacion

api.get('/private', auth.isAuth ,function(req,res){ // habria que poner un controller pero ahora vale de momento


  // con auth.isAuth cuando llamemos a private ejecutará la funcion isAuth

  res.status(200).send({message:"tienes acceso"})



})


 module.exports = api
