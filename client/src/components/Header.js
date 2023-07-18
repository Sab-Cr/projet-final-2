import { styled } from "styled-components";

const Header = () => {
  return (
    <Toolbar>
      <h2>This our store</h2>
    </Toolbar>
  );
};

export default Header;

const Toolbar = styled.div`
  height: 53px;
`;