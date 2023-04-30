const formMembresia = document.querySelector('#form-membresia');

formMembresia.addEventListener('submit', (e) => {
  e.preventDefault();

  // Validación de datos
  const idMembresia = formMembresia.querySelector('#id_membresia').value;
  const tipoMembresia = formMembresia.querySelector('#tipo_membresia').value;
  const fechaInicio = formMembresia.querySelector('#fecha_inicio').value;
  const fechaVencimiento = formMembresia.querySelector('#fecha_vencimiento').value;
  const costo = formMembresia.querySelector('#costo').value;
  const idCliente = formMembresia.querySelector('#id_cliente').value;

  if (!idMembresia || !tipoMembresia || !fechaInicio || !fechaVencimiento || !costo || !idCliente) {
    alert('Por favor, complete todos los campos');
    return;
  }

  // Envío de datos al servidor
  const data = {
    id_membresia: idMembresia,
    tipo_membresia: tipoMembresia,
    fecha_inicio: fechaInicio,
    fecha_vencimiento: fechaVencimiento,
    costo: costo,
    id_cliente: idCliente,
  };

  fetch('/membresia', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        alert('Membresía agregada con éxito');
        formMembresia.reset();
      } else {
        alert('Error al agregar la membresía');
      }
    })
    .catch((error) => {
      console.error(error);
      alert('Error de conexión');
    });
});
