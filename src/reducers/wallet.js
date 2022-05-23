const INITIAL_STATE = {
  currencies: [],
  expenses: [],
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

  case 'REMOVE_ITEM':
    return {
      ...state,
      expenses: state.expenses.filter((storeItem) => storeItem.id !== Number(action.id)),
    };

  default:
    return state;
  }
};

export default walletReducer;
