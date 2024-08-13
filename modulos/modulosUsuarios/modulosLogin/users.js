let usuarios = []; // Arreglo para almacenar los usuarios del JSON

// Ruta del archivo JSON
const path = "DatosUsuarios.json";

// Cargar los datos de usuarios desde el archivo JSON
fetch(path)
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al cargar el archivo JSON');
    }
    return response.json();
  })
  .then(jsondata => {
    usuarios = jsondata; // Asignar los datos al arreglo de usuarios
    console.log('Usuarios cargados:', usuarios);
  })
  .catch(error => {
    console.error('Error al obtener usuarios:', error);
    alert('No se pudo cargar la información de usuarios');
  });

// Función para iniciar sesión
function iniciarsesion() {
  const usuario = document.getElementById('txtusuario').value.trim();
  const password = document.getElementById('txtpass').value.trim();

  // Verificar que el usuario y la contraseña no estén vacíos
  if (!usuario || !password) {
    alert('Por favor, complete todos los campos');
    return;
  }

  // Verificar que los datos de usuarios están disponibles
  if (usuarios.length === 0) {
    alert('Los datos de usuarios no están disponibles');
    return;
  }

  // Buscar el usuario en la lista de usuarios
  const usuarioEncontrado = usuarios.find(u => u.nomProd === usuario && u.contrasena === password);

  if (usuarioEncontrado) {
    // Autenticación exitosa
    alert('Inicio de sesión exitoso');
    window.location.href = '../../modulosUsuarios/Usuarios.html'; // Redirige al usuario
  } else {
    // Autenticación fallida
    alert('Credenciales incorrectas');
  }

  // Limpiar los campos
  document.getElementById('txtusuario').value = "";
  document.getElementById('txtpass').value = "";
}
