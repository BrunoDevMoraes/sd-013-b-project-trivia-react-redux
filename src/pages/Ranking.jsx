import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    return (
      <body className="body-ranking">
        <h1 id="title-ranking" data-testid="ranking-title">Ranking</h1>
        <br />
        <ul>
          { ranking.sort((first, second) => second.score - first.score)
            .map((player, index) => (
              <li className="li-ranking" key={ index }>
                <img src={ player.picture } alt={ `Img of ${player.name}` } />
                <h4 data-testid={ `player-name-${index}` }>{ player.name }</h4>
                <h4 data-testid={ `player-score-${index}` }>{ player.score }</h4>
              </li>
            ))}
        </ul>
        <div className="button-ranking">
          <Link to="/">
            <button
              className="three"
              type="button"
              data-testid="btn-go-home"
            >
              Voltar ao início
            </button>
          </Link>
        </div>
        <img src="https://www.pngplay.com/wp-content/uploads/1/Simpsons-Family-Download-Free-PNG.png" className="img-game" alt="img" />
      </body>
    );
  }
}

export default connect()(Ranking);
