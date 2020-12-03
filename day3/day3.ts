import * as fs from 'fs';
import * as rd from 'readline'


function getNumberOfTrees(howMuchX: number, howMuchY: number) {
    const reader = rd.createInterface(fs.createReadStream("input.txt"))
    let numberOfTrees: number = 0;
    let Xpos: number = 0;
    let Ypos: number = 0;
    let owo: string[][] = [];
    let numberOfLines: number = 323;
    let numberOfCharactersPerLine: number = 31;

    reader.on("line", (l: string) => {
        owo.push(l.split(''));
    })

    reader.on("close", () => {
        for (let i = 0; i < numberOfLines - 1; i = i + howMuchY) {
            if (Xpos + howMuchX >= numberOfCharactersPerLine) {
                Xpos = Xpos + howMuchX - numberOfCharactersPerLine;
            } else {
                Xpos = Xpos + howMuchX;
            }
            //Ypos++;
            //console.log("Xpos: " + Xpos + ", Ypos: " + Ypos + ", i: " + i + ": " + owo[Ypos][Xpos])
            if (owo[Ypos][Xpos] == "#") {
                numberOfTrees++;
            }
        }
        console.log("Found " + numberOfTrees.toString() + " trees for right "+howMuchX+", down "+howMuchY)
    })
}

getNumberOfTrees(1, 1)

// part 2: did it manually, 81×292×89×101×44=9354744432
