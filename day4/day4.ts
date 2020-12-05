import * as fs from 'fs';

class Passport {
    private byr: number;    // birth day
    private iyr: number; // issue year
    private eyr: number; // expiration year
    private hgt: string; // height
    private hcl: string; // hair color
    private ecl: string; // eye color
    private pid: string; // passport ID
    private cid: number=0; // country ID, not necessary

    constructor(dict: passwordDict) {
            this.byr = parseInt(dict["byr"]);    // birth day
            this.iyr = parseInt(dict["iyr"]); // issue year
            this.eyr = parseInt(dict["eyr"]); // expiration year
            this.hgt = dict["hgt"]; // height
            this.hcl = dict["hcl"]; // hair color
            this.ecl = dict["ecl"]; // eye color
            this.pid = dict["pid"]; // passport ID
            this.cid = parseInt(dict["cid"]); // country ID, not necessary
    }

    validate1(){
         return !isNaN(this.byr) && !isNaN(this.iyr) && !isNaN(this.eyr) && this.pid !== undefined && this.hgt !== undefined && this.hcl !== undefined && this.ecl !== undefined;
    }

    validate2(){
        // numbers
        if (!isNaN(this.byr) && !isNaN(this.iyr) && !isNaN(this.eyr) && this.pid !== undefined && this.hgt !== undefined && this.hcl !== undefined && this.ecl !== undefined) {
            console.log("Valid!")
            return true
        } else {
            console.log("Invalid")
            return false
        }
    }
    dump(){
        console.log(this)
    }
}

interface passwordDict {
    [index: string]: string;
}

function part1(){
    let counter: number = 0;
    var data = fs.readFileSync('input.txt');
    const passportInfos = data.toString();
    const passports = passportInfos.split("\n\n");
    for (const passportInfosKey in passports) {
        const lines = passports[passportInfosKey].replace(/ /g, ",").replace(/\n/g, ",")
        const parsedLines = lines.split(",")
        let passport = {} as passwordDict;
        parsedLines.forEach(element =>  {
            const parsedElement = element.replace(":"," ").split(" ")
            passport[parsedElement[0]]=parsedElement[1]
        })

        const currentPassport = new Passport(passport)
        if(currentPassport.validate1()){
            counter++;
        }
    }
    console.log("(1) Found "+counter.toString()+" valid passports.")
}

part1()