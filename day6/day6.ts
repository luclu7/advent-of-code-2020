import * as fs from "fs";
import * as chalk from "chalk";

const data = fs.readFileSync('input.txt').toString();
function part1(){
    let owo = data.split("\r\n\r\n");
    let counter: number = 0;

    owo.forEach((element, index) => {
        const numberOfMatches = element.split("\r\n").join("").split("").filter((v, i, a) => a.indexOf(v) === i).length
        console.log(numberOfMatches)
        counter = counter+numberOfMatches;

    })
    console.log("(1) Number of matches: "+chalk.green(counter))
}

part1()
