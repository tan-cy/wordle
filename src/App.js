import Game from "./Components/Game";
import "./CSS/App.css";
import { fetchSecretWord } from "./Components/Dictionary";
import { useEffect, useState } from "react";
function App() {
  const [SECRET_WORD, SET_SECRET_WORD] = useState();
  useEffect(
    () => async () => {
      SET_SECRET_WORD(await fetchSecretWord());
    },
    []
  );

  return (
    <div className="App">
      <h1>Wordle</h1>
      <Game SECRET_WORD={SECRET_WORD} />
    </div>
  );
}

export default App;
