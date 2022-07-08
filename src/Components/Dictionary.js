export const fetchSecretWord = async () => {
  const wordsUrl = "https://random-word-api.herokuapp.com/word";

  const word = await fetch(`${wordsUrl}?length=5`).then((res) => {
    return res.json();
  });
  return word[0].toUpperCase().split("");
};

export const checkValidWord = async (word) => {
  const dictionaryUrl = "https://api.dictionaryapi.dev/api/v2/entries/en";
  const wordFound = await fetch(`${dictionaryUrl}/${word}`)
    .then((res) => {
      return res.status !== 404;
    })
    .catch((e) => {
      console.log(e);
    });
  return wordFound;
};
