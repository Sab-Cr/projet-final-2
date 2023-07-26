import { styled } from "styled-components";

const Button = ({ children, bgColor, size }) => {
  return (
    <CustomButton $bgColor={bgColor} $size={size}>
      {children}
    </CustomButton>
  )
}

export default Button;

const CustomButton = styled.button`
  background: ${({$bgColor}) => $bgColor || "white"};
  color: ${({$bgColor}) => $bgColor === "black" ? "white" : "black"};
  padding: ${({$size}) => $size === "small" ? "10px 20px" : "15px 30px"};
  font-size: ${({$size}) => $size === "small" ? "16px" : "18px"};
  border: none;
  cursor: pointer;
  border-radius: 1em;
  transition-duration: 0.75s;


  &:hover {
    color: ${({$bgColor}) => $bgColor === "black" ? "black" : "white"};
    background: ${({$bgColor}) => $bgColor === "black" ? "white" : "black"};
    transform: scale(1.1);
    font-weight: bold;
  }
`;