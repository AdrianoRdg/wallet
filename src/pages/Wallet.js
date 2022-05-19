import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from '../components/Header';
import { fetchCoins } from '../actions';

class Wallet extends React.Component {
  componentDidMount = async () => {
    const { dispatch } = this.props;
    dispatch(fetchCoins());
  }

  render() {
    const { currencies } = this.props;
    return (
      <div>
        <Header />
        <form>
          <label htmlFor="value">
            Valor
            <input id="value" data-testid="value-input" type="text" />
          </label>

          <label htmlFor="description">
            Descrição
            <input id="description" data-testid="description-input" type="text" />
          </label>

          <label htmlFor="currencies">
            Moeda
            <select id="currencies">
              { currencies.map((coin) => (
                <option key={ coin } value={ coin }>{coin}</option>
              ))}
            </select>
          </label>

          <label htmlFor="payment-method">
            Forma de pagamento
            <select id="payment-method" data-testid="method-input">
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="expense-tag">
            Categoria da despesa
            <select id="expense-tag" data-testid="tag-input">
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>

        </form>
      </div>
    );
  }
}

Wallet.propTypes = {
  dispatch: propTypes.func,
  currencies: propTypes.arrayOf(propTypes.string),
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(Wallet);
