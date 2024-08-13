/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */

let obj = []; // arreglo que se llenara de objetos JSON
let indexProductosSeleccionados; // es el indice del arreglo
let path="http://localhost:8080/Proyecto1/modulos/modulosProductos_yuli/";


fetch(path+"producto.json")
        .then((response) => {
            return response.json();
        })
        .then(function (jsondata) {
            obj = jsondata;
            console.log(obj);
            actualizaTabla();
        });
         function validarCampos() {
    // Obtener los valores de los campos
    let nombre = document.getElementById("txtNombre").value.trim();
    let descripcion = document.getElementById("txtDescripcion").value.trim();
    let precio = document.getElementById("txtPrecio").value.trim();
    let categoria = document.getElementById("txtTipo").value.trim();
    let estatus = document.getElementById("txtEstatus").value.trim();
    let fotoRuta = document.getElementById("txtFotoRuta").value.trim();
    
    // Verificar si algún campo está vacío
    if (!nombre || !descripcion || !precio || !categoria || !estatus || !fotoRuta) {
        alert("Todos los campos son obligatorios. Por favor, completa todos los campos.");
        return false;
    }
    if (isNaN(precio) || parseFloat(precio) <= 0) {
        alert("Por favor, ingresa un precio válido.");
        return false;
    }
    return true;
}
  function actualizaTabla() {
    let cuerpo = "";
    obj.forEach(function (elemento) {
        let registro = '<tr>' +
                '<tr onclick="selectProducto(' + obj.indexOf(elemento) + ');">' +
                '<td>' + obj.indexOf(elemento) + '</td>' +
                '<td>' + elemento.nomProd + '</td>' +
                '<td>' + elemento.descripcion + '</td>' +
                '<td>' + elemento.precio + '</td>' +
                '<td> <img src="' + elemento.foto + '" width="100"> </td>' +
                '<td>' + elemento.tipo + '</td>' +
                '<td>' + elemento.estatus + '</td>' +
                '</tr>'+
                '</tr>';
        cuerpo += registro;
    });
    document.getElementById("tblProductos").innerHTML = cuerpo;
}      



function selectProducto(index) {
    document.getElementById("txtNombre").value = obj[index].nomProd;
    document.getElementById("txtDescripcion").value = obj[index].descripcion;
    document.getElementById("txtPrecio").value = obj[index].precio;
    document.getElementById("txtTipo").value = obj[index].tipo;
    document.getElementById("txtFoto").src = obj[index].foto;
     document.getElementById("txtEstatus").value = obj[index].estatus;
    document.getElementById("txtFotoRuta").value = "";
    indexProductosSeleccionados = index;
    document.getElementById("btnAgregar").classList.remove("disabled");
    document.getElementById("btnEliminar").classList.remove("disabled");
    document.getElementById("btnLimpiar").classList.remove("disabled");
    document.getElementById("btnModificar").classList.remove("disabled");

}

function limpiar() {
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtDescripcion").value = "";
    document.getElementById("txtPrecio").value = "";
    document.getElementById("txtTipo").value = "";
    document.getElementById("txtFoto").src = "img/nada.jpg";
 document.getElementById("txtEstatus").value = "";
    document.getElementById("txtFotoRuta").value = "";
    document.getElementById("btnAgregar").classList.remove("disabled");
    document.getElementById("btnEliminar").classList.add("disabled");
    document.getElementById("btnLimpiar").classList.add("disabled");
    document.getElementById("btnModificar").classList.add("disabled");
    indexProductosSeleccionados = 0;
}

function search() {
    var num_cols, display, input, filter, table_body, tr, td, i, txtValue;
    num_cols = 7;
    input = document.getElementById("inputBusqueda");
    filter = input.value.toUpperCase();
    table_body = document.getElementById("tblProductos");
    tr = table_body.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        display = "none";
        for (j = 0; j < num_cols; j++) {
            td = tr[i].getElementsByTagName("td")[j];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    display = "";
                }
            }
        }
        tr[i].style.display = display;
      
    }
}
function obtenerNombreFoto(nombreFoto) {
    nombreFoto = document.getElementById("txtFotoRuta").value;
    nombreFoto = 'img/'+nombreFoto.substring(nombreFoto.lastIndexOf("\\") + 1);
    return nombreFoto;
    actualizaTabla();
    limpiar();
}

async function despliegaFoto() {
    imageUrl=obtenerNombreFoto(document.getElementById("txtFotoRuta").value);
    imageUrl=path+imageUrl;
    
    const response = await fetch(imageUrl);
    const imageBlob = await response.blob();
    const reader = new FileReader();
    reader.readAsDataURL(imageBlob); // codificar
    reader.onloadend = function () { // proyectar o decodificar
        const imageElement = new Image();
        imageElement.src = reader.result;
        imageElement.width = 400;
        document.getElementById('txtFoto').src=imageElement.src;
    };
     
}
function agregarProducto() {
    if (!validarCampos()) return; // Si la validación falla, no continuar

   let nombre, descripcion, precio, foto, tipo;
    nombre = document.getElementById("txtNombre").value;
    tipo = document.getElementById("txtTipo").value;
    descripcion = document.getElementById("txtDescripcion").value;
    foto = obtenerNombreFoto();
     let estatus = document.getElementById("txtEstatus").value;
    precio = document.getElementById("txtPrecio").value;
    fotoNueva = obtenerNombreFoto();

   let newProd = {};
    newProd.nomProd = nombre;
    newProd.descripcion = descripcion;
    newProd.precio = precio;
    newProd.foto = fotoNueva;
    newProd.tipo = tipo;
    estatus: estatus;
    obj.push(newProd);
    
    let jsonData = JSON.stringify(obj);
    console.log(jsonData);
    console.log(typeof (jsonData));
    limpiar();
    actuaLizaTabla();
   document.getElementById("btnAgregar").classList.add("disabled");
    document.getElementById("btnEliminar").classList.remove("disabled");
    document.getElementById("btnLimpiar").classList.remove("disabled");
    document.getElementById("btnModificar").classList.remove("disabled");
    indexProductosSeleccionados = 0;
}

function modificaProducto(index) {
    index = indexProductosSeleccionados;
    if (index !== undefined && index !== null) {
        let nombre = document.getElementById("txtNombre").value;
        let descripcion = document.getElementById("txtDescripcion").value;
        let precio = document.getElementById("txtPrecio").value;
        let tipo = document.getElementById("txtTipo").value;
 let estatus = document.getElementById("txtEstatus").value;
        if (confirm("¿Desea cambiar el producto?")) {
            let foto = obtenerNombreFoto();
            obj[index].foto = obtenerNombreFoto();
            obj[index].nomProd = nombre;
            obj[index].descripcion = descripcion;
            obj[index].precio = precio;
            obj[index].tipo = tipo;
            obj[index].foto = foto;
            obj[index].estatus = estatus;
        } else {
            obj[index].nomProd = nombre;
            obj[index].descripcion = descripcion;
            obj[index].precio = precio;
            obj[index].tipo = tipo;
            obj[index].estatus = estatus;
        }
    }
    actualizaTabla();
    limpiar();
}

//function eliminarProducto(index) {
//    index = indexProductosSeleccionados;
//    if (index !== undefined && index !== null) {
//        if (confirm("¿Quieres borrar?")) {
//            obj.splice(index, 1);
//            actualizaTabla();
//            limpiar();
//        }
//    } else {
//        alert("Selecciona elemento a eliminar");
//    }
//    actualizaTabla();
//    limpiar();
//}
function eliminarProducto() {
    let index = indexProductosSeleccionados;
    console.log('Índice seleccionado:', index);
    
    if (index !== undefined && index !== null && index >= 0 && index < obj.length) {
        let producto = obj[index];
        
        console.log('Producto seleccionado:', producto);
        
        if (producto.estatus.toLowerCase() === "desactivo") {
            if (confirm("¿Estás seguro de eliminar este producto?")) {
                obj.splice(index, 1);
              
            }
        } else {
            alert("Solo se puede eliminar productos con estatus 'desactivo'.");
        }
    } else {
        alert("Selecciona un producto antes de intentar eliminarlo.");
    }
      actualizaTabla();
                limpiar();
}
