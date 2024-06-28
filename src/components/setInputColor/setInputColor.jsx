import React, {useState} from "react";
import useButtonClick from "../ButtonClick/useButtonClick";

export default function useInputColor() {
  const { inputValues, currentInput } = useButtonClick()
  const [ color, setColor ] = useState([[], [], [], [], [], []]);
  const [ dailyWord, setDailyWord ] = useState()

  const handleWordCorrectness = () => {
    if (inputValues[currentInput.row][4] === "") {
      return;
    }
    const correctLettersCount = {};
    const correctlyGuessedIndices = [];

    dailyWord.forEach((letter, index) => {
      correctLettersCount[letter] = (correctLettersCount[letter] || 0) + 1;
      if (inputValues[currentInput.row][index].toUpperCase() === letter) {
        correctlyGuessedIndices.push(index);
      }
    });

    const correctness = inputValues[currentInput.row].map((value, colIndex) => {
      const letter = value.toUpperCase();
      const isContained = dailyWord.includes(letter);
      const isRightPlace = letter === dailyWord[colIndex];
      if (isContained) {
        correctLettersCount[letter]--;
      }
      return { contained: isContained, rightPlace: isRightPlace };
    });
    const updateColorValues = inputValues[currentInput.row].map(
      (value, colIndex) => {
        if (value !== "") {
          const letter = value.toUpperCase();
          if (correctness[colIndex].rightPlace) {
            return "green";
          } else if (correctness[colIndex].contained) {
            if (correctLettersCount[letter] >= 0) {
              return "yellow";
            } else {
              return "gray";
            }
          } else {
            return "gray";
          }
        }
        return "";
      }
    );
    const updatedColorState = [...color];
    updatedColorState[currentInput.row] = updateColorValues;
    setColor(updatedColorState);
  };
  return {color, setColor, handleWordCorrectness, dailyWord, setDailyWord};
}
