// Botón Switch
const switchButton = document.getElementById('BtnSwitch');

// Sirve para saber en qué modo se encuentra
const modoDiaNoche = localStorage.getItem('modo');

// Si el modo actual es noche, se aplica el modo oscuro
if (modoDiaNoche === 'noche') {
  document.body.classList.add('bg-dark', 'text-white');

  // Seleccionar todas las card-body y card-header
  const cardBodies = document.querySelectorAll('.card-body');
  cardBodies.forEach(function(cardBody) {
    cardBody.classList.add('bg-dark', 'text-white');
  });
  
  const cardHeaders = document.querySelectorAll('.card-header');
  cardHeaders.forEach(function(cardHeader) {
    cardHeader.classList.add('bg-dark', 'text-white');
  });
  
  // El botón queda activado
  switchButton.checked = true;
} else {
  // Si no, se aplica el modo claro (día)
  document.body.classList.add('bg-light', 'text-dark');
}

// Función para cambiar el modo día/noche
function cambiar() {
  const activado = switchButton.checked;
  
  // Seleccionar todas las card-body y card-header
  const cardBodies = document.querySelectorAll('.card-body');
  const cardHeaders = document.querySelectorAll('.card-header');

  // Si está activado = modo oscuro
  if (activado) {
    // Cambiar el modo del body a oscuro
    document.body.classList.remove('bg-light', 'text-dark');
    document.body.classList.add('bg-dark', 'text-white');

    // Cambiar el estilo de todas las card-body
    cardBodies.forEach(function(cardBody) {
      cardBody.classList.remove('bg-light', 'text-dark');
      cardBody.classList.add('bg-dark', 'text-white');
    });

    // Cambiar el estilo de todas las card-header
    cardHeaders.forEach(function(cardHeader) {
      cardHeader.classList.remove('bg-light', 'text-dark');
      cardHeader.classList.add('bg-dark', 'text-white');
    });

    // Guardar el modo en el localStorage como 'noche'
    localStorage.setItem('modo', 'noche');

  // Si no está activado = modo claro
  } else {
    // Cambiar el modo del body a claro
    document.body.classList.remove('bg-dark', 'text-white');
    document.body.classList.add('bg-light', 'text-dark');

    // Cambiar el estilo de todas las card-body
    cardBodies.forEach(function(cardBody) {
      cardBody.classList.remove('bg-dark', 'text-white');
      cardBody.classList.add('bg-light', 'text-dark');
    });

    // Cambiar el estilo de todas las card-header
    cardHeaders.forEach(function(cardHeader) {
      cardHeader.classList.remove('bg-dark', 'text-white');
      cardHeader.classList.add('bg-light', 'text-dark');
    });

    // Guardar el modo en el localStorage como 'dia'
    localStorage.setItem('modo', 'dia');
  }
}

// Agregamos la función cambiar al evento 'change' del switchButton
switchButton.addEventListener('change', cambiar);
