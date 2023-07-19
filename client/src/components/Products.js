// import basics
import { useEffect, useState } from "react";
import { styled } from "styled-components";

// import utils to make api request
import fetchRequest from "../utils/fetch-request";
import { getProducts } from "../services/api";
import ProductItem from "./ProductItem";
import watchCover from "../assets/images/watch-cover.avif";

const Products = () => {
// states
  const [products, setProducts] = useState(null);

// get products from server
  useEffect(() => {
    (async () => {
      const res = await fetchRequest(() => getProducts());
      setProducts(res.data)
    })();
    }, []);

  return (
    <>
      <CoverContainer>
        <Cover>Our products</Cover>
      </CoverContainer>

      {!products
        ? <Loading> Loading Page </Loading>

        : <Wrapper>
          {products.map((item)=>{
            return(
              <ProductItem key={item["_id"]} item={item}/>
            )
            })}
          </Wrapper>
        }
    </>
  );
};

export default Products;

const Wrapper = styled.div`
  display: flex;
  flex-wrap : wrap;
`;
const CoverContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${watchCover});
  background-size: 100% 150%;
  height : 26rem;
`
const Cover = styled.div`
  font-size : 9rem;
  color:white;

`;
const Loading = styled.div`
  text-align : center;
  font-size : 5rem;
`