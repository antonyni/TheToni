'use client'
import { useEffect, useState } from "react"
const createGrayBorder = (gridLength, gridWidth) => {
    let obj = [];
    for(let i = 1; i < gridLength; i++){
            obj.push(<div key={"gridRow"+i} 
                style={{
                width: gridWidth * 8 + "vw",
                height:".1vw",
                position:"absolute",
                top: 8 * i + "vw",
                backgroundColor:"gray",
            }}>
            </div>);
        
    }
    for(let i = 1; i < gridWidth; i++){
        obj.push(<div key={"gridColumn"+i} 
            style={{
            height: gridLength * 8 + "vw",
            width:".1vw",
            position:"absolute",
            left: 8 * i + "vw",
            backgroundColor:"gray",
        }}>
        </div>);
    
}
    return(
        obj
    )
}
const Grid = ({ gridLength, gridWidth }) => {
    const [gridObject, setGridObject] = useState([]
    );
    useEffect(() => {
        let arr = [];
        for (let i = 0; i < gridLength; i++) {
            let row = [];
            for (let j = 0; j < gridWidth; j++) {
                row.push([i, j]);
            }
            arr.push(row);
        }
        setGridObject(arr);
    }, []
    )
    return (
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
                                        top: 8 * value[1] + "vw",
                                        left: 8 * value[0] + "vw",
                                        boxSizing: "border-box",
                                    }}
                                        key={id2}
                                    >
                                    </div>
                            )
                        })
                    )
                })
            }
            {createGrayBorder(gridLength,gridWidth)}
        </div>
    )
}

export default Grid;