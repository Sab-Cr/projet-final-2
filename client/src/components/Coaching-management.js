import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const CoachingManagement = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Title>{t("coaching")}</Title>
      {/* Add your content here */}
      <Title>Coaching Vidéos</Title>
      <p> </p>
      <Title>Coaching de gestion</Title>
    </div>
  );
};

const Title = styled.h1`
  color: white;
  font-size: xxx-large;
`;

export default CoachingManagement;
