import { useEffect, useState } from "react";
import Guess from "./Guess";
import Keyboard from "./Keyboard";
import {
  ALMOST,
  BACKSPACE_KEY,
  CORRECT,
  DEFAULT_WORD,
  ENTER_KEY,
  GAME_OVER_MSG,
  GUESS_INCORRECT_LEN_MSG,
  GUESS_NOT_IN_DICTIONARY_MSG,
  LOSE_MSG,
  MAX_GUESS_LENGTH,
  MAX_NUM_OF_GUESS,
  WIN_MSG,
  WRONG,
} from "./Constants";
import { checkValidWord } from "./Dictionary";

export default function Game({ SECRET_WORD }) {
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameWon, setGameWon] = useState(false);
  const [guessedKeys, setGuessedKeys] = useState({});
  const [guesses, setGuesses] = useState(Array(6).fill(DEFAULT_WORD));
  const [guessNum, setGuessNum] = useState(0);

  useEffect(() => {
    if (gameWon || guessNum >= MAX_NUM_OF_GUESS) {
      let resultMsg = gameWon ? WIN_MSG : LOSE_MSG;
      alert(GAME_OVER_MSG + resultMsg);
      return;
    }
  }, [gameWon, guessNum]);

  const checkColor = (val, index) => {
    if (SECRET_WORD[index] === val) {
      return CORRECT;
    } else if (SECRET_WORD.indexOf(val) > -1) {
      return ALMOST;
    } else {
      return WRONG;
    }
  };

  const setColorsForGuess = () => {
    let numCorrect = 0;
    let coloredGuess = [...guesses];
    coloredGuess[guessNum] = coloredGuess[guessNum].map((letter, index) => {
      const val = letter.value;
      const color = checkColor(val, index);

      const newKeyColors = guessedKeys;
      newKeyColors[val] = color;
      setGuessedKeys(newKeyColors);
      if (color === CORRECT) {
        numCorrect++;
      }
      return { ...letter, correct: color };
    });

    setGuesses(coloredGuess);
    return numCorrect;
  };

  const getNumCorrect = () => {
    return setColorsForGuess();
  };

  const handleValidGuess = () => {
    setGuessNum(guessNum + 1);
    setCurrentGuess("");
    return getNumCorrect();
  };

  const onEnterPressed = async () => {
    if (currentGuess.length !== 5) {
      alert(GUESS_INCORRECT_LEN_MSG);
    } else if (!(await checkValidWord(currentGuess))) {
      alert(GUESS_NOT_IN_DICTIONARY_MSG);
    } else {
      return handleValidGuess();
    }
  };

  const getNewGuesses = (newGuess) => {
    let newWord = DEFAULT_WORD.map((letter, index) => {
      return { ...letter, value: newGuess[index] ? newGuess[index] : " " };
    });
    let temp = [...guesses];
    temp[guessNum] = newWord;
    return temp;
  };

  const updateGuesses = (newGuess) => {
    setCurrentGuess(newGuess);
    setGuesses(getNewGuesses(newGuess));
  };

  const checkGameWon = (numCorrect) => {
    if (numCorrect === MAX_GUESS_LENGTH) {
      setGameWon(true);
    }
  };

  const checkGameOver = async (keyPressed) => {
    if (keyPressed === ENTER_KEY) {
      const numCorrect = await onEnterPressed();
      checkGameWon(numCorrect);
    } else {
      handleKeyPressed(keyPressed);
    }
  };

  const handleKeyPressed = (keyPressed) => {
    let temp = currentGuess;
    if (keyPressed === BACKSPACE_KEY) {
      temp = temp.slice(0, -1);
    } else if (currentGuess.length >= MAX_GUESS_LENGTH) {
      alert(GUESS_INCORRECT_LEN_MSG);
      return;
    } else {
      temp += keyPressed.toUpperCase();
    }
    updateGuesses(temp);
  };

  const onKeyPressed = (event) => {
    const keyPressed = event.target.value;
    checkGameOver(keyPressed);
  };

  return (
    <section>
      <Guess guesses={guesses} />
      <Keyboard
        onKeyPressed={onKeyPressed}
        disabled={gameWon}
        guessedKeys={guessedKeys}
      />
    </section>
  );
}
