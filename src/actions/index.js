// Coloque aqui suas actions
export const changeEmail = (state) => ({ type: 'CHANGE_EMAIL', payload: state });
export const addCoins = (state) => ({ type: 'ADD_COINS', payload: state });
export const addExpenses = (value) => ({ type: 'ADD_EXPENSE', payload: value });
export const removeItem = (id) => ({ type: 'REMOVE_ITEM', id });

export function fetchCoins() {
  return async (dispatch) => {
    const resultAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
    const responseAPI = await resultAPI.json();
    const getCoinsName = Object.keys(responseAPI).filter((coin) => coin !== 'USDT');
    dispatch(addCoins(getCoinsName));
  };
}

export function fetchExchange(expense) {
  return async (dispatch) => {
    const resultAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
    const responseAPI = await resultAPI.json();
    delete responseAPI.USDT;
    const value = { ...expense, exchangeRates: responseAPI };
    dispatch(addExpenses(value));
  };
}
