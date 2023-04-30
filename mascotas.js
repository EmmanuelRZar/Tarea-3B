const formMascotas = document.querySelector('#form-mascotas');

formMascotas.addEventListener('submit', (e) => {
  e.preventDefault();

  // Validación de datos
  const idMascota = formMascotas.querySelector('#id_mascota').value;
  const nombre = formMascotas.querySelector('#nombre').value;
  const fechaNacimiento = formMascotas.querySelector('#fecha_nacimiento').value;
  const especie = formMascotas.querySelector('#especie').value;
  const raza = formMascotas.querySelector('#raza').value;
  const sexo = formMascotas.querySelector('#sexo').value;
  const idCliente = formMascotas.querySelector('#id_cliente').value;
  const imagen = formMascotas.querySelector('#imagen').value;

  if (!idMascota || !nombre || !fechaNacimiento || !especie || !raza || !sexo || !idCliente || !imagen) {
    alert('Por favor, complete todos los campos');
    return;
  }

  // Envío de datos al servidor
  const data = {
    id_mascota: idMascota,
    nombre: nombre,
    fecha_nacimiento: fechaNacimiento,
    especie: especie,
    raza: raza,
    sexo: sexo,
    id_cliente: idCliente,
    imagen: imagen,
  };

  fetch('/mascotas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        alert('Mascota agregada con éxito');
        formMascotas.reset();
      } else {
        alert('Error al agregar la mascota');
      }
    })
    .catch((error) => {
      console.error(error);
      alert('Error de conexión');
    });
});