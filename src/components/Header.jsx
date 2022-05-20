import propTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { user: { email }, total } = this.props;
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
            { total.reduce((a, b) => Number(a) + Number(b), 0).toFixed(2) }
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
  }).isRequired,
  total: propTypes.arrayOf(propTypes.number).isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  total: state.wallet.total,
});

export default connect(mapStateToProps)(Header);
