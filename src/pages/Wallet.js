import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from '../components/Header';
import { fetchCoins } from '../actions';

class Wallet extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     acronymCoins: [],
  //   };
  // }

  componentDidMount = async () => {
    const { dispatch } = this.props;
    dispatch(fetchCoins());
  }

  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}

Wallet.propTypes = {
  dispatch: propTypes.func.isRequired,
};

export default connect()(Wallet);
