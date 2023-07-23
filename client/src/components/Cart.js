import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { getCart, deleteCartItem, updateCart } from "../services/api";
import fetchRequest from "../utils/fetch-request";
import Selections from "./Selections";

const Cart = () => {
  // states
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(true);

  // utils
  const calculateSubtotal = () => {
    return items.reduce((total, item) => {
      const { price, quantity } = item;
      const priceNumber = price.slice(1);
      const itemTotal = priceNumber * quantity;
      return total + itemTotal;
    }, 0).toFixed(2);
  };

  const handleSelectionChange = async (event, index, itemId) => {
    const { value } = event.target;

    const newState = [...items];
    const item = newState[index];
    item.quantity = value;
    setItems(newState);

    await fetchRequest(() => updateCart(itemId, value))
  };

  const handleRemove = async (itemId) => {
    await fetchRequest(() => deleteCartItem(itemId));
    setReload(prevState => !prevState);
  };

  // populate cart data
  useEffect(() => {
    (async () => {
      const res = await fetchRequest(getCart);
      setItems(res.data);
      setIsLoading(false);
    }
    )();
  }, [reload, setItems, setIsLoading]);

  // rendering
  if (isLoading) return null;

  return (
    <div>
      <CartContainer>
        <h1>Your Bag {items ? `(${items.length})` : (0)}</h1>
        { items && 
          items.map((item, index) => {
            const { _id, name, price, quantity, numInStock } = item;

            return (
              <div key={`cart-item-${index}`}>
                <h3>{name}</h3>
                <p>{_id}</p>
                <p>{price}</p>
                <Selections
                  quantity={quantity}
                  handleChange={(event) => handleSelectionChange(event, index, _id)}
                  numInStock={numInStock}
                />
                <button onClick={() => handleRemove(_id)}>Remove</button>
              </div>
            )
          })
        }
      </CartContainer>
      <OrderSummary>
        <h1>Order Summary</h1>
        <p>Subtotal <span>$ {items ? calculateSubtotal() : 0}</span></p>
        <p>Shipping <span>$ 10.00</span></p>
        <p>Total <span>$ {items ? Number(calculateSubtotal()) + 10 : 0}</span></p>
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