'use client'
import { useEffect, useState, useRef } from "react"
import Block from "./Block";
const createGrayBorder = (gridLength, gridWidth) => {
    let obj = [];
    for (let i = 1; i < gridLength; i++) {
        obj.push(<div key={"gridRow" + i}
            style={{
                width: gridWidth * 8 + "vw",
                height: ".1vw",
                position: "absolute",
                top: 8 * i + "vw",
                backgroundColor: "gray",
            }}>
        </div>);

    }
    for (let i = 1; i < gridWidth; i++) {
        obj.push(<div key={"gridColumn" + i}
            style={{
                height: gridLength * 8 + "vw",
                width: ".1vw",
                position: "absolute",
                left: 8 * i + "vw",
                backgroundColor: "gray",
            }}>
        </div>);

    }
    return (
        obj
    )
}
const Grid = ({ gridLength, gridWidth }) => {
    let words = {
        IRENE: {
            startingPosition: [1, 4],
            direction: "down",
        },
        WILL: {
            startingPosition: [1, 3],
            direction: "across"
        },
        YOU: {
            startingPosition: [3, 7],
            direction: "across"
        },
        BE: {
            startingPosition: [3, 3],
            direction: "across"
        },
        MY: {
            startingPosition: [2, 7],
            direction: "down",
        },
        VALENTINE: {
            startingPosition: [5, 1],
            direction: "across"
        },
    }
    const totalWords = Object.keys(words).length;
    let currentCorrectWords = 0;

    for (let keys in words) {
        words[keys].wordLength = keys.length;
        words[keys].totalCorrect = 0;
        words[keys].letterMap = {};
        let charArray = keys.split("");
        const start = words[keys].startingPosition;
        if (words[keys].direction == "down") {
            for (let i = 0; i < keys.length; i++) {
                words[keys].letterMap[(start[0] + i) + "," + start[1]] = {
                    correct: false,
                    letter: charArray[i],
                };
            }
        }
        else {
            for (let i = 0; i < keys.length; i++) {

                words[keys].letterMap[start[0] + "," + (start[1] + i)] = {
                    correct: false,
                    letter: charArray[i]
                }
            }
        }
    }
    const onBlockUpdate = (position, letter, word) => {
        let previousState = words[word]["letterMap"][position].correct;
        if (previousState && letter != words[word]["letterMap"][position].letter) {
            words[word]["letterMap"][position].correct = false;
            words[word].totalCorrect--;
            if (words[word].totalCorrect == words[word].wordLength - 1) {
                currentCorrectWords--;
            }

        }
        if (!previousState && letter == words[word]["letterMap"][position].letter) {
            words[word]["letterMap"][position].correct = true;
            words[word].totalCorrect++;
            console.log(words[word].totalCorrect, words[word].wordLength)
            if (words[word].totalCorrect == words[word].wordLength) {
                currentCorrectWords++;
                if (currentCorrectWords == totalWords)
                    alert('you solved the crossword!');
            }
        }
    }

    let sortedKeys = Object.keys(words);
    sortedKeys.sort((a, b) => {
        if (words[a].startingPosition[0] == words[b].startingPosition[0])
            return words[a].startingPosition[1] - words[b].startingPosition[1];
        return words[a].startingPosition[0] - words[b].startingPosition[0];
    })

    let blocks = [];
    let blockMap = {

    }
    for (let key of sortedKeys) {
        for (let block in words[key]["letterMap"]) {
            if (!blockMap[block]){
                blockMap[block] = {};
            }
            if (words[key].direction == "across") {

                blockMap[block]["rowWord"] = key;
            }
            else {
                blockMap[block]["columnWord"] = key;
            }
        }
    }
    let startingCount = 0;
    for (let blockKey in blockMap) {
        const coordArray = blockKey.split(',');
        coordArray[0] = parseInt(coordArray[0]);
        coordArray[1] = parseInt(coordArray[1]);
        if (blockMap[blockKey].rowWord) {
            const word = blockMap[blockKey].rowWord;
            if (blockKey == words[word].startingPosition[0] + ',' + words[word].startingPosition[1]) {
                startingCount++;
                blocks.push(
                    <Block key={blockKey} rowWord={blockMap[blockKey].rowWord} columnWord={blockMap[blockKey].columnWord} onBlockUpdate={onBlockUpdate} blockPosition={coordArray} wordNumber={startingCount}></Block>
                )
                continue;
            }

        }
        if (blockMap[blockKey].columnWord) {
            const word = blockMap[blockKey].columnWord;
            if (blockKey == words[word].startingPosition[0] + ',' + words[word].startingPosition[1]) {
                startingCount++;
                blocks.push(
                    <Block key={blockKey} rowWord={blockMap[blockKey].rowWord} columnWord={blockMap[blockKey].columnWord} onBlockUpdate={onBlockUpdate} blockPosition={coordArray} wordNumber={startingCount}></Block>
                )
                continue;
            }

        }
        blocks.push(
            <Block key={blockKey} rowWord={blockMap[blockKey].rowWord} columnWord={blockMap[blockKey].columnWord} onBlockUpdate={onBlockUpdate} blockPosition={coordArray} wordNumber={0}></Block>
        )
    }



    const [gridObject, setGridObject] = useState([]
    );
    useEffect(() => {
        let arr = [];
        for (let i = 0; i < gridLength; i++) {
            let row = [];
            for (let j = 0; j < gridWidth; j++) {
                const blockData = { coordinates: [i, j], }
                row.push(blockData);
            }
            arr.push(row);
        }

        setGridObject(arr);
    }, []
    )
    return (
        <div>
            <div style={{
                position: "relative",
                borderStyle: "solid",
                borderWidth: ".4vw",
                width: gridWidth * 8 + "vw",
                height: gridLength * 8 + "vw",
            }}>
                {

                    gridObject.map((row, id1) => {
                        return (
                            row.map((value, id2) => {
                                return (
                                    <div style={{
                                        width: "8vw",
                                        height: "8vw",
                                        backgroundColor: "black",
                                        position: "absolute",
                                        top: 8 * value.coordinates[0] + "vw",
                                        left: 8 * value.coordinates[1] + "vw",
                                        boxSizing: "border-box",
                                        zIndex: -1,
                                    }}
                                        key={id2}
                                    >

                                    </div>
                                )
                            })
                        )
                    })
                }



                {createGrayBorder(gridLength, gridWidth)}
                {blocks}
            </div>

        </div>

    )

}

export default Grid;