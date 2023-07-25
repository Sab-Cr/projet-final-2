import React from "react";
import styled, { createGlobalStyle } from "styled-components";

const HoverStyles = createGlobalStyle`
  .category:hover .image {
    opacity: 1;
  }

  .category:hover .category-content {
    transform: translateY(-30px) translateX(-50%);
  }
`;

const CategoryContainer = styled.div`
  position: relative;
  width: 20%;
  height: 150px;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  transition: opacity 0.75s, transform 0.75s;

  &:hover {
    opacity: 1;
  }
`;

const Image = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: opacity 0.75s;
  opacity: 0.5
`;

const CategoryContent = styled.div`
  position: absolute;
  bottom: 20px;
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;

  transform: translateX(-50%);
  left: 50%;
  color: black;
  font-weight: bold;
  transition: transform 0.75s;
`;

const Title = styled.h2`
  font-size: x-large;
`;

const ShopButton = styled.button`
  background: #000;
  color: #fff;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  border-radius: 1em;
  transition-duration: 0.75s;


  &:hover {
    color: black;
    background: white;
    transform: scale(1.1);
    font-weight: bold;
  }
`;

const Category = ({ title, image, link }) => {
  return (
    <CategoryContainer className="category">
      <Image className="image" style={{ backgroundImage: `url(${image})` }} />
      <CategoryContent className="category-content">
        <Title>{title}</Title>
        <ShopButton>{link}</ShopButton>
      </CategoryContent>
      <HoverStyles />
    </CategoryContainer>
  );
};

export default Category;
