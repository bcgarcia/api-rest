'use strict'

/**

RUTAS QUE VA A TENER NUESTRO API.

tenemos las rutas de producto

usamos un router de express para relacionar la url con la peticion
esta declarado el metodo que se utiliza en el controler

*/

const express       = require('express')
const auth          = require('../middlewares/auth')

const ProductCtrl   = require('../controllers/product')
const UserCtrl      = require('../controllers/user')


const api = express.Router()

// las rutas son publicas, es decir no haría falta autenticacion con jwt

/*
 *************************
 * PUBLIC ROUTES
 *************************
 */
api.get('/products',ProductCtrl.getProducts );
api.get('/product/:productId',ProductCtrl.getProduct );
api.post('/signup', UserCtrl.signUp )
api.post('/signin', UserCtrl.signIn )
// creamos rutas privadas para probar el middleware para comprobar si tiene autorizacion
/*
 *************************
 * PRIVATE ROUTES
 *************************
 */
api.get('/private', auth ,function(req,res){
  // con auth cuando llamemos a private ejecutará la funcion isAuth
  res.status(200).send({message:"tienes acceso"})
})
api.post('/product', auth,ProductCtrl.saveProduct);
api.put('/product/:productId',auth,ProductCtrl.updateProduct);
api.delete('/product/:productId',auth,ProductCtrl.deleteProduct);


/*
 *************************
 * views
 *************************
 */


 module.exports = api
