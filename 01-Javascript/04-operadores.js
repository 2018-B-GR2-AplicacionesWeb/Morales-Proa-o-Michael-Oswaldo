//nos tenemos que olvidar del VAR.... NUNCA MAS!!!!!!!!!!!!!
let edad = 29;// es cuando se va a mutar el objeto
edad=30;
const casado = false; //Inmutable
const edadV2 = 30;
 //edadV2 = 31;
 const nombre = 'Michael ';
 //nombre = 'Morales'
const hijos = null;
//hijos = 1;
const mascotas = [];
//
mascotas.cachetes = 'Cachetes';
mascotas.numero = 1;
mascotas.push('2');
mascotas.pop();

//ES ACONSEJABLE SIEMPRE USAR CONST PARA EL DESAROLLO EN JAVASCRIPT

const arreglo  = ['A','B','C'];

/*const respuestaForEach = arreglo.forEach(

    (valor,indice,arreglo )=>{
        console.log('valor',valor);
        console.log('indice',indice);
        console.log('arreglo',arreglo);
    }
)*/


const respuestaForEach = arreglo.forEach((v)=>console.log(v));
const respuestaMap=arreglo.map
    ((v)=>v.toUpperCase())
    .forEach((v)=>console.log(v));

const arregloNumeros =[1,2,3,4,5,6,7,8,9,0];
const respuestaFilter = arregloNumeros
    .filter((v)=>v%2===0);
console.log(respuestaFilter);
const respuestaFind ='';
const respuestaSome = arregloNumeros
    .some((v)=>v>10);
console.log(respuestaSome);
const respuestaEvery = arregloNumeros.every((v)=>v>0);
console.log(respuestaEvery);




const respuestaReduce = arregloNumeros.reduce((a,b)=>a+b,0);
const respuestaReduceRight = arregloNumeros.reduceRight((a,b)=>a+b,0);
console.log(respuestaReduce);
console.log(respuestaReduceRight);




const arregloNumerosClonado1= JSON.parse(JSON.stringify(arregloNumeros));

const respuestaSort = arregloNumerosClonado1.sort((a,b)=>a-b);
console.log(respuestaSort);
console.log(arregloNumeros);
console.log(arregloNumerosClonado1);


























//FUNCIONES ANONIMAS en metodos de los objetos y all declarar variables, enviar como parametro


const saludar  = function(){

};
const usuario = {
    nombre

    };


//Nunca mas usar funciones anonimas;

//enves de anonimas funciones se utilizan fat arrow function

const saludarV3 = ()=>{


};


const usuarioV2 = {
    nombre: 'Michael',
    saludar : () =>{



    }

};

const sumarDosNumerosV2 = (n1,n2) => n1+n2;
















