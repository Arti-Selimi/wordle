import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { wordleContext } from "../wordle/wordle";

const fetchData = async (givenWord) => {
  const response = await axios.get(
    `https://dictionaryapi.com/api/v3/references/thesaurus/json/${givenWord}?key=93198ebc-5aa7-43c2-962d-560380041018`
  );
  return response.data;
};
const CheckWord = (props) => {
  const givenWord = props.currentWord[props.currentRow].join("");
  const { setWordExists, inputValues, isEnter, setIsEnter, setIsLoading } =
    useContext(wordleContext);

  const { isLoading, error, data } = useQuery(
    "wordData",
    () => fetchData(givenWord),
    {
      enabled:
        givenWord.length === 5 && inputValues[props.currentRow][4] !== "",
    }
  );

  console.log(givenWord)

  useEffect(() => {
    if(isEnter) {
      setIsLoading(isLoading)
    }
    if (data) {
      console.log(data);
      const word = data[0]?.hwi?.hw;
      if (word) {
        setWordExists(true);
        setIsEnter(true);
        props.setDefinition(data[0].shortdef[0])
      } else{
        console.log("word doesnt exist");
        setWordExists(false);
        setIsEnter(false);
      } 
    }
  }, [isLoading, data]);

  return;
};

export default CheckWord;
