import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { getCart, deleteCartItem, updateCart } from "../services/api";
import fetchRequest from "../utils/fetch-request";
import Selections from "./Selections";
import Button from "./Button";

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
    <Wrapper>
      <CartContainer>
        <Title>Your Bag {items ? `(${items.length})` : `(0)`}</Title>
        {items &&
          items.map((item, index) => {
            const { _id, name, imageSrc, price, quantity, numInStock } = item;

            return (
              <Product key={`cart-item-${index}`}>
                <LeftProductContainer>
                  <Img src={imageSrc} />
                  <div>
                    <h3>{name}</h3>
                    <ProductId>#{_id}</ProductId>
                    <Selections
                      quantity={quantity}
                      handleChange={(event) => handleSelectionChange(event, index, _id)}
                      numInStock={numInStock}
                    />
                    <RemoveLink onClick={() => handleRemove(_id)}>Remove</RemoveLink>
                  </div>
                </LeftProductContainer>
                <RightProductContainer>
                  <h3>{price}</h3>
                </RightProductContainer>
              </Product>
            )
          })
        }
      </CartContainer>
      <OrderSummary>
        <Title>Order Summary</Title>
        <P>Subtotal <span>$ {items ? calculateSubtotal() : 0}</span></P>
        <P>Shipping <span>$ 10.00</span></P>
        <P>Total <span>$ {items ? Number(calculateSubtotal()) + 10 : 0}</span></P>
        <CheckoutButton bgColor="red">Checkout</CheckoutButton>
      </OrderSummary>
    </Wrapper>
  );
};

export default Cart;
const Wrapper = styled.div`
  padding: 50px;
  justify-content: space-between;
  display: flex;
`;
const CartContainer = styled.div`
  width: 60%;
`;
const Title = styled.h1`
  margin-bottom: 20px;
`;
const ProductId = styled.p`
  color: grey;
  font-size: 0.9em;
  padding-bottom: 20px;
`;
const Product = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
`;
const LeftProductContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const RightProductContainer = styled.div`
  width: 20%;
`;
const Img = styled.img`
  width: 150px;
  margin-right: 20px;
`;
const RemoveLink = styled(Link)`
  display: inline-block;
`;
const OrderSummary = styled.div`
  width: 500px;
  height: 300px;
  padding: 20px;
  background-color: black;
  border-radius: 10px;
  color: white;
  display: flex;
  flex-direction: column;
`;
const P = styled.p`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;
const CheckoutButton = styled(Button)`
  margin-top: 50px;
  color: white;

  &:hover {
    background-color: red;
    font-weight: 400;
    color: white;
    opacity: 0.8;
    transform: scale(1);
  }
`;