import { KEYS } from "./Constants";
import "../CSS/Keyboard.css";
export default function Keyboard({ disabled, onKeyPressed, guessedKeys }) {
  const getColorOfKey = (key) => {
    let color = "default";
    if (guessedKeys[key]) {
      color = guessedKeys[key];
      console.log(color);
    }
    return color;
  };

  return (
    <>
      {KEYS.map((row, index) => (
        <div key={index} className="keyboard">
          {row.map((key) => {
            let color = getColorOfKey(key);
            return (
              <button
                key={key}
                value={key}
                onClick={onKeyPressed}
                disabled={disabled}
                className={"keys " + color}
              >
                {key}
              </button>
            );
          })}
        </div>
      ))}
    </>
  );
}
