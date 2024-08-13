let usuarios = []; // Arreglo para almacenar los usuarios del JSON

// Ruta del archivo JSON
const path = "http://localhost:8080/Proyecto1/modulos/modulosLogin/admin.json";

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

  // Verificar que los datos 
  if (usuarios.length === 0) {
    alert('Los datos de usuarios no están disponibles');
    return;
  }
  //busqueda
  const usuarioEncontrado = usuarios.find(u => u.usuario === usuario && u.password === password);

  if (usuarioEncontrado) {
    // Autenticación exitosa
    alert('Inicio de sesión exitoso');
    window.location.href = '../modulosUsuarios/Usuarios.html';
    document.getElementById('txtusuario').value =" ";
    document.getElementById('txtpass').value = " ";
  } else {
    // Autenticación fallida
    alert('Credenciales incorrectas');
    document.getElementById('txtusuario').value = " ";
    document.getElementById('txtpass').value = " ";
  }
}
