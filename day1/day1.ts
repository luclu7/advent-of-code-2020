import * as fs from 'fs';

const text = fs.readFileSync("input.txt").toString("utf-8");
const arrayNumbers = text.split("\n").map(x=>+x)

// bad way to do it but it works
const state = [false, false]

// yeah nested loops are bad, but it works ¯\_(ツ)_/¯
function get2020(arrayNumbers){
    arrayNumbers.forEach((element) => {
        const currentNumber1: number = element
        for (const currentNumber2 in arrayNumbers) {
            if(currentNumber1+arrayNumbers[currentNumber2] === 2020 && state[0]==false) {
                // step 1
                // yay
                console.log("(2 levels) Found it!")
                console.log(currentNumber1*arrayNumbers[currentNumber2]+"!")
                state[0]=true
            }
            for (const currentNumber3 in arrayNumbers) {
                if(currentNumber1+arrayNumbers[currentNumber2]+arrayNumbers[currentNumber3] === 2020 && state[0] == true && state[1]==false) {
                    console.log("(3 levels) OwO, found it!")
                    console.log(currentNumber1*arrayNumbers[currentNumber2]*arrayNumbers[currentNumber3])
                    state[1]=true
                }
            }
        }
 })
}

get2020(arrayNumbers)