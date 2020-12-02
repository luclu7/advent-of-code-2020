import * as fs from 'fs';
import * as rd from 'readline'

class passwordChecker {
    password: string;
    letterToFind: string;
    minimumMatch: number;
    maximumMatch: number;

    constructor(password: string, letterToFind: string, minimumMatch: number, maximumMatch: number) {
        this.password = password;
        this.letterToFind = letterToFind;
        this.minimumMatch = minimumMatch;
        this.maximumMatch = maximumMatch;

    }

    greet() {
        console.log("Hello, " + this.password);
    }

    match() {
        const numberOfMatches: number = (this.password.match(new RegExp(this.letterToFind, "g")) || []).length;
        if (numberOfMatches <= this.maximumMatch && numberOfMatches >= this.minimumMatch){
            console.log("isoké")
            return true
        } else {
            console.log("isnotok")
            return false
        }
    }
}

let password: passwordChecker = new passwordChecker("owo", "o", 1,2)
console.log(password.match())


var reader = rd.createInterface(fs.createReadStream("input.txt"))

let numberOfValidPasswords: number = 0;

reader.on("line", (l: string) => {
    let currentLine = l.split(/[- :]+/);
    console.log(currentLine)
    let password: passwordChecker = new passwordChecker(currentLine[3], currentLine[2], parseInt(currentLine[0]), parseInt(currentLine[1]))
    if(password.match()){
        numberOfValidPasswords++;
    }
})

reader.on("close", () => {
    console.log("Done! Found "+numberOfValidPasswords.toString()+" valid passwords.")
})

