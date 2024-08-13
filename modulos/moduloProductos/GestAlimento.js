let obj = [];
let indexProductoSeleccionado;
let path = "http://localhost:8080/Proyecto1/modulos/moduloProductos/";
fetch(path+"datoProductos.json")
        .then((response) => {
            return response.json();
        })
        .then(function (jsondata) {
            obj = jsondata;
            console.log(obj);
            ActualizaAlimentos();
        });


function ActualizaAlimentos() {
    let cuerpo = "";
    obj.forEach(function (elemento, index) {
        let registro = '<div class="col-lg-4 col-md-6 mb-4 ">'+
                '<div  class="card h-100 " onclick="selectPlatillo(' + obj.indexOf(elemento) + ');">' +
                 '<img src="'+ elemento.foto + '" class="card-img-top" >'+
                '<div class="card-body">'+
                 '<h4 class="card-title">'+elemento.nomProd +'</h4>'+
                 '<p class="card-text">'+ elemento.Descripcion + '</p>'+
                 '<p class="card-text" >'+ 'Precio: ' + elemento.Precio + '</p>'+
                 '<p class="card-text">'+ 'Categoria: '+elemento.Categoria + '</p>'+
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
