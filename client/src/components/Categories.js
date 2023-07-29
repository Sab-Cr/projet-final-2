import React from "react";
import Category from "./Category";
import allProduct from "../assets/images/categorieallproduct.png";
import lifestyle from "../assets/images/categorielifestyle.jpg";
import fitness from "../assets/images/fitness.jpg";
import entertainment from "../assets/categorieentertainement.webp";
import { styled } from "styled-components";

const Categories = () => {
  return (
    <Content>
      <Category title="Fitness" image={fitness} />
      <Category title="Lifestyle" image={lifestyle} />
      <Category title="Entertainment" image={entertainment} />
      <Category title="Others" image={allProduct} />
    </Content>
  );
};

export default Categories;

const Content = styled.div`
margin-top: 3em;
display: flex;
flex-grow: 1;
width: 100%;
justify-content: space-around;
`;