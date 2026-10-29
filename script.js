const boton = document.getElementById("mostrar-historia");
const texto = document.getElementById("historia-extra");

boton.addEventListener("click", function() {
    texto.hidden = !texto.hidden;
    if(texto.hidden) {
        boton.textContent = "Mostrar mas historia";
    }else {
        boton.textContent = "Ocultar historia";
    }
});

const buscador = document.getElementById ("buscar-personaje");
const tarjetas = document.querySelectorAll(".tarjeta");
const mensaje  = document.getElementById("sin-resultados");
const contador = document.getElementById("contador-resultados");


buscador.addEventListener( "input",function(){
    const busqueda =  buscador.value.trim().toLowerCase();
    let coincidencias=0;

    tarjetas.forEach(function(tarjeta){
        const nombre= tarjeta.querySelector("h3").textContent.toLowerCase();
        const coincide = nombre.includes(busqueda);
        

        tarjeta.hidden = !coincide;
        if(coincide) {
            coincidencias++;
        }
    });
    mensaje.hidden = coincidencias > 0;
    contador.textContent = "Personajes encontrados: " + coincidencias;
    contador.hidden =busqueda ==="";
    });
const tarjetasInteractivas = document.querySelectorAll(
    '.tarjeta[role="button"]'
);

tarjetasInteractivas.forEach(function(tarjeta){
    const idDetalle = tarjeta.getAttribute("aria-controls");
    const detalle = document.getElementById(idDetalle);

   function alternarDetalle(){
    detalle.hidden = !detalle.hidden;
    tarjeta.setAttribute(
        "aria-expanded",
        String(!detalle.hidden)
    );
   }
   tarjeta.addEventListener("click", alternarDetalle);
   tarjeta.addEventListener("keydown", function(evento) {
    if(evento.key === "Enter" || evento.key === " "){
        evento.preventDefault();
        alternarDetalle();
    }
})
});
const fondoImagen = document.getElementById("fondo-imagen");
const fondoVideo = document.getElementById("fondo-video");

const pantallaMovil = window.matchMedia("(max-width: 600px)");
const imagenesFondo = ["DvV.jpg", "NDV.jpg", "aura.jpg"];

let temporizadorFondo;

function mostrarImagen(indice) {
    clearTimeout(temporizadorFondo);

    fondoVideo.pause();
    fondoVideo.hidden = true;

    fondoImagen.src = imagenesFondo[indice];
    fondoImagen.hidden = false;

    temporizadorFondo = setTimeout(function() {
        if (pantallaMovil.matches) {
            mostrarImagen((indice + 1) % imagenesFondo.length);
        } else if (indice === 0) {
            reproducirVideo();
        } else {
            mostrarImagen(0);
        }
    }, 5000);
}

function reproducirVideo() {
    fondoVideo.currentTime = 0;
    fondoVideo.muted = true;

    fondoVideo.play().then(function() {
        if (pantallaMovil.matches) {
            fondoVideo.pause();
            return;
        }

        fondoVideo.hidden = false;
        fondoImagen.hidden = true;
    }).catch(function() {
        if (!pantallaMovil.matches) {
            mostrarImagen(1);
        }
    });
}

fondoVideo.addEventListener("ended", function() {
    mostrarImagen(1);
});

fondoVideo.addEventListener("error", function() {
    if (!pantallaMovil.matches) {
        mostrarImagen(1);
    }
});

pantallaMovil.addEventListener("change", function() {
    mostrarImagen(0);
});

mostrarImagen(0);
