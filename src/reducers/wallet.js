const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'ADD_COINS':
    return {
      currencies: action.payload,
    };
  default:
    return state;
  }
};

export default walletReducer;
