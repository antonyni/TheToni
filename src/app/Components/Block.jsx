'use client'
import { useState, useEffect } from 'react';
const Block = ({ rowWord, columnWord, onBlockUpdate, blockPosition, wordNumber }) => {
    const [currentLetter, setCurrentLetter] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    useEffect(() => {
        if (currentLetter != "") {
            if (rowWord){
                console.log(rowWord)
                onBlockUpdate(blockPosition[0] + "," + blockPosition[1], currentLetter, rowWord);
            }
            if (columnWord){
                console.log(columnWord)
                onBlockUpdate(blockPosition[0] + "," + blockPosition[1], currentLetter, columnWord);}
        }

    }, [currentLetter])
    const handleChange = (event) => {
        const inputValue = event.target.value.toUpperCase();
        setCurrentLetter(inputValue);
    };
    const handleKeyDown = (event) => {
        if (event.key.match(/^[a-zA-Z]$/)) {
            setCurrentLetter(event.key.toUpperCase());
        }
    };
    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };
    return (
        <>
            
            <input
                type="text"
                maxLength={1}
                style={{
                    position: "absolute",
                    top: (blockPosition[0] - 1) * 8 + "vw",
                    left: (blockPosition[1] - 1) * 8 + "vw",
                    paddingTop: "2vw",
                    width: '8vw',
                    height: '8vw',
                    textAlign: 'center',
                    fontSize: '6vw',
                    border: '1px solid #ccc',
                    caretColor: "transparent",
                    boxSizing: "border-box",
                    outline: "none",
                    backgroundColor: isFocused ? "#a7d8ff" : "white",
                }}
                value={currentLetter}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            <div style={{
                position: "absolute",
                top: (blockPosition[0] - 1) * 8 + "vw",
                left: (blockPosition[1] - 1) * 8 + "vw",
            }}>
                {wordNumber > 0 ? wordNumber : ""}
            </div>
        </>
    )
}

export default Block;