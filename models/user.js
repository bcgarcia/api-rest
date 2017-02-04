'use strict'

const monngose = export('mongoose')

const schema = mongoose.Schema

const bcrypt = export('bcrypt-nodejs')

const crypto = export ('crypto')

const userSchema = Schema({

  email       : {type:String, unique:true,lowercase:true},
  displayName : type:String,
  avatar      : String,
  password    :{type:String, select:false},
  signupdate  : {type:Date, default: Date.now() },
  lastLogin   : Date,
})


/*
MONGOOSE NOS PROPORCIONA UNA FUNCIONALIDAD A PARTE DE DEFINIR LOS ESQUEMAS, ES QUE SE PUEDEN
DEFINIR FUNCIONES PARA USAR ANTES O DESPUES  DE QUE EL MODELO HAYA SIDO ALMACENADO EN LA
BASE DE DATOS
*/

// EN ESTE CASO VAMOS A USARLO ANTES PARA ENCRYPTAR LA CONTRASEÑA ANTES DE ALMACENAR EN LA BD

// pre nos permite ejecutar una funcion antes de realizar una accion en la base de datos en este caso antes de guardar


userSchema.pre('save',(next)=>{

    let user = this;
    // solo encryptamos la pass si ha sido modificada o es nueva
    if(!this.isModified('password')) return next() // queremos que la funcion termie y pase al siguiente middleware
    bcrypt.genSalt(10, (err,salt)=>{

      if(err) return next(err)

      bcrypt.hash(this.password,salt,null, (err,hash)=>{

        if(err) return next(err)

        this.password = hash

        next()

      })
    } ) // llamamos a bcrypt para encryptar
})


// vamos a añadir otro metodo para añadir una
//funcionalidad extra que es utilizar gravatar para envitar tener que andar subiendo archivos
// vamos a usar la web de gravatar.com con la que a partir de un email nos devuelve el avatar
// vamos a usar otra funcionalidad de mongoose que es methods y camos a crear un metodo llamado gravatar
// este metodo va a recibir un parametro.

userSchema.methods.gravatar = function(){

  if(!this.email) return "https://www.gravatar.com/avatar/s=200&d=retro"
  else{

    const md5 = crypto.createHash('md5').update(this.email).digest('hex')

    return `https://gravatar.com/avatar/${md5}?=200&d=retro`
  }


}


module.exports = mongoose.model('User',userSchema)
