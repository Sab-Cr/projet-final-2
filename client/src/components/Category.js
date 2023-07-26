import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import Button from "./Button";

const Category = ({ title, image, link }) => {
  return (
    <CategoryContainer className="category">
      <Image className="image" style={{ backgroundImage: `url(${image})` }} />
      <CategoryContent className="category-content">
        <Title>{title}</Title>
        <Button
          bgColor="black"
          size="small"
        >
          {link}
        </Button>
      </CategoryContent>
      <HoverStyles />
    </CategoryContainer>
  );
};

export default Category;

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
  opacity: 0.70;

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
  color: white;
  font-weight: bold;
  transition: transform 0.75s;
`;

const Title = styled.h2`
  font-size: x-large;
`;
