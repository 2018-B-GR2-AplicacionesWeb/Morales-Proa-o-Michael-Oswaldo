declare var require:any;
//declare var Promise:any;
const rxjs = require('rxjs');
const map = require('rxjs/operators').map;
/*const numeros$ = rxjs.of(
    1,
    2,
    3,
    3
    2,
    4
,
    3,
    4,
    5,
    6);

console.log(numeros$);


numeros$
    .pipe(
        map(
            project: (valorActual)


        )


    )
   .subscribe(
      (ok)=>{
            console.log('En ok',ok);
            },
        (error)=>{
            console.log('Error:',error);
        },
        ()=>{
            console.log('Complete');
        },
    );
*/
/*
const numeros$
const promesita  = (funciona:boolean)=>{
    return new Promise(
        (resolve,reject)=>{
            if (funciona){

                resolve(':) ');

            }else{
                reject (':(');
            }
        }
    );
};

const promesita$ = rxjs.from(promesita(true));
promesita$
    .subscribe(
        (ok)=>{

        },
    (error)=>{
            },
        ()=>{
            console.log('Completado')
        },
    );

const observableConcatenado$ = numeros$
    .pipe(
        contact(promesita())


    )
*/
const numeros$ = rxjs.of(1,2,'f',4,5,6)

numeros$
    .subscribe(
        (ok)=>{
            console.log('en ok ',ok)

        },
        (err)=>{
            console.log('en error ',err)
},
    ()=>{
    console.log('complete')
}



)

//numeros$();
