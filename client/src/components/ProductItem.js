// import basics
import { styled } from "styled-components";
import {NavLink} from "react-router-dom";

const ProductItem = ({item}) => {
    const {_id, category, imageSrc, name, numInStock, price} = item;
    
  return (
    <Container to= {`/products/${_id}`}>

      <Img src={imageSrc} />

      <Details>
        <Name> {name} </Name>
        <Category> {category} </Category>
        <Price> {price} </Price>
        <Stock> {numInStock>0 ? "IN STOCK" : "OUT OF STOCK"} </Stock>
      </Details>

    </Container>
  );
};

export default ProductItem;

const Container = styled(NavLink)`
  display: flex;
  justify-content: space-between;
  width:45%;
  padding : 2.2rem;
  color : black;
  text-decoration: none;
`;
const Img = styled.img`
  width:18rem;
  height:15rem;
  align-self: center;
`;
const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 40%;
`;
const Name = styled.h1`
  padding-bottom: 20px;
  font-weight: bold;
`;
const Category = styled.h1`
  padding-bottom: 20px;
  font-weight: bold;
`;
const Price =styled.h2`
  padding-bottom: 20px;
`;
const Stock =styled.h2`
  padding-bottom: 20px;
`;