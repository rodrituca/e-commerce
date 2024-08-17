// Botoncito para que no se envíe el formulario
const submit = document.getElementById('regBtn');
// Creamos variables con nombres más sencillos para acceder a los inputs
const inputs = document.querySelectorAll('input');

// Anulamos la acción por default del evento
function validation(event) {
  event.preventDefault();

  // Checkeo de campos no vacíos
  for (let i = 0; i < inputs.length; i++)
    if (inputs[i].value === '') {
      return false;
    }
  return true;
}

submit.addEventListener('click', function (event) {
  console.log(validation(event));
  if (validation(event)) {
    window.location = 'index.html';
    return;
  }
});
