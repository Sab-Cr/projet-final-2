import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import fetchRequest from "../utils/fetch-request";
import { addToCart } from "../services/api";

const AddToCart = ({ product, quantity, disabled }) => {

  const navigate = useNavigate();

  const handleClick = async () => {
    const body = { ...product, quantity };
    await fetchRequest(() => addToCart(body));
    navigate("/cart");
  };

  return (
    <Button onClick={handleClick} disabled={disabled}>
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
  opacity: ${({disabled}) => disabled ? "0.5" : "1"};
  cursor: ${({disabled}) => disabled ? "default" : "pointer"};

  &:hover {
    opacity: 0.5;
  }
`;