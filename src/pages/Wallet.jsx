import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from '../components/Header';
import { fetchCoins, fetchExchange, removeItem, editExpense } from '../actions';
import Table from '../components/Table';

function Wallet({ dispatch, currencies, expenses }) {
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [method, setMethod] = useState('Dinheiro');
  const [id, setId] = useState(0);
  const [tag, setTag] = useState('Alimentação');
  const [edit, setEdit] = useState(false);
  const [editID, setEditID] = useState(0);

  const getExpense = (ID = id) => ({
    value,
    description,
    currency,
    method,
    tag,
    id: ID,
  });

  const disableButton = () => value > 0 && description.length > 0;

  const addExpenseButton = () => {
    const expense = getExpense();

    dispatch(fetchExchange(expense));

    setValue('');
    setDescription('');
    setId(id + 1);
  };

  const removeItemFromStore = ({ target }) => {
    dispatch(removeItem(target.value));
  };

  const updtateExpense = (expense) => {
    setValue(expense.value);
    setDescription(expense.description);
    setCurrency(expense.currency);
    setMethod(expense.method);
    setTag(expense.tag);
    setEditID(expense.id);
    setEdit(true);
  };

  const editExpenseButton = () => {
    const expense = getExpense(editID);

    dispatch(editExpense(expense));
    setValue('');
    setDescription('');
    setEdit(false);
  };

  useEffect(() => {
    dispatch(fetchCoins());
  }, [dispatch]);

  return (
    <div>
      <Header />
      <form className="expense-form">
        <label htmlFor="value">
          Valor
          <input
            name="value"
            data-testid="value-input"
            type="number"
            value={ value }
            onChange={ ({ target }) => setValue(target.value) }
          />
        </label>

        <label htmlFor="description">
          Descrição
          <input
            name="description"
            data-testid="description-input"
            type="text"
            value={ description }
            onChange={ ({ target }) => setDescription(target.value) }
          />
        </label>

        <label htmlFor="currency">
          Moeda
          <select
            name="currency"
            id="currency"
            data-testid="currency-input"
            onChange={ ({ target }) => setCurrency(target.value) }
          >
            { currencies.map((coin) => (
              <option key={ coin } value={ coin }>{coin}</option>
            ))}
          </select>
        </label>

        <label htmlFor="method">
          Forma de pagamento
          <select
            name="Method"
            id="method"
            value={ method }
            data-testid="method-input"
            onChange={ ({ target }) => setMethod(target.value) }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag">
          Categoria da despesa
          <select
            name="Tag"
            id="tag"
            value={ tag }
            data-testid="tag-input"
            onChange={ ({ target }) => setTag(target.value) }
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
              onClick={ editExpenseButton }
            >
              Editar despesa
            </button>
          )
          : (
            <button
              type="button"
              onClick={ addExpenseButton }
              disabled={ !disableButton() }
            >
              Adicionar despesa
            </button>
          ) }

      </form>

      <Table
        expenses={ expenses }
        removeItem={ removeItemFromStore }
        update={ updtateExpense }
      />
    </div>
  );
}

Wallet.propTypes = {
  dispatch: propTypes.func,
  currency: propTypes.arrayOf(propTypes.string),
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Wallet);
