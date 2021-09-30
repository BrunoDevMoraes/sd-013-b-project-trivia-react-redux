import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class FeedBack extends Component {
  constructor(props) {
    super(props);
    this.getAssertions = this.getAssertions.bind(this);
  }

  componentDidMount() {
    const { name, score, assertionsGlobal } = this.props;
    const playerObj = { name, score, picture: 'https://www.gravatar.com/avatar/' };
    let ranking = JSON.parse(localStorage.getItem('ranking'));
    if (ranking === null) {
      ranking = [];
    }
    ranking = [...ranking, playerObj];
    localStorage.setItem('ranking', JSON.stringify(ranking));

    const playerLSinObj = JSON.parse(localStorage.getItem('state'));
    playerLSinObj.player.assertions = assertionsGlobal;
    localStorage.setItem('state', JSON.stringify(playerLSinObj));
  }

  getAssertions() {
    const THREE = 3;
    const { assertionsGlobal } = this.props;
    let feedbackMessage = '';
    if (assertionsGlobal < THREE) {
      feedbackMessage = <p>Podia ser melhor...</p>;
    } else {
      feedbackMessage = <p>Mandou bem!</p>;
    }
    return feedbackMessage;
  }

  render() {
    const { score, assertionsGlobal } = this.props;
    return (
      <div className="body-feedback">
        <Header />
        <div className="feedback-container">
          <div
            className="feedback-text"
            data-testid="feedback-text"
          >
            { this.getAssertions() }
            <p
              data-testid="feedback-total-question"
            >
              { `${assertionsGlobal} acertos` }
            </p>
            <p
              data-testid="feedback-total-score"
            >
              { `${score} Pontos` }
            </p>
          </div>
          <div>
            <Link to="/">
              <button
                className="cross_line"
                type="button"
                data-testid="btn-play-again"
              >
                Jogar novamente
              </button>
            </Link>
            <Link to="/Ranking">
              <button
                className="cross_line"
                type="button"
                data-testid="btn-ranking"
              >
                Ver Ranking
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

FeedBack.propTypes = {
  assertionsGlobal: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertionsGlobal: state.player.assertions,
  name: state.player.name,
  score: state.player.score,
});

export default connect(mapStateToProps)(FeedBack);
