import { styled } from "styled-components";

const Header = () => {
  return (
    <Toolbar>
      <h1>Rolex Shop</h1>
    </Toolbar>
  );
};

export default Header;

const Toolbar = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  background:gainsboro;
  height: 4rem;
`;