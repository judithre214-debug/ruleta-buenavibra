const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");

const spinButton = document.getElementById("spinButton");
const timer = document.getElementById("timer");

const popup = document.getElementById("popup");
const popupPrize = document.getElementById("popupPrize");
const closePopup = document.getElementById("closePopup");
const claimButton = document.getElementById("claimButton");


const premios = [
    "ROLLOVER X8",
    "ROLLOVER X6",
    "ROLLOVER X4",
    "ROLLOVER X2"
];


const colores = [
    "#FFD700",
    "#ff5733",
    "#33ff57",
    "#3385ff"
];


const grados = 360 / premios.length;

let girando = false;


// Tiempo de espera: 5 minutos

const tiempoEspera = 300000;



// Dibujar ruleta

function dibujarRuleta(){

    ctx.clearRect(0,0,420,420);


    for(let i=0;i<premios.length;i++){


        let inicio = i * grados * Math.PI / 180;


        ctx.beginPath();

        ctx.moveTo(210,210);


        ctx.arc(
            210,
            210,
            200,
            inicio,
            inicio + grados*Math.PI/180
        );


        ctx.fillStyle = colores[i];

        ctx.fill();


        ctx.strokeStyle="gold";

        ctx.lineWidth=3;

        ctx.stroke();


        ctx.save();


        ctx.translate(210,210);


        ctx.rotate(
            inicio + (grados*Math.PI/180)/2
        );


        ctx.fillStyle="black";

        ctx.font="bold 22px Arial";


        ctx.fillText(
            premios[i],
            70,
            10
        );


        ctx.restore();

    }

}


dibujarRuleta();



// Revisar tiempo al cargar

let ultimoGiro = localStorage.getItem("ultimoGiro");


if(ultimoGiro){

    let diferencia = Date.now() - ultimoGiro;


    if(diferencia < tiempoEspera){

        bloquearGiro();

        iniciarTemporizador(
            tiempoEspera - diferencia
        );

    }

}



// Girar

spinButton.onclick=function(){


    if(girando) return;


    girando=true;

    spinButton.disabled=true;



    let premioRandom = Math.floor(
        Math.random()*premios.length
    );


    let vueltas = 5;


    let giroFinal =
    vueltas*360 +
    (360 - premioRandom*grados);


    canvas.style.transition =
    "transform 5s cubic-bezier(.17,.67,.83,.67)";


    canvas.style.transform =
    `rotate(${giroFinal}deg)`;



    setTimeout(()=>{


        let ganador = premios[premioRandom];


        popupPrize.innerHTML =
        ganador;


        popup.classList.remove("oculto");


        localStorage.setItem(
            "ultimoGiro",
            Date.now()
        );


        iniciarTemporizador(
            tiempoEspera
        );


        girando=false;


    },5000);


};



// Bloquear botón

function bloquearGiro(){

    spinButton.disabled=true;

    spinButton.innerHTML="⏳ ESPERA";

}



// Temporizador

function iniciarTemporizador(tiempo){


    let intervalo=setInterval(()=>{


        tiempo-=1000;


        let minutos=Math.floor(
            tiempo/60000
        );


        let segundos=Math.floor(
            (tiempo%60000)/1000
        );


        timer.innerHTML =
        `Disponible en ${minutos}m ${segundos}s`;



        if(tiempo<=0){


            clearInterval(intervalo);


            spinButton.disabled=false;


            spinButton.innerHTML="🎰 GIRAR";


            timer.innerHTML="";


        }


    },1000);


}



// Popup

closePopup.onclick=function(){

    popup.classList.add("oculto");

};



claimButton.onclick=function(){

    alert(
        "Premio: " + popupPrize.innerHTML
    );

};
