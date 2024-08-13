
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
  function actualizaTabla() {
    let cuerpo = "";
    obj.forEach(function (elemento) {
        let registro = '<div class="col-lg-4 col-md-6 mb-4 ">' +
                '<div  class="card h-100 " (' + obj.indexOf(elemento) + ');">' +
                '<img src="'+ elemento.foto + '" class="card-img-top" >'+
                '<div class="card-body">'+
                '<h4 class="card-title">'+elemento.nomProd +'</h4>'+
                '<p class="card-text">'+ elemento.descripcion + '</p>'+
                  '<p class="card-text" >'+ 'Precio: ' + elemento.precio + '</p>'+
                   '<p class="card-text">'+ 'Categoria: '+elemento.tipo + '</p>'+
              ' </div>'+
                
                ' </div>'+
                
                ' </div>';
        cuerpo += registro;
    });
    document.getElementById("tblProductos").innerHTML = cuerpo;
}      

function search() {
     var num_cols, display, input, filter, table_body, p, h4,div, i, txtValue;
    num_cols = 3;
    input = document.getElementById("inputBusqueda");
    filter = input.value.toUpperCase();
    table_body = document.getElementById("tblProductos");
    div = table_body.getElementsByTagName("div");

    for (i = 0; i < div.length; i++) {
        display = "none";
        for (j = 0; j < num_cols; j++) {
            p = div[i].getElementsByTagName("p")[j];
            h4 = div[i].getElementsByTagName("h4")[j];
            if (p) {
                txtValue = p.textContent || p.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    display = "";
                }
            }
             if (h4) {
                txtValue = h4.textContent || h4.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    display = "";
                }
            }
        }
        div[i].style.display = display;
      
    }
}
