import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { FiSearch, FiShoppingBag } from "react-icons/fi";
import { GoPerson } from "react-icons/go";

const Header = () => {
  return (
    <Toolbar>
      <Link to="/">
        <Title>Rolex Shop</Title>
      </Link>
      <IconContainer>
        <FiSearch />
        <GoPerson />
        <Link to="/cart">
          <FiShoppingBag />
        </Link>
      </IconContainer>
    </Toolbar>
  );
};

export default Header;

const Toolbar = styled.div`
  display:flex;
  position: relative;
  justify-content: space-between;
  padding: 0px 50px;
  align-items: center;
  font-size: 1rem;
  height: 4rem;
`;
const Title = styled.h1`
  position: relative;
`;
const IconContainer = styled.div`
  width: 150px;
  display: flex;
  justify-content: space-around;
  font-size: 1.3em;
`;