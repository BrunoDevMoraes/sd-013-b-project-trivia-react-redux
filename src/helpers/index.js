export default function setInitialState() {
  const playerObj = {
    player: {
      name: '',
      assertions: 0,
      score: 0,
      gravatarEmail: '',
    },
  };
  localStorage.setItem('state', JSON.stringify(playerObj));
}

export function shuffleArray(array) { // Função provinda de "https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array"
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

export function bindings(these) {
  these.handleScore = these.handleScore.bind(these);
  these.handleClickAnswer = these.handleClickAnswer.bind(these);
  these.handleAnswers = these.handleAnswers.bind(these);
  these.nextQuestion = these.nextQuestion.bind(these);
  these.renderCorrectButton = these.renderCorrectButton.bind(these);
  these.renderIncorrectButton = these.renderIncorrectButton.bind(these);
  these.renderQuestion = these.renderQuestion.bind(these);
}
