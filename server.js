const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const multer = require("multer");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname +  '/public'));

app.set('view engine', 'ejs');

// Configuración de la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'EmmanuelR',
  password: '123456',
  database: 'veterinaria',
});

connection.connect((error) => {
  if (error) {
    console.error('Error de conexión a la base de datos: ', error);
  } else {
    console.log('Conexión a la base de datos exitosa');
  }
});
const upload = multer({
  dest: 'public/imagenes',
  fileFilter: function(req, file, cb){
  if(!file.originalname.match(/\.(jpg|jpeg)$/)){
      return cb(new Error('Solo se permiten archivos JPG'));
  }
  cb(null, true);
  }// fin filefilter
}) // fin multer

// Manejador de solicitudes POST para agregar una nueva mascota
app.post('/nueva',upload.single('file'), (req, res) => {
  const mascotas = req.body;
  connection.query('INSERT INTO mascotas SET ?', mascotas, (error, result) => {
    if (error) {
      console.error('Error al agregar la mascota: ', error);
      res.status(500).send('Error interno del servidor');
    } else {
      console.log('Mascota agregada con éxito');
      res.status(200).send('Mascota agregada con éxito');
    }
  });
});
// Manejador de solicitudes GET para mostrar la lista de clientes y mascotas

app.get('/', (req, res) => {
  connection.query(`
  SELECT mascotas.nombre AS mascota_nombre, mascotas.raza, clientes.nombre AS cliente_nombre, membresia.tipo_membresia AS tipo_membresia, mascotas.imagen AS mascota_imagen
  FROM clientes
  JOIN mascotas ON clientes.id_cliente = mascotas.id_cliente
  JOIN membresia ON clientes.id_cliente = membresia.id_cliente;

`, (error, results) => {
  if (error) {
    throw error;
  }

  // Enviar los resultados a la plantilla de vista
  res.render('index', { resultados: results });
});
  });



  // Manejador de solicitudes GET para mostrar el formulario para agregar un nuevo cliente
  app.get('/clientes/agregar', (req, res) => {
    res.render('clientes.ejs');
  });
  

// Manejador de solicitudes POST para agregar un nuevo cliente
app.post('/agregar',  (req, res) => {
  const cliente = req.body;

  connection.query('INSERT INTO clientes SET ?', cliente, (error, result) => {
    if (error) {
      console.error('Error al agregar el cliente: ', error);
      res.status(500).send('Error interno del servidor');
    } else {
      console.log('Cliente agregado con éxito');
      res.status(200).send('Cliente agregado con éxito');
    }
  });
});

// Manejador de solicitudes POST para agregar una nueva membresía
app.post('/nuevo', (req, res) => {
  const membresia = req.body;

  connection.query('INSERT INTO membresia SET ?', membresia, (error, result) => {
    if (error) {
      console.error('Error al agregar la membresía: ', error);
      res.status(500).send('Error interno del servidor');
    } else {
      console.log('Membresía agregada con éxito');
      res.status(200).send('Membresía agregada con éxito');
    }
  });
});
// Ruta para el formulario de mascotas
app.get('/mascotas/nueva', (req, res) => {
    res.render('mascotas.ejs');
  });
  
  // Ruta para el formulario de membresías
  app.get('/membresia/nuevo', (req, res) => {
    res.render('membresia.ejs');
  });

// Iniciar el servidor
app.get("/index", (req, res) =>{
  return res.redirect("index.ejs");
}).listen(3000);

console.log('Escuchando el puerto 3000');