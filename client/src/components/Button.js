import { styled } from "styled-components";

const Button = ({ 
  children,
  className, 
  bgColor, 
  size,
  handleClick,
  disabled
}) => {
 
  return (
    <CustomButton
      $bgColor={bgColor}
      $size={size}
      onClick={handleClick}
      disabled={disabled}
      className={className}
    >
      {children}
    </CustomButton>
  )
}

export default Button;

const CustomButton = styled.button`
  background: ${({ $bgColor }) => $bgColor || "white"};
  color: ${({ $bgColor }) => $bgColor === "black" ? "white" : "black"};
  padding: ${({ $size }) => $size === "small" ? "10px 20px" : "15px 30px"};
  font-size: ${({ $size }) => $size === "small" ? "16px" : "18px"};
  cursor: ${({disabled}) => disabled ? "default" : "pointer"};
  opacity: ${({disabled}) => disabled ? "0.5" : "1"};
  border: none;
  border-radius: 1em;
  transition-duration: 0.75s;


  &:hover {
    color: ${({ $bgColor }) => $bgColor === "black" ? "black" : "white"};
    background: ${({ $bgColor }) => $bgColor === "black" ? "white" : "black"};
    transform: scale(1.1);
    font-weight: bold;
  }
`;