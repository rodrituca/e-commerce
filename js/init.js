// Función encargada de obtener el valor "user" de lo contrario retorna "null"
function isLogged() {
  return sessionStorage.getItem('user');
}

function getCurrentPage() {
  const split = window.location.href.split('/');
  const path = split[split.length - 1];
  return '/' + path;
}

function checkPage(target) {
  return getCurrentPage() === target;
}

// Principal ejecución del código
// Checkea que el valor de isLogged sea true y la pagina en la que se no sea
// "./login.html", de lo contrario entraría en bucle infinito
document.addEventListener('DOMContentLoaded', function () {
  if (!isLogged() && !checkPage('/login.html')) window.location = 'login.html';
  showUsername();
});

function showUsername() {
  const username = sessionStorage.getItem('user');
  document.querySelector('#user').innerHTML = username;
}
