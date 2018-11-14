
const inquirer = require("inquirer");
const rxjs = require ("rxjs")
'use strict';
var output = [];
var opciones = new Array('Consultar Libro', 'Ingresar Libro', 'Eliminar Libro', 'Actualizar Libro' );


const menu_preguntas= [{
    type: 'list',
    name: 'opciones_menu',
    message: '\nBienvenido a la Libreria "Best Books, que desea realizar?"',
    choices: ['Consultar Libro', 'Ingresar Libro', 'Eliminar Libro', 'Actualizar Libro' ]
},
    {
        type: 'confirm',
        name: 'confirmar',
        message: 'Desea continuar realizando operaciones en la libreria?"',
        default: true
    }];
const preguntas_crud= [{
    type: 'input',
    name: 'nombre',
    message: '\nIngrese el nomnre del libro'

},
    {
        type: 'input',
        name: 'autor',
        message: 'ingrese el nombre del autor'
    }];

function menu () {
    inquirer.prompt(menu_preguntas).then(answers => {
        if(answers.choiceq==opciones[1]){
        inquirer.prompt(preguntas_crud).then(answers => {


        });
        }
        else{
            console.log('elijio otra opcion')
        }






    } );

}

const operacion$ = rxjs.of(opciones)





function ask1 () {
    inquirer.prompt(qask1)
    };


function operar(opcion){
if(opcion ===opciones[1] ){
    ask1()

}

}


function appendFilePromesa(nombreArchivo,
                           contenidoArchivo){
    return new Promise(
        (resolve,reject)=>{
            fs.readFile(
                nombreArchivo,
                'utf-8',
                (error, contenidoLeido) => {
                    if (error) {
                        const contenido = contenidoArchivo;
                        fs.writeFile(
                            nombreArchivo,
                            contenido,
                            (err) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve(contenido);
                                }
                            }
                        );
                    } else {
                        const contenido = contenidoLeido + contenidoArchivo;
                        fs.writeFile(
                            nombreArchivo,
                            contenido,
                            (err) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve(contenido);
                                }
                            }
                        );
                    }
                }
            );
        }
    );
}

menu();