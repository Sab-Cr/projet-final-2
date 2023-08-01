import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import homepagePicture from "../assets/images/homepage-pic.jpg";
import Button from "./Button";

const MainTop = () => {

  const navigate = useNavigate();

  const handleClick = ()=>{
    navigate("/products");
  }
  return (
    <MainTopContainer
      style={{ backgroundImage: `url(${homepagePicture})` }}
    >
      <ContentWrapper>
        <Title>Best Watches In The World</Title>
        <Subtitle>You know it, we know it, everyone knows it</Subtitle>
        <Button handleClick = {handleClick}>Shop</Button>
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
