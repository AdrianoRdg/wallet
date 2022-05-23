import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from '../components/Header';
import { fetchCoins, fetchExchange, removeItem } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
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
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: '',
      id: prev.id + 1,
    }));
  }

  removeItemFromStore = ({ target }) => {
    const { value } = target;
    const { dispatch } = this.props;
    dispatch(removeItem(value));
  }

  componentDidMount = async () => {
    const { dispatch } = this.props;
    dispatch(fetchCoins());
  }

  render() {
    const { currency, expenses } = this.props;
    const { value, description } = this.state;
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

        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          { expenses.map((tableItem) => (
            <tbody key={ tableItem.id }>
              <tr>
                <td>
                  {tableItem.description}
                </td>

                <td>
                  {tableItem.tag}
                </td>

                <td>
                  {tableItem.method}
                </td>

                <td>
                  {Number(tableItem.value).toFixed(2)}
                </td>

                <td>
                  {tableItem.exchangeRates[tableItem.currency].name}
                </td>

                <td>
                  {Number(tableItem.exchangeRates[tableItem.currency].ask).toFixed(2)}
                </td>

                <td>
                  {
                    (Number(tableItem.value)
                    * Number(tableItem.exchangeRates[tableItem.currency].ask))
                      .toFixed(2)
                  }
                </td>

                <td>
                  Real
                </td>

                <td>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    value={ tableItem.id }
                    onClick={ this.removeItemFromStore }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            </tbody>
          )) }
        </table>
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
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Wallet);
