import React, { Component } from 'react';

class Checkout extends Component {
  constructor() {
    super();

    this.state = {
      localData: [],
      name: '',
      email: '',
      cpf: '',
      tel: '',
      cep: '',
      adress: '',
      paymentMethod: '',
      isValid: false,
    };
  }

  componentDidMount() {
    const localData = JSON.parse(localStorage.getItem('products'));
    this.setState({ localData });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { name, email, cpf, tel, cep, adress, paymentMethod } = this.state;
    const checkValues = [name, email, cpf, tel, cep, adress, paymentMethod];
    if (checkValues.every((check) => check !== '')) {
      this.setState({ isValid: false });
    } else {
      this.setState({ isValid: true });
      localStorage.clear('products');
    }
  };

  render() {
    const { localData, name, email, cpf, tel, cep, adress, isValid } = this.state;
    if (!localData) {
      return <h3 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h3>;
    }
    return (
      <div>
        {localData.map((item, index) => (
          <div key={ index }>
            <img src={ item.thumbnail } alt={ item.title } />
            <p>{ item.title }</p>
            <span>{ item.quantity }</span>
          </div>
        ))}

        <form onChange={ this.handleChange }>
          <input
            type="text"
            placeholder="Nome Completo"
            name="name"
            value={ name }
            data-testid="checkout-fullname"
          />
          <input
            type="email"
            placeholder="Seu Email"
            name="email"
            value={ email }
            data-testid="checkout-email"
          />
          <input
            type="text"
            placeholder="Seu CPF"
            name="cpf"
            value={ cpf }
            data-testid="checkout-cpf"
          />
          <input
            type="tel"
            placeholder="Seu Telefone"
            name="tel"
            value={ tel }
            data-testid="checkout-phone"
          />
          <input
            type="text"
            placeholder="Seu CEP"
            name="cep"
            value={ cep }
            data-testid="checkout-cep"
          />
          <input
            type="text"
            placeholder="Seu Endereço"
            name="adress"
            value={ adress }
            data-testid="checkout-address"
          />
          <div>
            <label htmlFor="boleto">
              <input
                name="paymentMethod"
                value="boleto"
                id="boleto"
                data-testid="ticket-payment"
                type="radio"
              />
              Boleto
            </label>
            <br />
            <label htmlFor="visa">
              <input
                name="paymentMethod"
                value="visa"
                id="visa"
                data-testid="visa-payment"
                type="radio"
              />
              Visa
            </label>
            <br />
            <label htmlFor="mastercard">
              <input
                name="paymentMethod"
                value="mastercard"
                id="mastercard"
                data-testid="master-payment"
                type="radio"
              />
              MasterCard
            </label>
            <br />
            <label htmlFor="elo">
              <input
                name="paymentMethod"
                value="elo"
                id="elo"
                data-testid="elo-payment"
                type="radio"
              />
              Elo
            </label>
            <br />
            <div>
              {isValid && <p data-testid="error-msg">Campos inválidos</p>}
            </div>
            <button
              type="submit"
              data-testid="checkout-btn"
              onClick={ this.handleSubmit }
            >
              Finalizar Compra
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Checkout;
