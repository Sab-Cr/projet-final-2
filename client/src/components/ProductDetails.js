// import basics
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";

// import utils to make api request
import fetchRequest from "../utils/fetch-request";
import { getProduct } from "../services/api";

// import components
import productDescription from "../assets/product-description";
import AddToCart from "./AddToCart";
import Selections from "./Selections";

const ProductDetails = () => {
  const { productId } = useParams();

  // states
  const [product, setProduct] = useState({});
  const {
    name,
    price,
    imageSrc,
    numInStock
  } = product;

  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  // get product details from server
  useEffect(() => {
    (async () => {
      const res = await fetchRequest(() => getProduct(productId));
      setProduct(res.data)
      setIsLoading(false);
    })();
  }, [setProduct, productId]);

  if (isLoading) return null;

  return (
    <Wrapper>
      <Img src={imageSrc} />
      <Details>
        <Name>{name}</Name>
        <Price>{price}</Price>
        <Selections
          quantity={quantity}
          setQuantity={setQuantity}
          numInStock={numInStock}
        />
        <AddToCart product={product} quantity={quantity} />
        <p>{productDescription}</p>
      </Details>
    </Wrapper>
  );
};

export default ProductDetails;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 100px 300px;
`;
const Img = styled.img`
  width: 35%;
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
const Price = styled.h2`
  padding-bottom: 20px;
`;