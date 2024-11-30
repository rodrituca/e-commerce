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

// Esta función extrae el ElementoHTML de la lista de elementos "inputs"
// y luego crea un objeto en sessionStorage con el valor de user y el nombre de usuario
function createSession() {
  // Transformamos la lista de nodos (inputs) en un arreglo y luego utilizamos
  // el método filter para extraer el nombre de usuario
  const [user] = Array.from(inputs).filter(
    (element) => element.id === 'username',
  );

  sessionStorage.setItem('user', user.value);
}

submit.addEventListener('click', function (event) {
  if (validation(event)) {
    createSession();
    window.location = 'index.html';
    return;
  }
});

