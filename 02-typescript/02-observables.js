//declare var Promise:any;
const rxjs = require('rxjs');
const map = require('rxjs/operators').map;
const observable_numeros$ = rxjs.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
//i can´t do this --console.log(observable_numeros$);
observable_numeros$
    .pipe(map((numero) => {
    return { numero: numero };
})).subscribe((ok) => {
    console.log("todo chevere ", ok);
}, (error) => {
    console.log("salio medio ma papu:", error);
}, () => {
    console.log("se finalizo papu");
});
const observable2$ = rxjs.of(1, 2, 3, 4, 5, 6);
observable2$
    .pipe(map((valor) => {
    return { valorActual: valor };
})).subscribe((ok) => {
    console.log(ok);
}, (error) => {
    console.log(error);
}, () => {
    console.log('well done');
});
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
/*
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
*/
//numeros$();
