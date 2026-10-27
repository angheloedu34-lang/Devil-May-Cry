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