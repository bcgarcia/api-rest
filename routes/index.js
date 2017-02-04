'use strict'

/**

RUTAS QUE VA A TENER NUESTRO API.

tenemos las rutas de producto

usamos un router de express para relacionar la url con la peticion
esta declarado el metodo que se utiliza en el controler 

*/

const express = require('express')
const ProductCtrl = require('../controllers/product')
const api = express.Router()


api.get('/products',ProductCtrl.getProducts );
api.get('/product/:productId',ProductCtrl.getProduct );
api.post('/product', ProductCtrl.saveProduct);
api.put('/product/:productId',ProductCtrl.updateProduct);
api.delete('/product/:productId',ProductCtrl.deleteProduct);

 module.exports = api
