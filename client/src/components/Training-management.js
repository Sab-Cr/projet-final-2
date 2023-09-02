import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import videoFr from "../assets/video 5.mp4";

const TrainingManagement = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Title>{t("training")}</Title>
      {/* Add your content here */}
      <Title>Formations Management Vidéos</Title>
      <p> </p>
      <Title>Formations Mangement de gestion</Title>
      <Video autoPlay muted loop>
        <source src={videoFr} type="video/mp4" />
      </Video>
    </div>
  );
};

const Title = styled.h1`
  color: white;
  font-size: xxx-large;
`;

const Video = styled.video`
  height: 65vh;
`;

export default TrainingManagement;