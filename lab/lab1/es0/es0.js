//create a function that from a list of strints prints out only the first 2 and last 2 letters


"use strict"
//array of strings
let array = ["Matteo","Riccardo", "Jacopo","Michele"];


function elaboraStringhe( array ){

    let myArray = array.map( (string) => {
        let x = (string.substr(0,2) + string.substr( string.length-2, string.length ))
        onsole.log(x);
        return x;
    })

    console.log(array);

    return myArray;
}

//prints the string before the call of the function
console.log(array);

array = elaboraStringhe(array);

//prints the strings after the call
console.log(array);

