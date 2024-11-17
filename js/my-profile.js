import showBadge from "./init";

//Funcionalidad para agregar foto de perfil
document.getElementById('fileInput').addEventListener('change', function(event) {
  const file = event.target.files[0]; // Obtiene el archivo seleccionado

  if (file) {
    const reader = new FileReader(); // Crea un FileReader para leer el archivo

    reader.onload = function(e) {
      const imageUrl = e.target.result; // Obtiene la URL de la imagen

      // Cambia la imagen en el perfil
      document.getElementById('perfil').src = imageUrl;
      localStorage.setItem('saveImage', imageUrl);
    };

    reader.readAsDataURL(file); // Lee el archivo como una URL de datos
  }
});

// Función para eliminar la imagen guardada al cerrar sesión
document.getElementById('logout').addEventListener('click', function() {
  localStorage.removeItem('saveImage'); // Borra la imagen de localStorage
  document.getElementById('perfil').src = "img/Foto de perfil.webp"; // Vuelve a la imagen por defecto
});

function saveChanges(){
  const botoncito = document.getElementById('btnSaveChanges');
  botoncito.addEventListener("click", function(){
    const imageUrl = document.getElementById('perfil').src;
    localStorage.setItem('saveImage', imageUrl); 
  });
}

window.onload = function() {
  const savedImage = localStorage.getItem('saveImage');
  if (savedImage) {
      document.getElementById('perfil').src = savedImage;
  }
  saveChanges();
};

//Validación de datos obligatorios
const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');
const email = document.getElementById('email');
const segundoNombre = document.getElementById('segundoNombre');
const segundoApellido = document.getElementById('segundoApellido');
const telefono = document.getElementById('telefono');
const btnSave = document.getElementById('btnSaveChanges');
const userInfo = document.getElementById('userInfo');
const requiredInputs = [nombre, apellido, email];

// Comprobar si los campos obligatorios están vacíos
function validation() {
  let valid = true;
  requiredInputs.forEach(input => input.setCustomValidity(""));
  requiredInputs.forEach(input => {
    if (input.value.trim() === "") {
      input.setCustomValidity("Este campo es obligatorio.");
      valid = false;
    }
  });
  return valid;
}

//Sirve para eliminar el mensaje de error al momento de escribir en el campo
requiredInputs.forEach(input => {
  input.addEventListener('input', function () {
    //Si hay texto en el campo, se elimina el mensaje de error
    if (input.value.trim() !== "") {
      input.setCustomValidity("");
    }
  });
});

// Validar al hacer click en Guardar cambios
btnSave.addEventListener("click", function(event) {
  event.preventDefault();
  if (validation()) {
    const userData = {
      nombre: nombre.value,
      apellido: apellido.value,
      email: email.value,
      segundoNombre: segundoNombre.value,
      segundoApellido: segundoApellido.value,
      telefono: telefono.value
    };
    localStorage.setItem('userInfo', JSON.stringify(userData));
    alert("Formulario enviado correctamente.");
    userInfo.classList.remove("was-validated"); 
  } else {
    userInfo.classList.add("was-validated"); 
    alert("Por favor, corrige los errores en el formulario.");
  }
});

// Cargar los datos guardados desde localStorage al recargar la página
document.addEventListener('DOMContentLoaded', function() {
  const savedUserInfo = localStorage.getItem('userInfo');
  
  if (savedUserInfo) {
    const userData = JSON.parse(savedUserInfo);
    nombre.value = userData.nombre;
    apellido.value = userData.apellido;
    email.value = userData.email;
    segundoNombre.value = userData.segundoNombre;
    segundoApellido.value = userData.segundoApellido;
    telefono.value = userData.telefono;
  }
});

// Función para cerrar sesión y borrar los datos del localStorage
function cerrarSesion() {
  localStorage.removeItem('userInfo');
}

// Asociar la función de cerrar sesión al clic del enlace de cerrar sesión
const logoutButton = document.getElementById('logout');
logoutButton.addEventListener('click', cerrarSesion);

//Pa que venga predefinido el campo email
document.getElementById('email').value = sessionStorage.getItem('user')

showBadge()