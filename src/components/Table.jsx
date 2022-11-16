import React from 'react';
import PropTypes from 'prop-types';

class Table extends React.Component {
  render() {
    const { expenses, removeItem, update } = this.props;
    return (
      <div className="main-table">
        <table className="table">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          { expenses
            .map(({ id, description, tag, method, value, currency, exchangeRates }) => (
              <tbody key={ id }>
                <tr>
                  <td>
                    {description}
                  </td>

                  <td>
                    {tag}
                  </td>

                  <td>
                    {method}
                  </td>

                  <td>
                    {Number(value).toFixed(2)}
                  </td>

                  <td>
                    {exchangeRates[currency].name}
                  </td>

                  <td>
                    {Number(exchangeRates[currency].ask).toFixed(2)}
                  </td>

                  <td>
                    {
                      (Number(value)
                      * Number(exchangeRates[currency].ask))
                        .toFixed(2)
                    }
                  </td>

                  <td>
                    Real
                  </td>

                  <td>
                    <button
                      type="button"
                      data-testid="edit-btn"
                      onClick={ () => (
                        update(
                          { id,
                            description,
                            tag,
                            method,
                            value,
                            currency },
                        )
                      ) }
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      value={ id }
                      onClick={ removeItem }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              </tbody>
            )) }
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
  removeItem: PropTypes.func,
}.isRequired;

export default Table;
