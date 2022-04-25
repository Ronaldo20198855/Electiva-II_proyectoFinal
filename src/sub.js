const mqtt = require('mqtt')
const client  = mqtt.connect('mqtt://broker.hivemq.com')

client.on('connect', function () {
  client.subscribe('rlm6301/peticion', function (err) {
    if (!err) {
      client.on('message', function (topic, message) {
        // message is Buffer
        console.log(message.toString())
        
      })
    }
  })
})

