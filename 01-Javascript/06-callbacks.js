//06-callbacks.js

const fs = require ('fs');
console.log('Inicio')
fs.readFile(
    '06-texto.txt',//nombre del archivo
    'utf-8',
    (error,textoLeidoDelArchivo)=>{
        if(error) {
            /*try{
                throw new Error(error);
            } catch(e){
                console.log(e)
            }*/
        }
        else {
            fs.witeFile(
                '06-texto.txt',
                textoLeidoDelArchivo+' mundo',
                (err)=>{
                    if (err) console.log ('ERROR');
                    cpnsole.log('Archivo')


                }


            );


            console.log(textoLeidoDelArchivo);
        }

    }
);




console.log('FIN');