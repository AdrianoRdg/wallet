const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'ADD_COINS':
    return {
      ...state,
      currencies: action.payload,
    };
  case 'ADD_EXPENSE':
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };

  case 'ADD_TOTAL':
    return {
      ...state,
      total: [...state.total, action.value],
    };

  default:
    return state;
  }
};

// id: state.expenses.length

export default walletReducer;
