const fs = require('fs');

const promesa = (nombreArchivo) => {
    return new Promise(
        (resolve, reject) => {
            fs.readFile(
                nombreArchivo,
                'utf-8',
                (error, contenidoLeido) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(contenidoLeido);
                    }
                }
            );
        }
    );
};

const promesaEscritura = (
    nombreArchivo,
    contenidoArchivo) => {
    return new Promise(
        (resolve, reject) => {
            fs.writeFile(
                nombreArchivo,
                contenidoArchivo,
                (error) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(contenidoArchivo);
                    }
                }
            );
        }
    );
};

console.log(promesa);
promesa('06-texto.txt')
    .then(
        (contenido) => {
            console.log('Ok', contenido);
            return promesaEscritura(
                '06-texto.txt',
                contenido + ' Nuevo Contenido');
            // Promesa
        }
    )
    .then(
        (contenidoCompleto) => {
            console.log(contenidoCompleto);
        }
    )
    .catch(
        (error) => {
            console.log('Mal', error);
        }
    );





//TRANSFORMACION DE APPENDFILE A PROMESA

const appendFile = (nombreArchivo,contenido) => {
    return new Promise(
        (resolve, reject) => {
            fs.readFile(
                nombreArchivo,
                'utf-8',
                (error, contenidoLeidoDelArchivo) => {
                    if (error) {
                        fs.writeFile(
                            nombreArchivo,
                            contenido,
                            (err) => {
                                if (err) {
                                    //callback(undefined, err)
                                    resolve(err);

                                } else {

                                    reject(contenidoLeidoDelArchivo);

                                }
                            }
                        );
                    } else {

                        fs.writeFile(
                            nombreArchivo,
                            contenidoLeidoDelArchivo + contenido,
                            (err) => {
                                if (err) {
                                    resolve(undefined, err);
                                } else {

                                    reject(contenidoLeidoDelArchivo + contenido)
                                }
                            }
                        )
                    }
                }
            );

        }
    )
};


appendFile(nombre,'HOLA')
    .then(
        (contenido) => {

            return oppendFile('09-texto.txt', 'ADIOS');
        }
    )
    .catch(
        (error) => {
            console.log('MAL', error);
        }
    );
