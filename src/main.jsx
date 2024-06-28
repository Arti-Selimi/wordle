import Wordle from "./components/wordle/wordle";
import axios from "axios";
import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { five_char_words } from "./word_list.ts";

const queryClient = new QueryClient();

const Main = () => {
  const [dailyWord, setDailyWord] = useState([]);

  useEffect(() => {
    setDailyWord(five_char_words[Math.floor(Math.random() * 1347)].toUpperCase().split(""));
  }, [1]);

  console.log(dailyWord)

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="main">
          <Wordle dailyWord={dailyWord} />
        </div>
      </QueryClientProvider>
    </>
  );
};

export default Main;
