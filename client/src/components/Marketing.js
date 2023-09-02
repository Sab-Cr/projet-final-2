import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const Marketing = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Title>{t("marketing")}</Title>
      {/* Add content here */}
      <Title>Marketing Vidéos</Title>
      <p> </p>
      <Title>Marketing de gestion</Title>
    </div>
  );
};

const Title = styled.h1`
  color: white;
  font-size: xxx-large;
`;

export default Marketing;