// Anulamos la acción por default del evento
function validation(event) {
    event.preventDefault()

// Creamos variables con nombres más sencillos para acceder a los inputs
var inputs = document.querySelectorAll("input");

// Checkeo de campos no vacíos
for (var i=0; i<inputs.length; i++)
    if (inputs [i].value === "") {
    return false;
    }
return true
}

// Botoncito para que no se envíe el formulario
var sumbit = document.getElementById("regBtn")
sumbit.addEventListener("click", function (event) {
    console.log(validation(event)) 
if (validation(event)) {
    window.location = "index.html";
    return
}
 })