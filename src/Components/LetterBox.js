import "../CSS/LetterBox.css";
import "../CSS/App.css";

export default function LetterBox({ correct, letter }) {
  return <div className={`letter-box ${correct}`}>{letter}</div>;
}
