import * as fs from 'fs';

function validateYear(year: number, min: number, max: number) {
    return (/[0-9]{4}/g).test(year.toString()) && year >= min && year <= max;
}

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

    validate2() {
        // basic check
        if (!isNaN(this.byr) && !isNaN(this.iyr) && !isNaN(this.eyr) && this.pid !== undefined && this.hgt !== undefined && this.hcl !== undefined && this.ecl !== undefined) {
        } else {
            return false
        }

        // birth/issue/expiration dates
        const byrStatus: boolean = validateYear(this.byr, 1920,2002);
        const iyrStatus: boolean = validateYear(this.iyr, 2010,2020);
        const eyrStatus: boolean = validateYear(this.eyr, 2020,2030);

        // height
        let hgtStatus: boolean = false;
        if((/cm/g).test(this.hgt)){
            const hgt = parseInt(this.hgt.slice(0, -2));
            if(hgt >= 150 && hgt <= 193){
                hgtStatus = true;
            }
        } else if((/in/g).test(this.hgt)){
            const hgt = parseInt(this.hgt.slice(0, -2));
            if(hgt >= 59 && hgt <= 76){
                hgtStatus = true;
            }
        }

        // hair color
        const hclStatus: boolean = (/^#[0-9a-f]{6}$/g).test(this.hcl)

        // eye color
        const eclStatus: boolean = (/amb|blu|brn|gry|grn|hzl|oth/g).test(this.ecl)

        // passport id
        const pidStatus: boolean = (/^[0-9]{9}$/g).test(this.pid)

        if(byrStatus && iyrStatus && eyrStatus && hgtStatus && hclStatus && eclStatus && pidStatus){
            return true
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

function part2(){
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
        if(currentPassport.validate2()){
            counter++;
        }
    }
    console.log("(2) Found "+counter.toString()+" valid passports.")
}

part1()
part2()