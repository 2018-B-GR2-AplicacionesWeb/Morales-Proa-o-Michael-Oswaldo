declare var require;
const fs = require('fs');

interface Character {
    "name": string,
    "height": string,
    "mass": string,
    "hair_color": string,
    "skin_color": string,
    "eye_color": string,
    "birth_year": string,
    "gender": string,
    "homeworld": string,
    "films": string[],
    "species": string[],
    "vehicles": string[],
    "starships": string[],
    "created": string,
    "edited": string,
    "url": string
}

const arreglo: Character[] = [
    {
        "name": "Luke Skywalker",
        "height": "172",
        "mass": "77",
        "hair_color": "blond",
        "skin_color": "fair",
        "eye_color": "blue",
        "birth_year": "19BBY",
        "gender": "male",
        "homeworld": "https://swapi.co/api/planets/1/",
        "films": [
            "https://swapi.co/api/films/2/",
            "https://swapi.co/api/films/6/",
            "https://swapi.co/api/films/3/",
            "https://swapi.co/api/films/1/",
            "https://swapi.co/api/films/7/"
        ],
        "species": [
            "https://swapi.co/api/species/1/"
        ],
        "vehicles": [
            "https://swapi.co/api/vehicles/14/",
            "https://swapi.co/api/vehicles/30/"
        ],
        "starships": [
            "https://swapi.co/api/starships/12/",
            "https://swapi.co/api/starships/22/"
        ],
        "created": "2014-12-09T13:50:51.644000Z",
        "edited": "2014-12-20T21:17:56.891000Z",
        "url": "https://swapi.co/api/people/1/"
    }
];

function buscarPor(nombrePropiedad: string,
                   arreglo: Character[]) {
    return arreglo
        .map(
            (caracter) => {
                return caracter[nombrePropiedad]
            }
        );
}

const gender = buscarPor('gender', arreglo);
const eye_color = buscarPor('eye_color', arreglo);
const skin_color = buscarPor('skin_color', arreglo);
const hair_color = buscarPor('hair_color', arreglo);

function clasificar(clasificacion: string[],
                    arreglo: Character[],
                    nombrePropiedad: string) {
    const respuesta = [];
    clasificacion
        .forEach(
            (nombre) => {
                const arregloFiltrado = arreglo
                    .filter(
                        (caracter) => {
                            return caracter[nombrePropiedad] === nombre;
                        }
                    )
                respuesta.push(arregloFiltrado);
            }
        )
    return respuesta;
}

clasificar(gender, arreglo, 'gender');
clasificar(eye_color, arreglo, 'eye_color');
clasificar(skin_color, arreglo, 'skin_color');
clasificar(hair_color, arreglo, 'hair_color');

const abecedario = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
];

function buscarAbecedario(abecedario: string[],
                          arreglo: Character[]) {
    const respuesta = [];
    abecedario
        .forEach(
            (letra) => {
                const existeCaracter = arreglo
                    .some(
                        (caracter) => {
                            return caracter.name.slice(0, 1).toUpperCase() === letra.toUpperCase();
                        }
                    );

                const objeto: any = {};

                objeto[letra] = existeCaracter;
                respuesta.push(objeto)
            }
        );
    return respuesta;
}

function massHeight(arreglo: Character[],
                    nombrePropiedad: string) {
    return arreglo
        .reduce(
            (valorAcumulado, caracter: Character) => {

                return valorAcumulado + Number(validar(caracter[nombrePropiedad]))
            },
            0
        )
}


function validar(valor: string) { // 1,43
    if (valor === 'unknown') {
        return 0;
    } else {
        return valor.replace(',', '.');
    }
}

massHeight(arreglo, 'mass');
massHeight(arreglo, 'height');

function calcularSiExiste(arreglo:Character[],
                          nombrePropiedad:string){
    return arreglo
        .every(
            (caracter)=>{
                return caracter[nombrePropiedad].length > 0;
            }
        )
}
calcularSiExiste(arreglo,'vehicles');
calcularSiExiste(arreglo,'starships');

function hanParticipado(arreglo:Character[]){
    return arreglo
        .map(
            (caracter)=>{
                return {
                    nombre:caracter.name,
                    numeroPeliculas:caracter.films.length
                }
            }
        )
}

hanParticipado(arreglo);


function leerArchivo(){
    fs.readFile(
        'people.json',
        'utf-8',
        (error, contenidoArchivo)=>{
            if(error){
                console.error(error);
            }else{
                const arreglo = JSON.parse(contenidoArchivo);
                console.log(hanParticipado(arreglo));
                console.log(buscarPor('eye_color', arreglo));
            }
        }
    )

}

leerArchivo();
