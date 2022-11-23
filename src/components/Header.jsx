import propTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

function Header({ email, expenses }) {
  const sumTotal = expenses.reduce((acc, cur) => {
    const name = cur.currency;
    return acc + Number(cur.value) * Number(cur.exchangeRates[name].ask);
  }, 0);

  return (
    <header>
      <p>
        TrybeWallet
      </p>
      <div>
        <p data-testid="email-field">
          { `Email: ${email}`}
        </p>
        <p data-testid="total-field">
          { sumTotal.toFixed(2) }
        </p>
        <p data-testid="header-currency-field">
          BRL
        </p>
      </div>
    </header>
  );
}

Header.propTypes = {
  email: propTypes.string,
  totalSum: propTypes.shape({
    value: propTypes.string,
    exchangeRates: propTypes.shape({
      ask: propTypes.string,
    }),
  }),
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
