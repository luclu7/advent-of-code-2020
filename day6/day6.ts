import * as fs from "fs";
import * as chalk from "chalk";

const data = fs.readFileSync('input.txt').toString();
let parsedInput = data.split("\r\n\r\n");

function part1(){
    let counter: number = 0;
    parsedInput.forEach((element) => {
        const numberOfMatches = element.split("\r\n").join("").split("").filter((v, i, a) => a.indexOf(v) === i).length
        //console.log(numberOfMatches)
        counter = counter+numberOfMatches;

    })
    console.log("(1) Number of matches: "+chalk.green(counter))
}

function part2(){
    let counter: number = 0;
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    parsedInput.forEach((element) => {
        const numberOfMembers = element.split("\r\n").length
        for (const alphaKey in alphabet) {
            const regex = new RegExp(alphabet[alphaKey],"g");
            const matches: array = element.match(regex);
            if(matches !== null && matches.length/numberOfMembers >= 1){
                //console.log(chalk.red(matches.length/numberOfMembers))
                counter = counter+(matches.length)/numberOfMembers
            }
        }
    })
    console.log("(2) Number of matches: "+chalk.green(counter))
}

part1()
part2()