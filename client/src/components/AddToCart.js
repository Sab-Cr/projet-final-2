import { styled } from "styled-components";
import fetchRequest from "../utils/fetch-request";
import { addToCart } from "../services/api";

const AddToCart = ({ product, quantity }) => {

  const handleClick = async () => {
    const body = { ...product, quantity };
    await fetchRequest(() => addToCart(body))
  };

  return (
    <Button onClick={handleClick}>
      Add to bag
    </Button>
  );
};

export default AddToCart;

const Button = styled.button`
  padding: 15px 20px;
  margin-bottom: 20px;
  color: white;
  background-color: black;
  border: none;
  border-radius: 25px;
  font-size: 1.15em;

  &:hover {
    opacity: 0.5;
    cursor: pointer;
  }
`;