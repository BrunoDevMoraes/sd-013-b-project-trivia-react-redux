import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getToken, saveName, saveEmail, clearScore } from '../actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      validName: false,
      validEmail: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick(name, email) {
    const { getTokenProps, getPlayerName, getPlayerEmail, clearScoreProp } = this.props;
    getTokenProps();
    getPlayerName(name);
    getPlayerEmail(email);
    clearScoreProp();
  }

  handleChange({ target }) {
    const { id, value } = target;
    const minNameLength = 3;
    if (id === 'name') {
      if (value.length >= minNameLength) {
        this.setState({
          validName: true,
          [id]: value,
        });
      } else {
        this.setState({
          validName: false,
          [id]: '',
        });
      }
    } else {
      const emailRegex = /[a-z]+@[a-z]+.com/g;
      if (emailRegex.test(value)) {
        this.setState({
          validEmail: true,
          [id]: value,
        });
      } else {
        this.setState({
          validEmail: false,
          [id]: '',
        });
      }
    }
  }

  render() {
    const { validEmail, validName, name, email } = this.state;
    return (
      <body className="body-login">
        <form className="login-form">
          <label htmlFor="name" className="input-container">
            <input
              placeholder="Nome"
              type="text"
              id="name"
              data-testid="input-player-name"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="email" className="input-container">
            <input
              placeholder="E-mail"
              type="text"
              id="email"
              data-testid="input-gravatar-email"
              onChange={ this.handleChange }
            />
          </label>
          <Link to="/game">
            <button
              className="one"
              disabled={ !validName || !validEmail }
              type="button"
              data-testid="btn-play"
              onClick={ () => this.handleClick(name, email) }
            >
              Jogar
            </button>
          </Link>
          <Link to="/settings">
            <button
              className="two"
              type="button"
              data-testid="btn-settings"
            >
              Configurações
            </button>
          </Link>
        </form>
      </body>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getTokenProps: () => dispatch(getToken()),
  getPlayerName: (name) => dispatch(saveName(name)),
  getPlayerEmail: (email) => dispatch(saveEmail(email)),
  clearScoreProp: () => dispatch(clearScore()),
});

Login.propTypes = {
  getPlayerName: PropTypes.func.isRequired,
  getTokenProps: PropTypes.func.isRequired,
  getPlayerEmail: PropTypes.func.isRequired,
  clearScoreProp: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
