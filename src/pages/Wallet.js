import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from '../components/Header';
import { fetchCoins, fetchExchange, removeItem, editExpense } from '../actions';
import Table from '../components/Table';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      id: 0,
      edit: false,
      editID: 0,
    };
  }

  handleState = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  addExpenseButton = () => {
    const { dispatch } = this.props;
    // const { value, description } = this.state;
    // if (value <= 0) return global.alert('Não é possivel adicionar despesas sem valor');
    // if (!description) return global.alert('Adicione descrição');
    const { id, value, description, currency, method, tag } = this.state;
    const expense = {
      id,
      value,
      description,
      currency,
      method,
      tag,
    };

    dispatch(fetchExchange(expense));

    this.setState((prevState) => ({
      value: '',
      description: '',
      currency: prevState.currency,
      method: prevState.method,
      tag: prevState.tag,
      id: prevState.id + 1,
    }));
  }

  removeItemFromStore = ({ target }) => {
    const { value } = target;
    const { dispatch } = this.props;
    dispatch(removeItem(value));
  }

  updtateExpense = (expense) => {
    const { id, description, tag, method, value, currency } = expense;

    this.setState({
      value,
      description,
      currency,
      method,
      tag,
      editID: id,
      edit: true,
    });
  }

  editExpenseButton = () => {
    const { dispatch } = this.props;
    const { value, description, currency, method, tag, editID } = this.state;
    const expense = {
      id: editID,
      value,
      description,
      currency,
      method,
      tag,
    };

    dispatch(editExpense(expense));

    this.setState((prevState) => ({
      value: '',
      description: '',
      currency: prevState.currency,
      method: prevState.method,
      tag: prevState.tag,
      edit: false,
    }));
  };

  componentDidMount = async () => {
    const { dispatch } = this.props;
    dispatch(fetchCoins());
  }

  render() {
    const { currency, expenses } = this.props;
    const { value, description, method, tag, edit } = this.state;
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
            <select
              name="currency"
              id="currency"
              data-testid="currency-input"
              onChange={ this.handleState }
            >
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
              value={ method }
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
              value={ tag }
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

          { edit
            ? (
              <button
                type="button"
                data-testid="edit-btn"
                onClick={ this.editExpenseButton }
              >
                Editar despesa
              </button>
            )
            : (
              <button
                type="button"
                onClick={ this.addExpenseButton }
              >
                Adicionar despesa
              </button>
            ) }

        </form>

        <Table
          expenses={ expenses }
          removeItem={ this.removeItemFromStore }
          update={ this.updtateExpense }
        />
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
