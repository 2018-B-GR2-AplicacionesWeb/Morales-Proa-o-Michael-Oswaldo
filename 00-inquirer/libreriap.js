//declare var require:any;
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
    }
];
let menu_continuar = [{
        type: 'confirm',
        name: 'confirmar_stay',
        message: '\nDesea continuar navegando en la libreria?"',
        default: true
    }
];
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
let preguntas_cargar = [{
        type: 'list',
        name: 'nombre',
        message: '\nLibros en existencia:'
    },
    {
        type: 'input',
        name: 'autor',
        message: 'ingrese el nombre del autor'
    }];
function menu() {
    inquirer.prompt(menu_preguntas);
    /*  .then(answers => {

      if(answers.opciones_menu =='Ingresar Libro'){
          inquirer.prompt(preguntas_crud).then(answers => {
appendFilePromesa("libreria_datos",answers.nombre)

          });
      }
      else
          if(answers.opciones_menu =='Consultar Libro'){
              inquirer.prompt(preguntas_cargar).then(answers => {
                  obtenerDatos("Libreria_datos")

              });
      }
  } );*/
}
const operacion$ = rxjs.of(opciones);
const obtenerDatos = (nombreArchivo) => {
    // @ts-ignore
    return new Promise((resolve, reject) => {
        fs.readFile(nombreArchivo, 'utf-8', (error, contenidoArchivo) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(contenidoArchivo);
            }
        });
    });
};
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
