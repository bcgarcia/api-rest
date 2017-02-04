'use strict'

//MODELO PRODUCTO

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({

    name : String,
    image: String,
    price: { type:Number, default:0 },
    category: { type :String, enum:['computers','phones','accesories'] },
    description: String
})

module.exports = mongoose.model('Product',productSchema) // para exportar el modelo a otras partes de la aplicacion
