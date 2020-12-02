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

    matchPart1() {
        const numberOfMatches: number = (this.password.match(new RegExp(this.letterToFind, "g")) || []).length;
        if (numberOfMatches <= this.maximumMatch && numberOfMatches >= this.minimumMatch){
            console.log("isoké")
            return true
        } else {
            console.log("isnotok")
            return false
        }
    }
    matchPart2(){
        const firstMatch: boolean = this.password[this.minimumMatch-1] == this.letterToFind
        const secondMatch: boolean = this.password[this.maximumMatch-1] == this.letterToFind
        if(firstMatch !== secondMatch){
            console.log("Good")
            return true
        }
        else {
            console.log("Bad")
            return false
        }
    }
}

function part1(){
    const reader = rd.createInterface(fs.createReadStream("input.txt"))
    let numberOfValidPasswords: number = 0;

    reader.on("line", (l: string) => {
        let currentLine = l.split(/[- :]+/);
        let password: passwordChecker = new passwordChecker(currentLine[3], currentLine[2], parseInt(currentLine[0]), parseInt(currentLine[1]))
        if(password.matchPart1()){
            numberOfValidPasswords++;
        }
    })

    reader.on("close", () => {
        console.log("(1) Done! Found "+numberOfValidPasswords.toString()+" valid passwords.")
    })
}

function part2() {
    const reader = rd.createInterface(fs.createReadStream("input.txt"))
    let numberOfValidPasswords: number = 0;

    reader.on("line", (l: string) => {
        let currentLine = l.split(/[- :]+/);
        let password: passwordChecker = new passwordChecker(currentLine[3], currentLine[2], parseInt(currentLine[0]), parseInt(currentLine[1]))
        if(password.matchPart2()){
            numberOfValidPasswords++;
        }
    })

    reader.on("close", () => {
        console.log("(2) Done! Found "+numberOfValidPasswords.toString()+" valid passwords.")
    })
}

part1()
part2()