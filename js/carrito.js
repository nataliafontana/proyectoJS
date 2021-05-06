window.onload = function () {
    // Variables
    const baseDeDatos = [
        {
            id: 1,
            nombre: 'Pack inicial',
            precio: 7000,
            imagen: 'multimedia/packinstagran-01.png'
        },
        {
            id: 2,
            nombre: 'Pack media',
            precio: 3500,
            imagen: 'multimedia/packinstagran-02.png'
        },
        {
            id: 3,
            nombre: 'Pack Estelar',
            precio: 12000,
            imagen: 'multimedia/packinstagran-03.png'
        }

    ];

    let carrito = [];
    let total = 0;
    const DOMitems = document.querySelector('#items');
    const DOMcarrito = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    const DOMbotonVaciar = document.querySelector('#boton-vaciar');

    // Funciones

   //productos//
    function renderizarProductos() {
        baseDeDatos.forEach((info) => {
            // Estructura
            const miNodo = document.createElement('div');
            miNodo.classList.add('card', 'col-md-6','border-0' );
            // Body
            const miNodoCardBody = document.createElement('div');
            miNodoCardBody.classList.add('card-body');
            // Titulo
            const miNodoTitle = document.createElement('h5');
            miNodoTitle.classList.add('card-title');
            miNodoTitle.textContent = info.nombre;
            // Imagen
            const miNodoImagen = document.createElement('img');
            miNodoImagen.classList.add('img-fluid');
            miNodoImagen.setAttribute('src', info.imagen);
            // Precio
            const miNodoPrecio = document.createElement('p');
            miNodoPrecio.classList.add('card-text');
            miNodoPrecio.textContent = info.precio + '$';
            // Boton 
            const miNodoBoton = document.createElement('button');
            miNodoBoton.classList.add('btn_logout');
            miNodoBoton.textContent = 'agregar';
            miNodoBoton.setAttribute('marcador', info.id);
            miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
            // Insertamos
            miNodoCardBody.appendChild(miNodoImagen);
            miNodoCardBody.appendChild(miNodoTitle);
            miNodoCardBody.appendChild(miNodoPrecio);
            miNodoCardBody.appendChild(miNodoBoton);
            miNodo.appendChild(miNodoCardBody);
            DOMitems.appendChild(miNodo);
        });
    }

    
    function anyadirProductoAlCarrito(evento) {
        // Anyadimos el Nodo a nuestro carrito
        carrito.push(evento.target.getAttribute('marcador'))
        // Calculo el total
        calcularTotal();
        // Actualizamos el carrito 
        renderizarCarrito();

    }

    function renderizarCarrito() {
        
        DOMcarrito.textContent = '';
       
        const carritoSinDuplicados = [...new Set(carrito)];
        // Generamos los Nodos a partir de carrito
        carritoSinDuplicados.forEach((item) => {
           
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
              
                return itemBaseDatos.id === parseInt(item);
            });
           
            const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                
                return itemId === item ? total += 1 : total;
            }, 0);
            // Creamos el nodo del item del carrito
            const miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
            miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}$`;
            // Boton de borrar
            const miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger', 'mx-5');
            miBoton.textContent = 'X';
            miBoton.style.marginLeft = '1rem';
            miBoton.dataset.item = item;
            miBoton.addEventListener('click', borrarItemCarrito);
            // Mezclamos nodos
            miNodo.appendChild(miBoton);
            DOMcarrito.appendChild(miNodo);
        });
    }

    /**
    * Evento para borrar un elemento del carrito
    */
    function borrarItemCarrito(evento) {
        
        const id = evento.target.dataset.item;
        // Borramos todos los productos
        carrito = carrito.filter((carritoId) => {
            return carritoId !== id;
        });
       
        renderizarCarrito();
       
        calcularTotal();
    }

    
    function calcularTotal() {
        
        total = 0;
        // Recorremos el array del carrito
        carrito.forEach((item) => {
            // De cada elemento obtenemos su precio
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
            total = total + miItem[0].precio;
        });
       
        DOMtotal.textContent = total.toFixed(2);
    }

    function vaciarCarrito() {
       
        carrito = [];
        
        renderizarCarrito();
        calcularTotal();
    }

    // Eventos
    DOMbotonVaciar.addEventListener('click', vaciarCarrito);

    // Inicio
    renderizarProductos();


  }
  
  function saludar(){

    if(localStorage.getItem("usuario")!= null){
        document.getElementById("saludo").innerHTML = "Bienvenido/a de nuevo," + 
        localStorage.getItem("usuario") + "!";
    }
    else{
        var nombre = prompt( "¿Cómo te llamas?");
        localStorage.setItem( "usuario", nombre);
        document.getElementById( "saludo").innerHTML = "Tu primera visita," + 
        localStorage.getItem("usuario");
    }
    
}

saludar ()

document.getElementById("formulario").addEventListener ("submit",validarFormulario);
document.getElementById("logout").addEventListener("click",logout);

function validarFormulario(e){
    e.preventDefault();

    let formulario = e.target

    console.log("formulario enviado");
}


function logout (){
    alert("Se ha cerrado la sesión de " + localStorage.getItem("usuario"));
    localStorage.removeItem ("usuario");
    document.getElementById("saludo").innerHTML=" "
}

