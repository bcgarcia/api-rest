/*

index.js

este archivo pide toda la inforamcion necesaria,
*/

const mongoose = require('mongoose') // cargamos la libreria mongoose para hacer más sencillo el conectar a mongodb, etc

const app = require('./app')

const config = require('./config')

mongoose.connect(config.db, (error, res ) => {
  
  if(error) {

    console.log(`Error al conectar a  mongodb ${error}`)
  }
   else{
      console.log('Conexion a la base de datos Mongodb establecida...')

      app.listen(config.port,()=>{
        console.log(`api rest corriendo en http://localhost:${config.port}`)
        console.log('pruebas');
      })

  }

})
