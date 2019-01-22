const inquirer = require('inquirer');
const fs = require("fs");
const rxjs = require("rxjs");
const timer = require('rxjs').timer;
const mergeMap = require('rxjs/operators').mergeMap;
const map = require('rxjs/operators').map;
const retryWhen = require('rxjs/operators').retryWhen;
const delayWhen = require('rxjs/operators').delayWhen;
const arregloFlores = [
    {
        "dia": '1',
        "tallo": 75,
        "florid": 776,
        "longitudid": 2,
        "nombreflor": 'Alba',
        "longitud": 50
    }
];
function conectarDB(nombreArchivo) {
    return new Promise((resolve, reject) => {
        fs.readFile(nombreArchivo, 'utf-8', (error, contenidoArchivo) => {
            if (error) {
                fs.writeFile(nombreArchivo, '{"usuarios":[],"libros":[]}', (error) => {
                    if (error) {
                        reject({
                            mensaje: 'No se pudo Acceder a la base de datos',
                            error: 500
                        });
                    }
                    else {
                        resolve({
                            mensaje: 'bd leida',
                            bdd: JSON.parse('{"usuarios":[],"libros":[]}')
                        });
                    }
                });
            }
            else {
                resolve(JSON.parse(contenidoArchivo));
            }
        });
    });
}
function buscarPor(nombrePropiedad, arreglo) {
    return arreglo
        .map((caracter) => {
        return caracter[nombrePropiedad];
    });
}
function Escritura(nombreArchivo, contenidoArchivo) {
    fs.writeFile(nombreArchivo, contenidoArchivo, (error) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log(contenidoArchivo);
        }
    });
}
function guardarBDD(bdd) {
    return new Promise((resolve, reject) => {
        fs.writeFile('mosflordb.json', JSON.stringify(bdd), (error) => {
            if (error) {
                reject({
                    mensaje: 'Error creando',
                    error: 500
                });
            }
            else {
                resolve({ mensaje: 'BDD guardada',
                    bdd: bdd });
            }
        });
    });
}
async function main() {
    const resultadoConexion$ = rxjs.from(conectarDB('mosflordb.json'));
    resultadoConexion$
        .pipe(map((resultado) => {
        console.log(resultado);
        resultado.forEach((valor, indice) => {
            if (valor.dia === '1') {
                resultado[indice].dia === '7 Sept';
                return resultado;
            }
            else if (valor.dia === '4') {
                resultado[indice].dia === '10 Sept';
                return resultado;
            }
            console.log(valor);
        });
    })).subscribe((dato) => {
        console.log(dato);
    }, (error) => {
        console.log(error);
    }, () => {
        guardarBDD(resultadoConexion$);
        console.log('complete');
    });
}
main();
//Accedo a la base de datos de Mosflor para traer los datos de las flores
