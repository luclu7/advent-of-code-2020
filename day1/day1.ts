import * as fs from 'fs';

const text = fs.readFileSync("input.txt").toString("utf-8");
const arrayNumbers = text.split("\n").map(x=>+x)

// bad way to do it but it works
const state = [false, false]

// yeah nested loops are bad, but it works ¯\_(ツ)_/¯
function get2020(array: number[], target: number){
    array.forEach((element) => {
        const currentNumber1: number = element
        for (const currentNumber2 in array) {
            if(currentNumber1+array[currentNumber2] === target && state[0]==false) {
                // step 1
                // yay
                console.log("(2 levels) Found it!")
                console.log(currentNumber1*array[currentNumber2]+"!")
                state[0]=true
            }
            for (const currentNumber3 in array) {
                if(currentNumber1+array[currentNumber2]+array[currentNumber3] === target && state[0] == true && state[1]==false) {
                    console.log("(3 levels) Found it!")
                    console.log(currentNumber1*array[currentNumber2]*array[currentNumber3])
                    state[1]=true
                }
            }
        }
 })
}

get2020(arrayNumbers, 2020)