/*
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
*/

document.addEventListener("DOMContentLoaded", ()=> {
  const loginButton = document.getElementById("regBtn");
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", async (event) => {

    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({username, password}),
      });

    if (response.ok) {
      const data = await response.json();
      sessionStorage.setItem("access-token", data.token);
      alert("inicio de sesión exitoso");
      window.location.href = "http://127.0.0.1:5501/index.html";
    } else {
      alert("usuario o contraseña incorrectos");
    }
    } catch (error) {
      console.error("error al iniciar sesión", error);
      alert("Error al intentar conectarse con el servidor");
    }
  });

});