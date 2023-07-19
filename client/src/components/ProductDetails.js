import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import fetchRequest from "../utils/fetch-request";
import { getProduct } from "../services/api";

const ProductDetails = () => {
  const { productId } = useParams();
  
  // states
  const [product, setProduct] = useState({});
  const { 
    _id,
    name, 
    price,
    category,
    imageSrc 
  } = product;
  
  // get product details from server
  useEffect(() => {
    (async () => {
      const res = await fetchRequest(() => getProduct(productId));
      setProduct(res.data)
    })();
  }, [setProduct, productId]);

  return (
    <div>
      <Img src={imageSrc} />
      <p>{_id}</p>
      <p>{name}</p>
      <p>{price}</p>
      <p>{category}</p>
    </div>
  );
};

export default ProductDetails;

const Img = styled.img`
  width: 150px;
`;