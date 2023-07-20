import { useEffect, useState } from "react";
import { styled } from "styled-components";

const Cart = () => {
  const tempInitialValue = [{
    _id: 6543,
    name: "Barska GB12166 Fitness Watch with Heart Rate Monitor",
    price: "$49.99",
    cartQty: 2,
    numInStock: 10
  }];

  const [items, setItems] = useState(tempInitialValue);

  // utils
  const qtySelection = (numInStock) => {
    // the quantity selection cannot exceed the inventory in stock
    const quantities = Array.from(Array(numInStock + 1).keys());
    return quantities.slice(1);
  };

  const calculateSubtotal = () => {
    return items.reduce((total, item) => {
      const { price, cartQty } = item;
      const priceNumber = price.slice(1);
      const itemTotal = priceNumber * cartQty;
      return total + itemTotal;
    }, 0).toFixed(2);
  };

  const handleQtyChange = (event, index) => {
    const { value } = event.target;

    const newState = [...items];
    const item = newState[index];
    item.cartQty = value;
    setItems(newState);

    // send changes to server
  };

  // populate cart data
  // useEffect(() => {
  //   // fetch cart information (product number and quantity)
  //   // fetch individual product information
  //   // setItems
  // }, [setItems]);

  return (
    <div>
      <CartContainer>
        <h1>Your Bag (1)</h1>
        {
          items.map((item, index) => {
            const { _id, name, price, cartQty, numInStock } = item;
            const qtyOptions = qtySelection(numInStock);

            return (
              <>
                <h3>{name}</h3>
                <p>{_id}</p>
                <p>{price}</p>
                <select value={cartQty} onChange={(event) => handleQtyChange(event, index)}>
                  {qtyOptions.map(qty => <option value={qty}>{qty}</option>)}
                </select>
              </>
            )
          })
        }
      </CartContainer>
      <OrderSummary>
        <h1>Order Summary</h1>
        <p>Subtotal <span>$ {calculateSubtotal()}</span></p>
        <p>Shipping <span>$ 10.00</span></p>
        <p>Total <span>$ {Number(calculateSubtotal()) + 10}</span></p>
      </OrderSummary>
    </div>
  );
};

export default Cart;

const CartContainer = styled.div`
  padding: 20px;
`;
const OrderSummary = styled.div`

`;