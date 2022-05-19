import propTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { user: { email } } = this.props;
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
            0
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
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Header);
