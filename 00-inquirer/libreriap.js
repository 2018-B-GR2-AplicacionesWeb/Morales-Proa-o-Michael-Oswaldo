const inquirer = require("inquirer");
const rxjs = require("rxjs");
const fs = require('fs');
'use strict';
const output = [];
const opciones = new Array('Consultar Libro', 'Ingresar Libro', 'Eliminar Libro', 'Actualizar Libro');
let menu_preguntas = [{
        type: 'list',
        name: 'opciones_menu',
        message: '\nBienvenido a la Libreria "Best Books, que desea realizar?"',
        choices: ['Consultar Libro', 'Ingresar Libro', 'Eliminar Libro', 'Actualizar Libro']
    },
    {
        type: 'confirm',
        name: 'confirmar',
        message: 'Desea continuar realizando operaciones en la libreria?"',
        default: true
    }];
let preguntas_crud = [{
        type: 'input',
        name: 'nombre',
        message: '\nIngrese el nomnre del libro'
    },
    {
        type: 'input',
        name: 'autor',
        message: 'ingrese el nombre del autor'
    }];
function menu() {
    inquirer.prompt(menu_preguntas).then(answers => {
        if (answers.opciones_menu == 'Ingresar Libro') {
            inquirer.prompt(preguntas_crud).then(answers => {
                appendFilePromesa("libreria_datos", answers.nombre);
            });
        }
        else {
            console.log('elijio otra opcion');
        }
    });
}
const operacion$ = rxjs.of(opciones);
function appendFilePromesa(nombreArchivo, contenidoArchivo) {
    return new Promise((resolve, reject) => {
        fs.readFile(nombreArchivo, 'utf-8', (error, contenidoLeido) => {
            if (error) {
                const contenido = contenidoArchivo;
                fs.writeFile(nombreArchivo, contenido, (err) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(contenido);
                    }
                });
            }
            else {
                const contenido = contenidoLeido + contenidoArchivo;
                fs.writeFile(nombreArchivo, contenido, (err) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(contenido);
                    }
                });
            }
        });
    });
}
menu();
