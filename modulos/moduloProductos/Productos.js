
let obj = [];
let indexProductoSeleccionado;
let path = "http://localhost:8080/Proyecto1/modulos/moduloProductos/";
fetch(path + "datoProductos.json")
        .then((response) => {
            return response.json();
        })
        .then(function (jsondata) {
            obj = jsondata;
            console.log(obj);
            actuaLizaTabla();
        });
        function validarCampos() {
    // Obtener los valores de los campos
    let nombre = document.getElementById("txtnomProd").value.trim();
    let descripcion = document.getElementById("txtdescripcion").value.trim();
    let precio = document.getElementById("txtprecio").value.trim();
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

function actuaLizaTabla() {
    let cuerpo = "";
    obj.forEach(function (elemento) {
        let registro = '<tr>' +
                '<tr onclick="selectPlatillo(' + obj.indexOf(elemento) + ');">' +
                '<td >' + obj.indexOf(elemento) + '</td>' +
                '<td>' + elemento.nomProd + '</td>' +
                '<td>' + elemento.Descripcion + '</td>' +
                '<td><img src="' + elemento.foto + '"width="100"></td>' +
                '<td>' + elemento.Precio + '</td>' +
                '<td>' + elemento.Categoria + '</td>' +
                '<td>' + elemento.Estatus + '</td>' +
                '</tr>';
        cuerpo += registro;
    });
    document.getElementById("tblProductos").innerHTML = cuerpo;

}

//visualizar la tabla
function selectPlatillo(index) {
    document.getElementById("txtnomProd").value = obj[index].nomProd;
    document.getElementById("txtdescripcion").value = obj[index].Descripcion;
    document.getElementById("txtprecio").value = obj[index].Precio;
    document.getElementById("txtTipo").value = obj[index].Categoria;
    document.getElementById("txtEstatus").value = obj[index].Estatus;
    document.getElementById("txtFoto").src = obj[index].foto;
    document.getElementById("txtFotoRuta").value = "";
    indexProductoSeleccionado = index;
    document.getElementById("btnModificar").classList.remove("disabled");//se activa
    document.getElementById("btnLimpiar").classList.remove("disabled");//se activa
    document.getElementById("btnEliminar").classList.remove("disabled");//se activa
    document.getElementById("btnAgregar").classList.remove("disabled");//se desactiva

}


function limpiar() {
    document.getElementById("txtnomProd").value = "";
    document.getElementById("txtdescripcion").value = "";
    document.getElementById("txtprecio").value = "";
    document.getElementById("txtTipo").value = "";
    document.getElementById("txtEstatus").value = "";
    document.getElementById("txtFoto").src = "img/nada.jpg";
    document.getElementById('txtFotoRuta').value = "";
    document.getElementById("btnAgregar").classList.remove("disabled");
    document.getElementById("btnEliminar").classList.add("disabled");
    document.getElementById("btnLimpiar").classList.add("disabled");
    document.getElementById("btnModificar").classList.add("disabled");
    indexProductoSeleccionado = 0;
}

function obtenerNombreFoto(nombreFoto) {
    nombreFoto = document.getElementById("txtFotoRuta").value;
    nombreFoto = 'img/' + nombreFoto.substring(nombreFoto.lastIndexOf("\\") + 1);
    return nombreFoto;
    actualizaTabla();
    limpiar();
}

async function despliegaFoto() {
    imageURL = obtenerNombreFoto(document.getElementById("txtFotoRuta").value);
    imageURL = path + imageURL;
    const response = await fetch(imageURL);
    const imageBlob = await response.blob();
    const reader = new FileReader();
    reader.readAsDataURL(imageBlob);
    reader.onloadend = function () {
        const imageElement = new Image();
        imageElement.src = reader.result;
        imageElement.width = 400;
        document.getElementById('txtFoto').src = imageElement.src;
    };
}


function agregarPlatillo() {
    if (!validarCampos()) return; // Si la validación falla, no continuar

    let nombre = document.getElementById("txtnomProd").value;
    let descripcion = document.getElementById("txtdescripcion").value;
    let precio = document.getElementById("txtprecio").value;
    let Categoria = document.getElementById("txtTipo").value;
    let Estatus = document.getElementById("txtEstatus").value;
    let fotoNueva = obtenerNombreFoto();

    let newProd = {
        nomProd: nombre,
        Descripcion: descripcion,
        Precio: precio,
        foto: fotoNueva,
        Categoria: Categoria,
        Estatus: Estatus
    };

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
    indexProductoSeleccionado = 0;
}

function modificaPlatillo(index) {
    index = indexProductoSeleccionado;
    if (index !== undefined && index !== null) {
        let nombre = document.getElementById("txtnomProd").value;
        let descripcion = document.getElementById("txtdescripcion").value;
        let precio = document.getElementById("txtprecio").value;
        let Categoria = document.getElementById("txtTipo").value;
        let Estatus = document.getElementById("txtEstatus").value;
        if (confirm("¿Deseas cambiar la foto?"))
        {
            let foto = obtenerNombreFoto();
            obj[index].foto = obtenerNombreFoto();
            obj[index].nomProd = nombre;
            obj[index].Descripcion = descripcion;
            obj[index].Precio = precio;
            obj[index].Categoria = Categoria;
            obj[index].Estatus = Estatus;
            obj[index].foto = foto;
        } else {
            obj[index].nomProd = nombre;
            obj[index].Descripcion = descripcion;
            obj[index].Precio = precio;
            obj[index].Categoria = Categoria;
            obj[index].Estatus = Estatus;
        }
        actuaLizaTabla();
        limpiar();
    }
}
function eliminarPlatillo() {
    let index = indexProductoSeleccionado;
    console.log('Índice seleccionado:', index);
    
    if (index !== undefined && index !== null && index >= 0 && index < obj.length) {
        let producto = obj[index];
        
        console.log('Producto seleccionado:', producto);
        
        if (producto.Estatus.toLowerCase() === "desactivo") {
            if (confirm("¿Estás seguro de eliminar este producto?")) {
                obj.splice(index, 1);
                actuaLizaTabla();
                limpiar();
            }
        } else {
            alert("Solo se puede eliminar productos con estatus 'desactivo'.");
        }
    } else {
        alert("Selecciona un producto antes de intentar eliminarlo.");
    }
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