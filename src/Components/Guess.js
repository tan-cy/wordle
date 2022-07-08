import LetterBox from "./LetterBox";
import "../CSS/Guess.css";

export default function Guess(props) {
  const displayWord = (guess, parIndex) => {
    let word = guess;

    return word.map((letter, index) => (
      <LetterBox
        correct={letter.correct}
        letter={letter.value}
        key={parIndex * index + index}
      />
    ));
  };

  return (
    <div className="guess-container">
      {props.guesses.map((guess, index) => (
        <div className="guess" key={index}>
          {displayWord(guess, index)}
        </div>
      ))}
    </div>
  );
}
