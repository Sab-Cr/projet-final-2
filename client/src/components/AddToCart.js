import { styled } from "styled-components";

const AddToCart = ({ productId }) => {
  const handleClick = () => {
    
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
  }
`;