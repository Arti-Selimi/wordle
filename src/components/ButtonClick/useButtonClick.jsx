import React, { useState } from "react";

export default function useButtonClick() {
  const [currentInput, setCurrentInput] = useState({ row: 0, col: 0 });
  const [inputValues, setInputValues] = useState([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);
  const [changeRow, setChangeRow] = useState(false);
  const [givenWord, setGivenWord] = useState([]);

  const updateInputValues = (newInputValues) => {
      setInputValues(newInputValues);
  };
    
  const autoFocusFirstInput = () => {
    document
      .getElementById(`input-${changeRow ? 0 : currentInput.row + 1}-0`)
      .focus();
  };
  const isLetter = (char) => {
    return /^[a-zA-Z]$/.test(char);
  };

  console.log(inputValues)

  const handleLetterClick = (letter) => {
    if (!isLetter(letter)) {
      return;
    }
    const updatedInputValues = [...inputValues];
    updatedInputValues[currentInput.row][currentInput.col] =
      letter.toUpperCase();
    updateInputValues(updatedInputValues);
    if (currentInput.col !== 4) {
      setCurrentInput((prevInput) => ({
        ...prevInput,
        col: currentInput.col + 1,
      }));
    }
    handleInputChange(letter)
  };

  const handleInputChange = (letter) => {
    const maxLength = 1;
    if (letter && letter.length >= maxLength) {
      const nextColIndex = currentInput.col + 1;
      if (nextColIndex < inputValues[currentInput.row].length) {
        document
          .getElementById(`input-${currentInput.row}-${nextColIndex}`)
          .focus();
      }
    } 
    if (currentInput.col === 4) {
      setCurrentInput((prevInput) => ({
        ...prevInput,
        row: currentInput.row,
        col: currentInput.col,
      }));
      setChangeRow(false);
    }
  }

  return {
    handleLetterClick,
    changeRow,
    setChangeRow,
    autoFocusFirstInput,
    inputValues,
    currentInput,
    updateInputValues,
    setCurrentInput,
    givenWord
  };
}
