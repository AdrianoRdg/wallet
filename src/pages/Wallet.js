import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from '../components/Header';
import { fetchCoins, fetchExchange } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: '',
      tag: '',
      id: 0,
    };
  }

  handleState = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  sendStateButton = () => {
    const { dispatch } = this.props;
    dispatch(fetchExchange(this.state));
    this.setState((prev) => ({
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: '',
      id: prev.id + 1,
    }));
  }

  componentDidMount = async () => {
    const { dispatch } = this.props;
    dispatch(fetchCoins());
  }

  render() {
    const { currency } = this.props;
    const {
      value,
      description,
    } = this.state;
    return (
      <div>
        <Header />
        <form>
          <label htmlFor="value">
            Valor
            <input
              name="value"
              data-testid="value-input"
              type="number"
              value={ value }
              onChange={ this.handleState }
            />
          </label>

          <label htmlFor="description">
            Descrição
            <input
              name="description"
              data-testid="description-input"
              type="text"
              value={ description }
              onChange={ this.handleState }
            />
          </label>

          <label htmlFor="currency">
            Moeda
            <select name="currency" id="currency" onChange={ this.handleState }>
              { currency.map((coin) => (
                <option key={ coin } value={ coin }>{coin}</option>
              ))}
            </select>
          </label>

          <label htmlFor="method">
            Forma de pagamento
            <select
              name="method"
              id="method"
              data-testid="method-input"
              onChange={ this.handleState }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="tag">
            Categoria da despesa
            <select
              name="tag"
              id="tag"
              data-testid="tag-input"
              onChange={ this.handleState }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>

          <button
            type="button"
            onClick={ this.sendStateButton }
          >
            Adicionar despesa
          </button>

        </form>
      </div>
    );
  }
}

Wallet.propTypes = {
  dispatch: propTypes.func,
  currency: propTypes.arrayOf(propTypes.string),
}.isRequired;

const mapStateToProps = (state) => ({
  currency: state.wallet.currencies,
});

export default connect(mapStateToProps)(Wallet);
