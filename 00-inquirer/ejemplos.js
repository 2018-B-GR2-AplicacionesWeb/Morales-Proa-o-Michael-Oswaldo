/**
* Pizza delivery prompt example
* run example by writing `node pizza.js` in your console
*/

'use strict';
var inquirer = require('inquirer');

console.log('Hi, welcome to Node Pizza');

var questions = [
    {
        type: 'confirm',
        name: 'toBeDelivered',
        message: 'Is this for delivery?',
        default: false
    },
    {
        type: 'input',
        name: 'phone',
        message: "What's your phone number?",
        validate: function(value) {
            var pass = value.match(
                /^([01]{1})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i
            );
            if (pass) {
                return true;
            }

            return 'Please enter a valid phone number';
        }
    },
    {
        type: 'list',
        name: 'size',
        message: 'What size do you need?',
        choices: ['Large', 'Medium', 'Small'],
        filter: function(val) {
            return val.toLowerCase();
        }
    },
    {
        type: 'input',
        name: 'quantity',
        message: 'How many do you need?',
        validate: function(value) {
            var valid = !isNaN(parseFloat(value));
            return valid || 'Please enter a number';
        },
        filter: Number
    },
    {
        type: 'expand',
        name: 'toppings',
        message: 'What about the toppings?',
        choices: [
            {
                key: 'p',
                name: 'Pepperoni and cheese',
                value: 'PepperoniCheese'
            },
            {
                key: 'a',
                name: 'All dressed',
                value: 'alldressed'
            },
            {
                key: 'w',
                name: 'Hawaiian',
                value: 'hawaiian'
            }
        ]
    },
    {
        type: 'rawlist',
        name: 'beverage',
        message: 'You also get a free 2L beverage',
        choices: ['Pepsi', '7up', 'Coke']
    },
    {
        type: 'input',
        name: 'comments',
        message: 'Any comments on your purchase experience?',
        default: 'Nope, all good!'
    },
    {
        type: 'list',
        name: 'prize',
        message: 'For leaving a comment, you get a freebie',
        choices: ['cake', 'fries'],
        when: function(answers) {
            return answers.comments !== 'Nope, all good!';
        }
    }
];

inquirer.prompt(questions).then(answers => {
    console.log('\nOrder receipt:');
    console.log(JSON.stringify(answers, null, '  '));
});
















function menu_crud() {
    inquirer
        .prompt(preguntas_crud)
        .then((respuestas) => {
            if (respuestas.crud_op === 'salir') {
                console.log(respuestas.clave);
                iniciar();
            }
            else {
                switch (respuestas.crud_op) {
                    case 'Consultar Tipos Pizzas':
                        pizzas.forEach((valor) => {
                            console.log(valor);
                        });
                        menu_crud();
                        break;
                    case 'Modificar Tipos Pizzas':
                        inquirer
                            .prompt(pregunta_actualizar)
                            .then((respuestas) => {
                                //buscar y reemplazar
                                pizzas.forEach((element, index, array) => {
                                    if (element == String(respuestas.old)) {
                                        console.log('econtrado');
                                        array[index] = respuestas.nuevo;
                                    }
                                    //console.log(`${element},${respuestas.old}`);
                                });
                                let contenido = '';
                                const pizza$ = rxjs.from(pizzas);
                                pizza$
                                    .subscribe((ok) => {
                                        contenido = contenido + ok + ",";
                                    }, (error) => {
                                        console.log("error:", error);
                                    }, () => {
                                        // volver a actualizar la base
                                        AppendFile('DataBase/pizzas', contenido, true)
                                            .then(() => {
                                                console.log('contenido actualizado');
                                                menu_crud();
                                            });
                                    });
                            });
                        break;
                    case 'Eliminar Pizzas':
                        inquirer
                            .prompt(pregunta_eliminar)
                            .then((respuestas) => {
                                //buscar y borrar
                                pizzas.forEach((element, index, array) => {
                                    if (element == String(respuestas.borrar)) {
                                        console.log('econtrado');
                                        array[index] = '';
                                    }
                                    //console.log(`${element},${respuestas.borrar}`);
                                });
                                let contenido = '';
                                const pizza$ = rxjs.from(pizzas);
                                pizza$
                                    .subscribe((ok) => {
                                        if (ok) {
                                            contenido = contenido + ok + ",";
                                        }
                                    }, (error) => {
                                        console.log("error:", error);
                                    }, () => {
                                        // volver a actualizar la base
                                        AppendFile('DataBase/pizzas', contenido, true)
                                            .then(() => {
                                                console.log('contenido actualizado');
                                                menu_crud();
                                            });
                                    });
                            });
                        break;
                    case 'Ingresar Pizza':
                        inquirer
                            .prompt(pregunta_insertar)
                            .then((respuestas) => {
                                pizzas.push(respuestas.insert);
                                let contenido = '';
                                const pizza$ = rxjs.from(pizzas);
                                pizza$
                                    .subscribe((ok) => {
                                        if (ok) {
                                            contenido = contenido + ok + ",";
                                        }
                                    }, (error) => {
                                        console.log("error:", error);
                                    }, () => {
                                        // volver a actualizar la base
                                        AppendFile('DataBase/pizzas', contenido, true)
                                            .then(() => {
                                                console.log('contenido actualizado');
                                                menu_crud();
                                            });
                                    });
                            });
                        break;
                }
                //menu_crud();
            }
        });
}