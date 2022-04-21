const display = document.querySelector(".contador");
const amarilla1 = document.querySelector(".amarilla1");
const rojo = document.querySelector(".luzRoja");
const amarilla = document.querySelector(".luzAmarilla");
const verde = document.querySelector(".luzVerde");
const pasar = document.getElementById("pedirPaso");
const cancelar = document.getElementById("cancelar"); 

let tiempo = 85;
let peticion = 0;
let retorno = 0;
pasar.addEventListener("click",()=>{
   
    if(tiempo<=45 && tiempo>=35){
        peticion++;
        retorno = tiempo;
        tiempo = 85;
    }
})
cancelar.addEventListener("click",()=>{
    if(peticion>1 && tiempo > 35){
     peticion--;   
     tiempo = retorno;
    }
})

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
    if(tiempo > 0 || tiempo<=120){
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
        if(tiempo==0){
            tiempo=85
        }
    }  
}


semaforo();
setInterval(semaforo,1000);
