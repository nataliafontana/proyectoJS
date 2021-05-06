function saludar(){

    if(localStorage.getItem("usuario")!= null){
        document.getElementById("saludo").innerHTML = "Bienvenido/a de nuevo," + 
        localStorage.getItem("usuario") + "☀!";
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

/* aca agregue lo de jquery */

$('#btn1').click(function(){
	$('#formulario').show(1000);
});

$(document).ready(function(){
    $(".pie__fuente").mouseenter(function(){
      alert("Escribime!!");
    });
  });