import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import fetchRequest from "../utils/fetch-request";
import { addToCart } from "../services/api";
import Button from "./Button";

const AddToCart = ({ product, quantity, disabled }) => {

  const navigate = useNavigate();

  const handleClick = async () => {
    const body = { ...product, quantity };
    await fetchRequest(() => addToCart(body));
    navigate("/cart");
  };

  return (
    <AddButton
      handleClick={handleClick}
      disabled={disabled}
      bgColor="black"
    >
      Add to bag
    </AddButton>
  );
};

export default AddToCart;

const AddButton = styled(Button)`
  margin-bottom: 20px;

  &:hover {
    background-color: black;
    font-weight: 400;
    color: white;
    opacity: 0.6;
    transform: scale(1);
  }
`;