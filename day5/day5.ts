import * as fs from "fs";

const data = fs.readFileSync('input.txt').toString();

let position: number = 0;
let row: [number, number] = [0, 127];
let rowNumber: number = 0;

let columnNumber: number = 0;
let column: [number, number] = [0, 7];

let maximumSeatID: number = 0;

function calculateRange(word: string) {
    //console.log("Position: "+position.toString()+", letter: "+word[position])
    if ((/F/g).test(word[position])){
        if(word[position]=="F") {
            if (position == 6) {
                rowNumber = row[0]
            } else {
                row[1] = (row[1] - 1 + row[0]) / 2
            }
        }
    } else if((/B/g).test(word[position])){
        if(position==6) {
            rowNumber = row[1]
        } else {
            row[0]=(row[1]+1+row[0])/2
        }
    }

    if((/R/g).test(word[position])){
        if (position == 9) {
            columnNumber = column[1]
        } else {
            column[0]=(column[1]+1+column[0])/2
        }
    }
    else if((/L/g).test(word[position])) {
        if (position == 9) {
            columnNumber = column[0]
        } else {
            column[1] = (column[1] - 1 + column[0]) / 2
        }
    }

    position++;
    if(position<=9){
        calculateRange(word)
    } else {
        const seatID = rowNumber*8+columnNumber
        console.log("Boarding pass "+word+" | Row: "+rowNumber.toString()+", column: "+columnNumber.toString()+", Seat ID: "+seatID.toString())
        if(seatID > maximumSeatID){
            maximumSeatID=seatID
        }
    }
}

data.split("\n").forEach(element => {
    position=0;
    row = [0, 127];
    column = [0, 7];
    calculateRange(element)
})
console.log(maximumSeatID)