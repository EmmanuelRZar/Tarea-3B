const formClientes = document.querySelector('#form-clientes');

formClientes.addEventListener('submit', (e) => {
  e.preventDefault();

  // Validación de datos
  const idCliente = formClientes.querySelector('#id_cliente').value;
  const nombre = formClientes.querySelector('#nombre').value;
  const correoElectronico = formClientes.querySelector('#correo_electronico').value;
  const telefono = formClientes.querySelector('#telefono').value;
  const direccion = formClientes.querySelector('#direccion').value;
  const fechaRegistro = formClientes.querySelector('#fecha_registro').value;

  if (!idCliente || !nombre || !correoElectronico || !telefono || !direccion || !fechaRegistro) {
    alert('Por favor, complete todos los campos');
    return;
  }

  // Envío de datos al servidor
  const data = {
    id_cliente: idCliente,
    nombre: nombre,
    correo_electronico: correoElectronico,
    telefono: telefono,
    direccion: direccion,
    fecha_registro: fechaRegistro,
  };

  fetch('/clientes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        alert('Cliente agregado con éxito');
        formClientes.reset();
      } else {
        alert('Error al agregar el cliente');
      }
    })
    .catch((error) => {
        console.error(error);
        alert('Error de conexión');
      });
  });