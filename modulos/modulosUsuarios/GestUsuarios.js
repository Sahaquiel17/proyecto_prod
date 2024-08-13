let obj = []; // Arreglo que se llenará de objetos JSON
let indexProductosSeleccionados; // Índice del arreglo
let path = "DatosUsuario.json";

// Cargar datos del archivo JSON
fetch(path)
    .then(response => response.json())
    .then(jsondata => {
        obj = jsondata;
        console.log(obj);
        actualizaTabla();
    })
    .catch(error => {
        console.error('Error al cargar el JSON:', error);
    });

// Validar los campos del formulario
function validarCampos() {
    // Obtener los valores de los campos
    let nombre = document.getElementById("txtNombres").value.trim();
    let contrasena = document.getElementById("txtContrasenas").value.trim();
    
    // Verificar si algún campo está vacío
    if (!nombre || !contrasena) {
        alert("Todos los campos son obligatorios. Por favor, completa todos los campos.");
        return false;
    }
   
    // Validar la contraseña
    if (!validarContrasena(contrasena)) return false;

    return true;
}

// Validar la contraseña
function validarContrasena(contrasena) {
    // Regla: al menos 6 caracteres, al menos una letra y un número
    const longitudMinima = 6;
    const tieneLetra = /[a-zA-Z]/.test(contrasena);
    const tieneNumero = /[0-9]/.test(contrasena);

    if (contrasena.length < longitudMinima || !tieneLetra || !tieneNumero) {
        alert("La contraseña debe tener al menos 6 caracteres, contener al menos una letra y un número.");
        return false;
    }
    return true;
}

// Actualizar la tabla con los datos del arreglo
function actualizaTabla() {
    let cuerpo = "";
    obj.forEach(function (elemento, index) {
        let registro = `<tr onclick="selectProducto(${index});">` +
                       `<td>${index}</td>` +
                       `<td>${elemento.nomProd}</td>` +
                       `<td>${elemento.contrasena}</td>` +
                       `<td>${elemento.Estatus}</td>` +
                       `</tr>`;
        cuerpo += registro;
    });
    document.getElementById("tblProductos").innerHTML = cuerpo;
}

// Seleccionar un producto y mostrar en el formulario
function selectProducto(index) {
    document.getElementById("txtNombre").value = obj[index].nomProd;
    document.getElementById("txtContrasena").value = obj[index].contrasena;
    indexProductosSeleccionados = index;

    var myModal = new bootstrap.Modal(document.getElementById('formModal'));
    myModal.show();
}

// Limpiar el formulario
function limpiar() {
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtContrasena").value = "";
    
    indexProductosSeleccionados = null; // Usar null en lugar de 0 para indicar que no hay selección
}

// Limpiar los campos de agregar
function limpiare() {
    document.getElementById("txtNombres").value = "";
    document.getElementById("txtContrasenas").value = "";
    indexProductosSeleccionados = null; // Usar null en lugar de 0 para indicar que no hay selección
}

// Buscar en la tabla de productos
function search() {
    var num_cols = 4; // Cambiado a 4 ya que la tabla tiene 4 columnas
    var input = document.getElementById("inputBusqueda");
    var filter = input.value.toUpperCase();
    var table_body = document.getElementById("tblProductos");
    var tr = table_body.getElementsByTagName("tr");

    for (var i = 0; i < tr.length; i++) {
        var display = "none";
        var td = tr[i].getElementsByTagName("td");

        for (var j = 0; j < num_cols; j++) {
            if (td[j]) {
                var txtValue = td[j].textContent || td[j].innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    display = "";
                    break; // Salir del bucle si se encuentra una coincidencia
                }
            }
        }
        tr[i].style.display = display;
    }
}

// Agregar un nuevo producto
function agregarProducto() {
    if (!validarCampos()) return; 
    
    let nombre = document.getElementById("txtNombres").value;
    let contrasena = document.getElementById("txtContrasenas").value;

    let newProd = {
        nomProd: nombre,
        contrasena: contrasena,
        Estatus: "Activo"
    };

    obj.push(newProd);

    let jsonData = JSON.stringify(obj);
    console.log(jsonData);
    console.log(typeof (jsonData));
    actualizaTabla();
    limpiare();
}

// Modificar un producto existente
function modificaProducto() {
    if (indexProductosSeleccionados === undefined || indexProductosSeleccionados === null) {
        alert("No hay ningún producto seleccionado para modificar.");
        return;
    }

    // Obtener los valores del formulario
    let nombre = document.getElementById("txtNombre").value.trim();
    let contrasena = document.getElementById("txtContrasena").value.trim();

    // Validar los campos
    if (!nombre || !contrasena) {
        alert("Todos los campos son obligatorios. Por favor, completa todos los campos.");
        return;
    }

    // Confirmar la modificación
    if (confirm("¿Desea cambiar el Usuario?")) {
        // Actualizar el producto con los nuevos datos, preservando el estatus actual
        obj[indexProductosSeleccionados] = {
            nomProd: nombre,
            contrasena: contrasena,
            Estatus: obj[indexProductosSeleccionados].Estatus // Mantener el estatus actual
        };
    }

    // Actualizar la tabla y limpiar el formulario
    actualizaTabla();
    limpiar();
}

// Eliminar un producto (solo desactivación del estatus)
function eliminarProducto() {
    if (indexProductosSeleccionados === undefined || indexProductosSeleccionados === null) {
        alert("No hay ningún producto seleccionado para eliminar.");
        return;
    }
    
    if (confirm("¿Desea eliminar el Usuario?")) {
        obj[indexProductosSeleccionados].Estatus = "Desactivo";
    }
    actualizaTabla();
    limpiar();
}

// Activar un producto
function activarProducto() {
    if (indexProductosSeleccionados === undefined || indexProductosSeleccionados === null) {
        alert("No hay ningún producto seleccionado para activar.");
        return;
    }
    
    if (confirm("¿Desea activar el Usuario?")) {
        obj[indexProductosSeleccionados].Estatus = "Activo";
    }
    actualizaTabla();
    limpiar();
}
