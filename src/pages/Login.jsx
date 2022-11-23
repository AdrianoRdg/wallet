import propTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { changeEmail } from '../actions';

function Login({ dispatch }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const ableButton = () => {
    const charactersQuanty = 6;
    const stringEmail = /\S+@\S+\.\S+/;
    const validEmail = stringEmail.test(email);

    return password.length >= charactersQuanty && validEmail;
  };

  const loginButton = () => {
    dispatch(changeEmail(email));
    history.push('/carteira');
  };

  return (
    <div className="login-page">
      <h1>Wallet</h1>
      <div className="login-form">
        <label htmlFor="email">
          Email
          <input
            name="emailField"
            data-testid="email-input"
            type="email"
            value={ email }
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </label>
        <label htmlFor="email">
          Senha
          <input
            name="passwordField"
            data-testid="password-input"
            type="password"
            value={ password }
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </label>
        <button
          type="button"
          disabled={ !ableButton() }
          onClick={ loginButton }
        >
          Entrar
        </button>
      </div>
    </div>
  );
}

Login.propTypes = {
  dispatch: propTypes.func.isRequired,
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
