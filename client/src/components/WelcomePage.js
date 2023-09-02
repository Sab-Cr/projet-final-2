import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom"; // Make sure to import Link from your router library
import { useTranslation } from "react-i18next";

const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-top: 5em;
`;

const WelcomeMessage = styled.h1`
  font-size: 2rem;
  color: white;
`;

const LinksContainer = styled.div`
  display: flex;
  margin-top: 1em;
`;

const StyledLink = styled(Link)`
  margin: 0 1em;
  padding: 0.5em 1em;
  background-color: #333;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #555;
  }
`;

const WelcomePage = () => {
  const [user, setUser] = useState(null);

  const { t } = useTranslation();

  useEffect(() => {
    const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
    let userId = null;
    cookies.forEach((cookie) => {
      const [name, value] = cookie.split("=");
      if (name === "user") {
        userId = value;
      }
    });

    if (userId) {
      fetch(`/api/get-user/${userId.slice(1, -1)}`) // Replace with your API route
        .then((response) => response.json())
        .then((data) => {
          console.log(data.user);
          setUser(data.user);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  return (
    <WelcomeContainer>
      {user && (
        <>
          <WelcomeMessage>
            {t("welcome")} {user.fullName}! {t("welcomeMessage")}
          </WelcomeMessage>
          <LinksContainer>
            <StyledLink to="/coaching-management">{t("coaching")}</StyledLink>
            <StyledLink to="/training-management">{t("training")}</StyledLink>
            <StyledLink to="/webinars">{t("webinars")}</StyledLink>
          </LinksContainer>
          <LinksContainer>
            <StyledLink to="/profile">{t("profile")}</StyledLink>
          </LinksContainer>
        </>
      )}
    </WelcomeContainer>
  );
};

export default WelcomePage;