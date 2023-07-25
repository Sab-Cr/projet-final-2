import React from "react";
import styled from "styled-components";
import homepagePicture from "../assets/images/homepage-picture.png";

const MainTop = () => {
  return (
    <MainTopContainer
      style={{ backgroundImage: `url(${homepagePicture})` }}
    >
      <ContentWrapper>
        <Title>Title</Title>
        <Subtitle>Subtitle</Subtitle>
        <ShopButton>Shop</ShopButton>
      </ContentWrapper>
    </MainTopContainer>
  );
};

export default MainTop;

const MainTopContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  background-size: cover;
  background-position: center;
  text-align: center;
  color: #fff;
`;

const ContentWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 36px;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-size: 24px;
  margin-bottom: 20px;
`;

const ShopButton = styled.button`
  background: #fff;
  color: #000;
  padding: 15px 30px;
  font-size: 18px;
  border: none;
  cursor: pointer;
  border-radius: 1em;
  transition-duration: 0.75s;

  &:hover {
    color: white;
    background: black;
    transform: scale(0.9)
  }
`;
