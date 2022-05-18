import propTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { changeEmail } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      isDisable: true,
      emailField: '',
      passwordField: '',
    };
  }

  changeFilds = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.ableButton);
  }

  ableButton = () => {
    const { emailField, passwordField } = this.state;
    const charactersQuanty = 6;

    // teste tirado do site https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
    const stringEmail = /\S+@\S+\.\S+/;
    const validEmail = stringEmail.test(emailField);

    if (passwordField.length >= charactersQuanty && validEmail === true) {
      this.setState({
        isDisable: false,
      });
    } else {
      this.setState({
        isDisable: true,
      });
    }
  }

  button = () => {
    const { dispatch, history } = this.props;
    const { emailField } = this.state;
    dispatch(changeEmail(emailField));
    this.setState({
      isDisable: true,
      emailField: '',
      passwordField: '',
    });
    history.push('/carteira');
  }

  render() {
    const { isDisable, emailField, passwordField } = this.state;
    return (
      <div>
        <label htmlFor="email">
          Email
          <input
            name="emailField"
            data-testid="email-input"
            type="email"
            value={ emailField }
            onChange={ this.changeFilds }
          />
        </label>
        <label htmlFor="email">
          Senha
          <input
            name="passwordField"
            data-testid="password-input"
            type="password"
            value={ passwordField }
            onChange={ this.changeFilds }
          />
        </label>
        <button
          type="button"
          disabled={ isDisable }
          onClick={ this.button }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: propTypes.func.isRequired,
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  name: state,
});
// export default Login;
export default connect(mapStateToProps)(Login);
