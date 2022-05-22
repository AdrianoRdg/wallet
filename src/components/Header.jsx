import propTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { user: { email }, totalSum } = this.props;
    const total = [];
    totalSum.forEach((e) => {
      const name = e.currency;
      total.push(Number(e.value) * Number(e.exchangeRates[name].ask));
      return total;
    });
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
            { total.reduce((acc, cur) => acc + cur, 0).toFixed(2) }
          </p>
          <p data-testid="header-currency-field">
            BRL
          </p>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  user: propTypes.shape({
    email: propTypes.string,
  }),
  totalSum: propTypes.shape({
    value: propTypes.string,
    exchangeRates: propTypes.shape({
      ask: propTypes.string,
    }),
  }),
}.isRequired;

const mapStateToProps = (state) => ({
  user: state.user,
  totalSum: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
