const display = document.querySelector(".contador");
const amarilla1 = document.querySelector(".amarilla1");
const rojo = document.querySelector(".luzRoja");
const amarilla = document.querySelector(".luzAmarilla");
const verde = document.querySelector(".luzVerde");
const pasar = document.getElementById("pedirPaso");
const cancelar = document.getElementById("cancelar"); 
const respuesta = document.querySelector('.info')
const p_contador = document.querySelector('.peatones_contador')

//const client  = mqtt.connect('ws://test.mosquitto.org:8081/mqtt')

const client  = mqtt.connect('ws://broker.hivemq.com:8000/mqtt')
// hivemq puerto 8000 || 443

let tiempo = 85;
let peticion = 0;
let retorno = 0;


//conexion 
client.on('connect', function () {
  client.subscribe('rlm6301', function (err) {
    if (!err) {
      client.on('message',  function (topic, message) {
      
        //console.log(topic +"-"+ message.toString())
        if(message.toString()=='pasar'){
            //console.log('pausa con mqtt')
            peticion++;
            p_contador.innerHTML=`${peticion}`;
            if(tiempo<=45 && tiempo>=35){
                retorno = tiempo;
                tiempo = 85;
                //p_contador.innerHTML=`${peticion}`;
            }   
            if(tiempo<=45 && tiempo < 35){   
                retorno=tiempo;
                tiempo = Math.round(tiempo/2);
               // p_contador.innerHTML=`${peticion}`;
               }     
        }
        if(message.toString()=='cancelar'){
            //console.log('cancelar con mqtt')
            if(peticion>0){
                  
                tiempo = retorno;
                //p_contador.innerHTML=`${peticion}`
               }
            
            if(peticion==0 && tiempo > 35){
                //peticion--;   
                tiempo = retorno;
               // p_contador.innerHTML=`${peticion}`
               }
        }
      })
    }
  })
})


client.on('connect', function () {
    pasar.addEventListener('click', ()=>{
        client.publish('rlm6301', 'pasar')
    })
})
client.on('connect', function () {
    cancelar.addEventListener('click', ()=>{
        client.publish('rlm6301', 'cancelar')
    })
})

/*
pasar.addEventListener("click",()=>{   
    if(tiempo<=45 && tiempo>=35){
        peticion++;
        retorno = tiempo;
        tiempo = 85;
    }
    if(tiempo<=45 && tiempo < 35){
        peticion--;   
        tiempo = tiempo - 15;
       }
})

cancelar.addEventListener("click",()=>{
    if(peticion>0 && tiempo > 35){
     peticion--;   
     tiempo = retorno;
    }

})*/

const encender = {
    amarilla1: function encender(){
        amarilla1.setAttribute("style", "background-color: #FFFF00")
    },
    rojo:  function encenderRojo(){
        rojo.setAttribute("style", "background-color: #FF0000")
    },
    amarilla: function encender(){
        amarilla.setAttribute("style", "background-color: #FFFF00")
    },
    verde: function encender(){
        
        verde.setAttribute("style", "background-color: #00FF00")
    }
}

const apagar = {
    amarilla1: function apagar(){
        amarilla1.setAttribute("style", "background-color: rgb(55, 59, 0)")
    },
    rojo:  function apagar(){
        rojo.setAttribute("style", "background-color: rgb(51, 8, 8)")
    },
    amarilla: function apagar(){
        amarilla.setAttribute("style", "background-color: rgb(55, 59, 0)")
    },
    verde: function apagar(){
        
        verde.setAttribute("style", "background-color: rgb(0, 31, 9")
    }
}


const semaforo=()=>{
    display.innerHTML=`${tiempo}`
    if(tiempo > 0 && tiempo<=120){
        tiempo--;

        if(tiempo <=85){
            display.setAttribute("style", "color: #FFFF00");
            encender.amarilla1();
            apagar.rojo();
            apagar.amarilla();
            apagar.verde();
        }
        if(tiempo < 75){
            display.setAttribute("style", "color: #FF0000");
            encender.rojo();
            apagar.amarilla();
            apagar.verde();
            apagar.amarilla1();
            
        }
        if(tiempo < 45){
            display.setAttribute("style", "color: #FFFF00");
            encender.amarilla();
            apagar.rojo();
            apagar.verde();
            apagar.amarilla1();
    
        }        
        if(tiempo < 35){
            display.setAttribute("style", "color: #00FF00");
            encender.verde();
            apagar.amarilla();
            apagar.rojo();
            apagar.amarilla1();
        }
        if(tiempo==0 || tiempo <0){
            tiempo=85
        }
    }  
}



//envio de timer
client.on('connect', function () {
    setInterval(() => {
        client.publish('rlm6301/time', `${tiempo}`)
    }, 1000);
        
    
})


semaforo();
setInterval(semaforo,1000);




