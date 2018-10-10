function sumarDosNumeros(numeroUno, numeroDos){
   //Validaciónes
    var numeroUnoEsNumber = typeof numeroUno == "number"//true
    var numeroDosEsNumber = typeof numeroDos == "number"//true

   if(numeroUnoEsNumber && numeroDosEsNumber){


       return numeroUno+numeroDos;



   }
   else{
       console.log('escriba Bonito Vea!!!')



       return 'Error';

   }





}
//ENVIO OTROS PARAMETROS
sumarDosNumeros('a',null);
saludar();

sumarNumeros(3,3,4);

//una funcion sin return devuelbe undefined
function saludar(){
    console.log('Hola a Todos');

}

function sumarNumeros(...parametros)
{

    suma =0;
    suma+=parametros;

    console.log(suma);
    return  suma;
}


//"Adrian", "Hola Adrian"

function saludar(nombre, funcionMensajeria){
var saludo = `Hola ${nombre.toUpperCase()}`;/// esta forma es lo llamado TEMPLATE Strings
    funcionMensajeria(saludo);
    return saludo;

}