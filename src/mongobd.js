
//creacion de constantes para la conexion con mongodb
const mongo = require('mongodb');
const Mongo = mongo.MongoClient;
const url = 'mongodb+srv://admin:c0ntr4c0m0n@cluster0.2fwyb.mongodb.net/cluster0?retryWrites=true&w=majority'

//conexion con el broker mqtt
const mqtt = require('mqtt')
const client  = mqtt.connect('mqtt://broker.hivemq.com')

//optencion de datos del topico "rlm6301/peticion" y envio de dichos datos a la bd
client.on('connect', function () {
    client.subscribe('rlm6301/peticion', function (err) {
      if (!err) {
        client.on('message', function (topic, message) {
            console.log(message.toString())
            console.log('Data save to mongo')
            Mongo.connect(url,(Error, cliente)=>{
                let myCol = cliente.db('proyectoFinal').collection('peticiones')        
                myCol.insertOne({
                    message: message.toString()
                })
            })
          
        })
      }
    })
  })
  
  
