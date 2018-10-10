var arreglo = [
    1,
    1.2,
    {},
    undefined,
    []

];
arregloNumeros = [1,2,3];

arregloNumeros[0];//1
arregloNumeros[1];//2
arregloNumeros[2];//2

// con ctrl alt l indentamos nuestro codfigo

arregloNumeros.push(4);



//arregloNumeros.pop();
arregloNumeros.splice(0,1);


arregloNumeros.splice(2,0,1.5)
arregloNumeros.splice(3,0,1.5)
console.log('elementos del arreglo',arregloNumeros);

console.log('slice: ', arregloNumeros.slice(2,4));

//console.log('elementos del
// arreglo',arregloNumeros);

var usuario = 1.5;

console.log('indice del numero 1.5=', arregloNumeros.indexOf(1.5));


var arregloNotasPrimerBimestre = [8.5,9,4];
var arregloNotasSegundoBimestre =[10,2,5];

var notas2018B = [...arregloNotasPrimerBimestre,...arregloNotasSegundoBimestre];
console.log('NOTAS cONJUNTAS',notas2018B);


var adrian2018A= {
   sexualidad: 0,
    moviles: 8

};

var adrian2018B={


web:10

}

var adrian = {
    ...adrian2018A,
    ...adrian2018B

};
console.log('adrian:',adrian);






