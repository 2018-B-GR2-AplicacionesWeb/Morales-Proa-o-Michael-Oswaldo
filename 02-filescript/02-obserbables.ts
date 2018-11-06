
const rxjs = require('rxjs');


const numeros$ = rxjs.of(a:1,b:2,c:3,d:4);


numeros$.subscribe(
    next:(ok)=>{
        console.log('en OK ',ok);

},
    error:(error)=>{
    console.log('en OK ',ok);
},
    complete()=>{
  console.log('Complete')
},





)