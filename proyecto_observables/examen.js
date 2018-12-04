const inquirer = require('inquirer');
const fs = require('fs');
const rxjs = require('rxjs');
const timer = require('rxjs').timer;
const mergeMap = require('rxjs/operators').mergeMap;
const map = require('rxjs/operators').map;
const retryWhen = require('rxjs/operators').retryWhen;
const delayWhen = require('rxjs/operators').delayWhen;
function inicialiarBDD() {
    return new Promise((resolve, reject) => {
        fs.readFile('people.json', 'utf-8', (error, contenidoArchivo) => {
            if (error) {
                fs.writeFile('people.json', '{}', (error) => {
                    if (error) {
                        reject({
                            mensaje: 'Error creando',
                            error: 500
                        });
                    }
                    else {
                        resolve({
                            mensaje: 'BDD leida',
                            bdd: JSON.parse('{"usuarios":[],"mascotas":[]}')
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
async function main() {
    const respuestaBDD$ = rxjs.from(inicialiarBDD());
    respuestaBDD$
        .pipe(map((respuesta) => {
        var r = respuesta.map((d) => { return d['gender']; }); /*.filter((value, index, self) => {
            return self.indexOf(value) === index;
        });*/
        return r;
    }))
        .subscribe((data) => {
        //
        console.log(data);
    }, (error) => {
        //
        console.log(error);
    }, () => {
        //  main();
        console.log('Complete');
    });
}
main();
/*
function pregunta1(){
return mergeMap(
    (respuesta1)=>{



    }


)
}
function pregunta2(){




}
function pregunta3(){




}
function pregunta4(){




}
function pregunta5(){




}

*/ 
