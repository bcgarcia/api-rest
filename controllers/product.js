'use strict'

// CONTROLLADOR PARA PRODUCTOS

const Product = require('../models/product');

function getProduct( req,res ){

  let productId = req.params.productId

  Product.findById( productId, ( err , product )=>{

      if(err) return res.status(500).send({message:`ERROR: no se ha podido realizar la petición `})

      if(!product) return res.status(404).send({message: `error: el producto no se encuentra`})

      res.status(200).send({product})
  })

}

function saveProduct(req,res){

  console.log('POST /api/product')
  console.log(req.body)

  let product = new Product()

  product.name        = req.body.name
  product.image       = req.body.picture
  product.price       = req.body.price
  product.category    = req.body.category
  product.description = req.body.description

  product.save((err,productStored)=>{

    if(err){
      console.log(err)
      res.status(500).send({message: `ERR: al guardar en la base de datos ${err}`})
    }
    else{
      res.status(200).send({product:productStored})
    }


  }) // fin product.save

}


function getProducts(req,res){

  Product.find((err,products)=>{

    if(err) return res.status(500).send({message:`ERROR: no se ha podido realizar la petición `})

    if(!products) return res.status(404).send({message: `error: no existen productos`})

    res.status(200).send({products });
  })


}

function deleteProduct(id){

  let productId = req.params.productId

  Product.findById(productId,(err,product)=>{

    if(err) return res.status(500).send({message: `ERROR: ha ocurrido un error al borrar ${err}`})

    if(!product) return res.status(404).send({message: `ERROR: no se ha encontrado el producto seleccionado`})

    product.remove(err=>{
      if(err) return res.status(500).send({message: `ERROR: ha ocurrido un error al borrar ${err}`})
      else return res.status(200).send({message: `el producto se ha eliminado`})


    })

  })
}

function updateProduct(req,res){
  let productId = req.params.productId
  let update = req.body

  Product.findByIdAndUpdate(productId,update,(err,producUpdated)=>{

    if(err) return res.status(500).send({message: `ERROR: ha ocurrido un error al actualizar ${err}`})
    else res.status(200).send({message: `El producto se ha actualizado`})


  })

}


module.exports = {

  getProduct,
  getProducts,
  deleteProduct,
  updateProduct,
  saveProduct

}
