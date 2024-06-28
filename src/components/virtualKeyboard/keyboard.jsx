import { useState, useEffect, useContext } from "react";
import useInputMapping from "../InputMapping";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons'; 

export const Keyboard = ({
  onEnterClick,
  onBackspaceClick,
  onLetterClick,
  keyboardInputMapping,
}) => {
  const { qwertyLayout, setQwertyLayout } = useInputMapping();

  const handleKeyDown = (event, key) => {
    if (key === "Enter") {
      onEnterClick();
    } else if (key === "Backspace") {
      onBackspaceClick();
    } else if (key.match(/[A-Z]/)) {
      onLetterClick(key);
    }
  };

  useEffect(() => {
    const setKeyColors = () => {
      const props = Object.values(keyboardInputMapping);
      const updatedLayout = qwertyLayout.map(row =>
        row.map(letter => {
          const matchingProp = props.find(prop => prop.value === letter.value);
          if (matchingProp) {
            return { ...letter, class: matchingProp.color };
          }
          return letter;
        })
      );
      setQwertyLayout(updatedLayout);
    };
    setKeyColors();
  }, [keyboardInputMapping]);


  return (
    <>
      <div className="keyboard">
        {qwertyLayout.map((row, rowIndex) => (
          <div key={rowIndex} className={`row row-${rowIndex + 1}`}>
            {rowIndex === 2 ? (
              <button className="special-button" onClick={onEnterClick}>
                Enter
              </button>
            ) : (
              ""
            )}
            {row.map((letter, colIndex) => (
              <input
                inputMode="none"
                value={letter.value.toUpperCase()}
                className={letter.class}
                id={`input-${rowIndex}-${colIndex}`}
                key={colIndex}
                readOnly
                size={1}
                onClick={(event) => {
                  handleKeyDown(event, letter.value);
                }}
              />
            ))}
            {rowIndex === 2 ? (
              <button className="special-button" onClick={onBackspaceClick}>
                <FontAwesomeIcon icon={faDeleteLeft} />
              </button>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    </>
  );
};
