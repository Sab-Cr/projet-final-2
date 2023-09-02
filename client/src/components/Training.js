import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const Training = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Title>{t("training")}</Title>
      {/* Add your content here */}
      <Title>Formations Vidéos</Title>
      <p> </p>
      <Title>Formations de gestion</Title>
    </div>
  );
};

const Title = styled.h1`
  color: white;
  font-size: xxx-large;
`;

export default Training;