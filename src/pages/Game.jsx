import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { updateScore, setDisabled, setOver, setTimer } from '../actions';
import Header from '../components/Header';
import setInitialState, { shuffleArray, bindings } from '../helpers';
import { countdownTimer, resetTimer,
  timeIsOver, renderTimer, timerFunction } from '../helpers/cronometer';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shuffledArray: [],
      alreadyShuffled: false,
      questionIndex: 0,
      answered: false,
      redirect: false,
    };
    bindings(this);
  }

  componentDidMount() { setInitialState(); }

  componentDidUpdate() {
    const { alreadyShuffled } = this.state;
    const { questions, timer } = this.props;
    if (timer === 0) {
      resetTimer();
    }
    if (alreadyShuffled === false) {
      this.handleAnswers(questions);
    }
  }

  handleScore(questionIndex) {
    const TEN = 10;
    const ONE = 1;
    const TWO = 2;
    const THREE = 3;
    const { questions, updateScoreProp } = this.props;
    const difficultyQ = questions[questionIndex].difficulty;
    let rightDifficulty = Buffer.from(difficultyQ, 'base64').toString('utf-8');
    const { timer } = this.props;
    if (rightDifficulty === 'easy') {
      rightDifficulty = ONE;
    } else if (rightDifficulty === 'medium') {
      rightDifficulty = TWO;
    } else if (rightDifficulty === 'hard') {
      rightDifficulty = THREE;
    }
    const currentScore = (TEN + (timer * rightDifficulty));
    updateScoreProp(currentScore);
  }

  handleClickAnswer(event) {
    const { setDisabledAction } = this.props;
    setDisabledAction(true);
    this.setState({
      answered: true,
    });
    const { target } = event;
    const parentDiv = target.parentElement;
    const buttons = parentDiv.querySelectorAll('button');
    buttons.forEach((button) => {
      const { dataset: { testid } } = button;
      button.classList.add(testid);
    });
  }

  handleAnswers(questions) {
    if (questions.length > 1) {
      const { questionIndex } = this.state;
      const arrayOfAnswers = [{ id: 3,
        correct: true,
        answer: questions[questionIndex].correct_answer }];
      questions[questionIndex].incorrect_answers.forEach((element, index) => (
        arrayOfAnswers.push({ id: index,
          correct: false,
          answer: questions[questionIndex].incorrect_answers[index] })
      ));
      const shuffledArray = shuffleArray(arrayOfAnswers);
      countdownTimer();
      this.setState({
        shuffledArray,
        alreadyShuffled: true,
      });
    }
  }

  nextQuestion() {
    timerFunction();
    this.setState((prevstate) => ({
      questionIndex: prevstate.questionIndex + 1,
      alreadyShuffled: false,
      answered: false,
    }));
    const questionContainer = document.querySelectorAll('#question-container button');
    for (let index = 0; index < questionContainer.length; index += 1) {
      questionContainer[index].classList.remove('correct-answer');
      questionContainer[index].classList.remove('wrong-answer-0');
      questionContainer[index].classList.remove('wrong-answer-1');
      questionContainer[index].classList.remove('wrong-answer-2');
    }
    const { questionIndex } = this.state;
    const FOUR = 4;
    if (questionIndex === FOUR) {
      this.setState({
        alreadyShuffled: true,
        redirect: true,
      });
    }
  }

  renderCorrectButton(questions, questionIndex, index, disabled) {
    const base64Correct = JSON.stringify(questions[questionIndex].correct_answer);
    if (base64Correct !== undefined) {
      const buffCorrect = Buffer.from(base64Correct, 'base64');
      const stringCorrect = buffCorrect.toString('utf-8');
      return (
        <button
          key={ index }
          type="button"
          disabled={ disabled }
          data-testid="correct-answer"
          onClick={ (event) => {
            this.handleClickAnswer(event);
            this.handleScore(questionIndex);
          } }
        >
          {stringCorrect}
        </button>
      );
    }
  }

  renderIncorrectButton(questions, questionIndex, index, disabled) {
    const base64Incorrect = JSON
      .stringify(questions[questionIndex].incorrect_answers[index]);
    if (base64Incorrect !== undefined) {
      const buffIncorrect = Buffer.from(base64Incorrect, 'base64');
      const stringIncorrect = buffIncorrect.toString('utf-8');
      return (
        <button
          key={ index }
          type="button"
          disabled={ disabled }
          data-testid={ `wrong-answer-${index}` }
          onClick={ this.handleClickAnswer }
        >
          {stringIncorrect}
        </button>
      );
    }
  }

  renderQuestion(questions, shuffledArray, questionIndex, over) {
    const base64Category = JSON.stringify(questions[questionIndex].category);
    const buffCategory = Buffer.from(base64Category, 'base64');
    const stringCategory = buffCategory.toString('utf-8');
    const base64Question = JSON.stringify(questions[questionIndex].question);
    const buffQuestion = Buffer.from(base64Question, 'base64');
    const stringQuestion = buffQuestion.toString('utf-8');
    if (questions.length > 1) {
      const { answered } = this.state;
      const { disabled } = this.props;
      return (
        <div className="question-container" id="question-container">
          <h2 data-testid="question-category">{stringCategory}</h2>
          <p data-testid="question-text">{stringQuestion}</p>
          {shuffledArray.map((element) => (
            element.correct
              ? this
                .renderCorrectButton(questions, questionIndex, element.id, disabled)
              : this
                .renderIncorrectButton(questions, questionIndex, element.id, disabled)
          ))}
          {over === false ? renderTimer(answered) : timeIsOver(disabled)}
        </div>
      );
    }
    return <h4>Preparando Quiz</h4>;
  }

  render() {
    const { questions, over, disabled } = this.props;
    const { shuffledArray, questionIndex, redirect } = this.state;
    if (redirect) return <Redirect to="/FeedBack" />;
    return (
      <div className="body-game">
        <Header />
        <div className="questions">
          {this.renderQuestion(questions, shuffledArray, questionIndex, over)}
          {
            disabled ? (
              <button
                className="cta"
                data-testid="btn-next"
                type="button"
                onClick={ this.nextQuestion }
              >
                Próxima
              </button>
            ) : null
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.game.questions,
  timer: state.cronometer.timer,
  interval: state.cronometer.interval,
  over: state.cronometer.over,
  disabled: state.cronometer.disabled,
});

const mapDispatchToProps = (dispatch) => ({
  setDisabledAction: (boolean) => dispatch(setDisabled(boolean)),
  setTimerAction: (timer) => dispatch(setTimer(timer)),
  setOverAction: (boolean) => dispatch(setOver(boolean)),
  updateScoreProp: (points) => dispatch(updateScore(points)),
});

Game.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.any).isRequired,
  updateScoreProp: PropTypes.func.isRequired,
  timer: PropTypes.number.isRequired,
  over: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  setDisabledAction: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
