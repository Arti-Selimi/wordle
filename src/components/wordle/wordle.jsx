import { useEffect, useState, createContext } from "react";
import { Modal } from "../modalComponents/modal";
import { Keyboard } from "../virtualKeyboard/keyboard";
import CheckWord from "../checkWord/checkWord";
import DisappearingMessage from "../disappearingMessage/disappearingMessage";
import useInputMapping from "../InputMapping";

export const wordleContext = createContext();

const Wordle = (props) => {
  const [wordExists, setWordExists] = useState(false);
  const [definition, setDefinition] = useState("");
  const [changeRow, setChangeRow] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [color, setColor] = useState([[], [], [], [], [], []]);
  const [currentInput, setCurrentInput] = useState({
    row: 0,
    col: 0,
  });
  const [inputValues, setInputValues] = useState([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);
  const [correctWord, setCorrectWord] = useState(false);
  const [isEnter, setIsEnter] = useState(true);
  const { keyboardInputMapping, setKeyboardInputMapping } = useInputMapping();
  const [isLoading, setIsLoading] = useState(false)

  const autoFocusFirstInput = () => {
    document
      .getElementById(`input-${changeRow ? 0 : currentInput.row + 1}-0`)
      .focus();
  };

  useEffect(() => {
    autoFocusFirstInput();
  }, []);

  const setKeyboardColors = () => {
    const inputMapping = {};

    inputRows.forEach((row, rowIndex) => {
      return row.props.children.forEach((input, colIndex) => {
        if (input.props.value !== "") {
          inputMapping[input.key] = {
            color: input.props.className,
            value: input.props.value,
          };
        }
      });
    });
    setKeyboardInputMapping((prevMapping) => ({
      ...prevMapping,
      ...inputMapping,
    }));
  };

  console.log("wordle", inputValues)

  useEffect(() => {
    const isEqual = JSON.stringify(props.dailyWord) === JSON.stringify(inputValues[5]);
    if (
      !isEnter &&
      currentInput.row === 5 &&
      inputValues[5].every((value) => value !== "")
    ) {
      if(isEqual) {
        setCorrectWord(true)
        setCompleted(true)
      }
    }
  }, [isEnter]);

  useEffect(() => {
    if (color) {
      if (
        currentInput.row < 6 &&
        color[currentInput.row - 1]?.every((letter) => letter === "green")
      ) {
        setCompleted(true);
        setCorrectWord(true);
      }
    }
    setKeyboardColors();
  }, [color]);

  const handleChange = (rowIndex, colIndex, value) => {
    const maxLength = 1;
    if (value && value.length >= maxLength) {
      const nextColIndex = colIndex + 1;
      if (nextColIndex < inputValues[rowIndex].length) {
        document.getElementById(`input-${rowIndex}-${nextColIndex}`).focus();
      }
    }
    if (colIndex === 4) {
      setCurrentInput((prevInput) => ({
        ...prevInput,
        row: rowIndex,
        col: colIndex,
      }));
      setChangeRow(false);
    }
  };

  const isLetter = (char) => {
    return /^[a-zA-Z]$/.test(char);
  };

  const handleRowChange = async () => {
    if (inputValues[currentInput.row][4] === "") {
      return;
    }
    setChangeRow(false);
    if (currentInput.row < 5 && currentInput.col === 4) {
      setCurrentInput((prevInput) => ({
        ...prevInput,
        row: currentInput.row + 1,
        col: 0,
      }));
      autoFocusFirstInput();
      handleWordCorrectness();
    } else {
      handleWordCorrectness();
    }
    console.log("daily word", props.dailyWord);
  };

  const toggleBackspace = (e) => {
    if (e.key === "Backspace" || e.type === "click") {
      if (inputValues[currentInput.row][currentInput.col] === "") {
        setInputValues((prevValues) => {
          const newValues = [...prevValues];
          newValues[currentInput.row][currentInput.col - 1] = "";
          return newValues;
        });
        setCurrentInput((prevInput) => ({
          ...prevInput,
          col: currentInput.col - 1,
        }));
      } else {
        setInputValues((prevValues) => {
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
      setIsEnter(false);
      if (wordExists && isEnter) {
        handleRowChange();
      } else {
        setTimeout(() => {
          setWordExists(false);
        }, 10);
      }
    }
  };

  const handleWordCorrectness = () => {
    if (inputValues[currentInput.row][4] === "") {
      return;
    }
    const correctLettersCount = {};
    const correctlyGuessedIndices = [];

    props.dailyWord.forEach((letter, index) => {
      correctLettersCount[letter] = (correctLettersCount[letter] || 0) + 1;
      if (inputValues[currentInput.row][index].toUpperCase() === letter) {
        correctlyGuessedIndices.push(index);
      }
    });

    const correctness = inputValues[currentInput.row].map((value, colIndex) => {
      const letter = value.toUpperCase();
      const isContained = props.dailyWord.includes(letter);
      const isRightPlace = letter === props.dailyWord[colIndex];
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

  const handleLetterClick = (letter) => {
    if (!isLetter(letter)) {
      return;
    }
    const updatedInputValues = [...inputValues];
    updatedInputValues[currentInput.row][currentInput.col] =
      letter.toUpperCase();
    setInputValues(updatedInputValues);
    if (currentInput.col !== 4) {
      setCurrentInput((prevInput) => ({
        ...prevInput,
        col: currentInput.col + 1,
      }));
    }
    handleChange(currentInput.row, currentInput.col, letter);
  };

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
  return (
    <wordleContext.Provider
      value={{
        currentInput,
        setCurrentInput,
        inputValues,
        setWordExists,
        isEnter,
        setIsEnter,
        inputRows,
        setIsLoading
      }}
    >
      <CheckWord
        currentWord={inputValues}
        currentRow={currentInput.row}
        completed={completed}
        setDefinition={setDefinition}
      />
      {!isLoading && !wordExists && isEnter && currentInput.col === 4 ? (
        <DisappearingMessage message="Word does not exist in our database." />
      ) : (
        ""
      )}
      <div className="wordle">
        <h1>Wordle Unlimited</h1>
        {completed ? (
          <>
            <Modal
              dailyWord={props.dailyWord}
              setCompleted={setCompleted}
              completed={completed}
              correctWord={correctWord}
              setCorrectWord={setCorrectWord}
              definition={definition}
            />
            <div className="background"></div>
          </>
        ) : (
          ""
        )}

        <div className="wordleMain">{inputRows}</div>
        <Keyboard
          onEnterClick={() => {
            setIsEnter(false);
            if (wordExists && isEnter) {
              handleWordCorrectness();
              handleRowChange();
            } else {
              setTimeout(() => {
                setWordExists(false);
              }, 10);
            }
          }}
          onLetterClick={handleLetterClick}
          onBackspaceClick={toggleBackspace}
          keyboardInputMapping={keyboardInputMapping}
        />
      </div>
    </wordleContext.Provider>
  );
};

export default Wordle;
