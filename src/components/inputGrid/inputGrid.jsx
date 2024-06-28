import React, { useEffect, useState } from "react";
import useInputColor from "../setInputColor/setInputColor";
import useButtonClick from "../ButtonClick/useButtonClick";
import useCheckWord from "../checkWord/checkWord";

const useInputGrid = () => {
  const { color } = useInputColor();
  const { handleLetterClick, inputValues , currentInput, updateInputValues, setCurrentInput } = useButtonClick();
  const { setIsEnter, wordExists, setWordExists } = useCheckWord();
  const [ completed, setCompleted ] = useState(false);

  const toggleBackspace = (e) => {
    if (e.key === "Backspace" || e.type === "click") {
        if (inputValues[currentInput.row][currentInput.col] === "") {
          updateInputValues((prevValues) => {
            const newValues = [...prevValues];
            newValues[currentInput.row][currentInput.col - 1] = "";
            return newValues;
          });
          setCurrentInput((prevInput) => ({
            ...prevInput,
            col: currentInput.col - 1,
          }));
        } else {
          updateInputValues((prevValues) => {
            const newValues = [...prevValues];
            newValues[currentInput.row][currentInput.col] = "";
            return newValues;
          });
        }
        if (currentInput.col === 0) {
          setCurrentInput((prevInput) => ({
            ...prevInput,
            col: 0,
          }));
          return;
        }
      } else if (e.key === "Enter") {
      setIsEnter(true);
      if (!wordExists) {
        setTimeout(() => {
          setWordExists(false);
        }, 10);
       } 
      }
    }
  const inputRows = inputValues.map((row, rowIndex) => (
    <div
      key={rowIndex}
      className="row"
      id={rowIndex === currentInput.row ? "" : "readonly"}
    >
      {row.map((value, colIndex) => (
        <input
          inputMode="none"
          className={
            completed
              ? color[rowIndex][colIndex]
              : currentInput.col === colIndex && currentInput.row === rowIndex
              ? "focused"
              : color[rowIndex][colIndex]
          }
          key={colIndex}
          id={`input-${rowIndex}-${colIndex}`}
          value={value.toUpperCase()}
          maxLength={1}
          size={1}
          onKeyUp={toggleBackspace}
          onChange={(e) => handleLetterClick(e.target.value)}
          readOnly={
            completed ? true : rowIndex === currentInput.row ? false : true
          }
          autoComplete="off"
        />
      ))}
    </div>
  ));

  return {
    currentInput,
    setCurrentInput,
    inputValues,
    updateInputValues,
    completed,
    setCompleted,
    inputRows,
  };
};

export default useInputGrid;
