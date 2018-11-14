/*const inquirer = require('inquirer');
inquirer.prompt(['Que desea realizar en la libreria']).then(answers => {
});
*/

//inquirer.registerPrompt('directory', require('index'));
/*
inquirer.prompt([
    {
        type: "directory",
        name: "path",
        message: "In what directory would like to perform this action?",
        basePath: "node_modules"
    }
], function( answers ) {
    console.log( JSON.stringify(answers, null, "  ") );
});*/
//const outputs = ['TEST-1', 'TEST-2', 'TEST-3'];

const inquirer = require("inquirer");
const rxjs = require ("rxjs")
'use strict';
var output = [];
var opciones = new Array('Consultar Libro', 'Ingresar Libro', 'Eliminar Libro', 'Actualizar Libro' );


const questions= [{
    type: 'list',
    name: 'choiceq',
    message: '\nBienvenido a la Libreria "Best Books, que desea realizar?"',
    choices: ['Consultar Libro', 'Ingresar Libro', 'Eliminar Libro', 'Actualizar Libro' ]
},
    {
        type: 'confirm',
        name: 'confirmq',
        message: 'Desea continuar realizando operaciones en la libreria?"',
        default: true
    }];

function preguntas () {
    inquirer.prompt(questions).then(answers => {
        output.push(answers.choiceq);
        operar(choiceq);

        if (answers.confirmq) {
            preguntas();
        } else {
            console.log('\nGracias por venir, Adios!!:', '\neventos realizados en esta seción: ',output.join(', '));
        }
    });
}

const operacion$ = rxjs.of(opciones)




function operar(opcion,otro){
if(opcion ===opciones[1] ){
    appendFilePromesa('libreria_datos',otro)

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

preguntas();