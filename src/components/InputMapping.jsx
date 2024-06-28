import React from "react";
import { useState } from "react";

export default function useInputMapping() {
  const [keyboardInputMapping, setKeyboardInputMapping] = useState({});
  const [qwertyLayout, setQwertyLayout] = useState([
    [
      { value: "Q", class: "" },
      { value: "W", class: "" },
      { value: "E", class: "" },
      { value: "R", class: "" },
      { value: "T", class: "" },
      { value: "Y", class: "" },
      { value: "U", class: "" },
      { value: "I", class: "" },
      { value: "O", class: "" },
      { value: "P", class: "" },
    ],
    [
      { value: "A", class: "" },
      { value: "S", class: "" },
      { value: "D", class: "" },
      { value: "F", class: "" },
      { value: "G", class: "" },
      { value: "H", class: "" },
      { value: "J", class: "" },
      { value: "K", class: "" },
      { value: "L", class: "" },
    ],
    [
      { value: "Z", class: "" },
      { value: "X", class: "" },
      { value: "C", class: "" },
      { value: "V", class: "" },
      { value: "B", class: "" },
      { value: "N", class: "" },
      { value: "M", class: "" },
    ],
  ])
  return { qwertyLayout, setQwertyLayout, keyboardInputMapping, setKeyboardInputMapping };
}
