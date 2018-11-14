var inquirer = require('inquirer');
var { from } = require('rxjs');

var questions = [
    {
        type: 'choice',
        name: 'phone',
        message: "Bienvenidos a la Libreria ",
        validate: function(value) {
            var pass = value.match(
                /^([01]{1})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i
            );
            if (pass) {
                return true;
            }

            return 'Please enter a valid phone number';
        }
    }
];

var observable = from(questions);

inquirer.prompt(observable).ui.process
    .subscribe(
    (ans)=>{

        console.log('estamos haciendo ', ans);
    },
    (err)=>{
        console.log('Error: ', err);
    },
    ()=>{
        console.log('Completed');
    }
);