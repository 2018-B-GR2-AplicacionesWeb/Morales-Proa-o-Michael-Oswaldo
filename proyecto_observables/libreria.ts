declare var require: any
const inquirer = require('inquirer');
const fs = require("fs");
const rxjs = require("rxjs");
const timer = require('rxjs').timer;
const mergeMap = require('rxjs/operators').mergeMap;
const map = require('rxjs/operators').map;
const retryWhen = require('rxjs/operators').retryWhen;
const delayWhen = require('rxjs/operators').delayWhen


//conectar DB
//preguntar

function conectarDB(nombreArchivo) {
    return new Promise(
        (resolve, reject) => {
            fs.readFile(
                nombreArchivo,
                'utf-8',
                (error, contenidoArchivo) => {
                    if (error) {
                        fs.writeFile(
                            nombreArchivo,
                            '{"usuarios":[],"libros":[]}',
                            (error) => {
                                if (error) {
                                    reject({
                                        mensaje: 'No se pudo Acceder a la base de datos',
                                        error: 500
                                    })
                                }
                                else {
                                    resolve({
                                        mensaje: 'bd leida',
                                        bdd: JSON.parse('{"usuarios":[],"libros":[]}')
                                    })
                                }
                            }
                        )

                    } else {

                        resolve({
                            mensaje: 'bd leida',
                            bdd: JSON.parse(contenidoArchivo)
                        })


                    }


                }
            )


        }
    )
}


async function main() {
    // 1) Inicializar bdd -- DONE
// 2) Preguntas Menu -- DONE
// 3) Opciones de Respuesta --  DONE
// 4) ACCCION!!!!  -- DONE
// 5) Guardar BDD --

    const resultadoConexion$ = rxjs.from(conectarDB('libreriaDB.json'))

    resultadoConexion$
        .pipe(
            preguntarOpcionesMenu(),
            opcionesRespuesta(),
            ejecutarAcccion(),
            guardarBaseDeDatos()
        ).subscribe(
        (dato) => {
            console.log(dato)

        },
        (error) => {
            console.log(error)
        },
        () => {
            main()
            console.log('complete')
        }
    )
}


function preguntarOpcionesMenu() {
    return mergeMap(
        (respuestaBD: RespuestaBD) => {
            return rxjs.from(inquirer.prompt(preguntasMenu))
                .pipe(
                    map(
                        (respuesta: OpcionMenu) => {
                            respuestaBD.opcionMenu = respuesta;
                            return respuestaBD;
                        }
                    )
                )
        }
    )
}


function opcionesRespuesta() {
    return mergeMap(
        (respuestaBDD: RespuestaBD) => {
            const opcion = respuestaBDD.opcionMenu.opcionMenu;
            switch (opcion) {
                case 'Crear Libro':
                    return rxjs
                        .from(inquirer.prompt(preguntaCrear))
                        .pipe(
                            map(
                                (libro: Libro) => { // resp ant OBS
                                    respuestaBDD.libro = libro;
                                    console.log(respuestaBDD.libro)
                                    return respuestaBDD;
                                }
                            )
                        );
                case 'Buscar Libro':
                    return preguntarLibroB(respuestaBDD);

                case 'Actualizar Libro':
                    return preguntarLibroA(respuestaBDD);
                    break;

                /* case 'Devolver Libro':
                     return preguntarIdUsuario(respuestaBDD);
                 case 'Borrar':
                     break;*/
            }
        }
    )
}

function ejecutarAcccion() {
    return map( // Respuesta del anterior OBS
        (respuestaBDD: RespuestaBD) => {
            const opcion = respuestaBDD.opcionMenu.opcionMenu;
            switch (opcion) {
                case 'Crear Libro':
                    const libro = respuestaBDD.libro;
                    console.log(libro)
                   respuestaBDD.bdd.libros.push(libro);
                    return respuestaBDD;
                case 'Buscar Libro':
                    const indiced = respuestaBDD.indiceLibro;
                    //console.log(indiced)
                    console.log(respuestaBDD.bdd.libros[indiced])
                    return respuestaBDD;
                case 'Actualizar Libro':
                    const indice = respuestaBDD.indiceLibro;
                    respuestaBDD.bdd.libros[indice].nombre = respuestaBDD.libro.nombre;

                    return respuestaBDD;
                case 'Borrar Libro':

                    break;
                case 'Salir':
                    break;
            }
        }
    )
}
function guardarBaseDeDatos() {
    return mergeMap(// Respuesta del anterior OBS
        (respuestaBDD: RespuestaBD) => {
            // OBS
            return rxjs.from(guardarBDD(respuestaBDD.bdd))
        }
    )
}


function guardarBDD(bdd: BDD) {
    return new Promise(
        (resolve, reject) => {
            fs.writeFile(
                'libreriaDB.json',
                JSON.stringify(bdd),
                (error) => {
                    if (error) {
                        reject({
                            mensaje: 'Error creando',
                            error: 500
                        })
                    } else {
                        resolve({
                            mensaje: 'BDD guardada',
                            bdd: bdd
                        })
                    }

                }
            )
        }
    )
}



const preguntaCrear = [
    {
        type: 'input',
        name: 'id',
        message: 'ingrese el id del libro;'
    },
    {
        type: 'input',
        name: 'nombre',
        message: 'Cual es el nombre del libro?'
    },
    {
        type: 'input',
        name: 'autor',
        message: 'Cual es el Autor de este libro?'
    },
    {
        type: 'input',
        name: 'idUsuario',
        message: 'Cual es el id del usuario que posee este libro?'
    }
];

const preguntaBuscar = [
    {
        type: 'input',
        name: 'idLibro',
        message: 'Ingrese el  id  del Libro que desea Actualizar',
    }
];


const preguntaBuscarB = [
    {
        type: 'input',
        name: 'idLibro',
        message: 'Ingrese el  id  del Libro que desea Buscar',
    }
];

const preguntasMenu = [{
    type: 'list',
    name: 'opcionMenu',
    message: '\n------------------------------------------\n' +
        '---------LIBRERIA MICHAEL MORALES---------\n' +
        '----------------BIENVENIDO----------------\n\n' +
        '¿Que Desea hacer?',
    choices: ['Crear Libro','Buscar Libro', 'Actualizar Libro', 'Borrar Libro', 'Salir']
}];


interface RespuestaBD {
    mensaje: string;
    bdd: BDD;
    opcionMenu?: OpcionMenu;
    usuario?: Usuario;
    indiceUsuario?: number;
    libro?: Libro;
    indiceLibro?: number;

}

interface BDD {
    usuarios: Usuario[] | any;
    libros: Libro[]|any;
}


interface Usuario {
    id: number;
    nombre: string;
}

interface Libro {
    id: number;
    nombre: string;
    autor: string;
    idUsuario: number;
}

interface OpcionMenu {
    opcionMenu: 'Crear Libro'|'Buscar Libro'|'Actualizar Libro'|'Borrar Libro'| 'Salir';

}

interface BuscarUsuarioPorId {
    idUsuario: string;
}
interface BuscarLibroPorId {
    idLibro: string;
}


const preguntaEdicionLibro = [
    {
        type: 'input',
        name: 'nombre',
        message: 'Cual es el nuevo nombre del libro'
    },
];


function preguntarLibroB(respuestaBDD: RespuestaBD) {
   return rxjs
        .from(inquirer.prompt(preguntaBuscarB))
        .pipe(
            map( // RESP ANT OBS
                (respuesta: BuscarLibroPorId) => {

                    const indiceLibroB = respuestaBDD.bdd.libros.findIndex( // -1
                        (libro: any) => {
                            return libro.id === respuesta.idLibro
                        }
                    );
                    if (indiceLibroB === -1) {
                        console.log('No existe el libro que busca');
                        return preguntarLibroB(respuestaBDD);
                    } else {

                        respuestaBDD.indiceLibro = indiceLibroB;
                        //console.log(respuestaBDD.indiceLibro)
                        return respuestaBDD


                    }
                }
            )
        );
}


function preguntarLibroA(respuestaBDD: RespuestaBD) {
    return rxjs
        .from(inquirer.prompt(preguntaBuscar))
        .pipe(
            mergeMap( // RESP ANT OBS
                (respuesta: BuscarLibroPorId) => {
                    console.log(respuesta)
                    const indiceLibro = respuestaBDD.bdd.libros.findIndex( // -1
                        (libro: any) => {
                            return libro.id === respuesta.idLibro
                        }
                    );
                    if (indiceLibro === -1) {
                        console.log('No existe tal libro');
                        return preguntarLibroB(respuestaBDD);
                    } else {
                        respuestaBDD.indiceLibro = indiceLibro;
                        return rxjs
                            .from(inquirer.prompt(preguntaEdicionLibro))
                            .pipe(
                                map(
                                    (nombre:{nombre:string})=>{
                                        respuestaBDD.libro ={
                                            id:null,
                                            nombre:nombre.nombre,
                                            autor: null,
                                            idUsuario: null
                                        };
                                        return respuestaBDD;
                                    }
                                )
                            );
                    }
                }
            )
        );
}

main()