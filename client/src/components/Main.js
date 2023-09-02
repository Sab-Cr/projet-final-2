// import { useState } from "react";
// import { BiWorld } from "react-icons/bi";
import styled from "styled-components";
import videoFr from "../assets/video 5.mp4";
import videoEn from "../assets/video 5 EN.mp4";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Main() {
  const { t, i18n } = useTranslation();
  const videos = {
    fr: videoFr,
    en: videoEn,
    es: videoFr,
  };
  const [currentVideo, setCurrentVideo] = useState(videos[i18n.language]);
  const [videoKey, setVideoKey] = useState(0);

  useEffect(() => {
    const handleLanguageChange = () => {
      console.log(i18n.language)
      setCurrentVideo(videos[i18n.language]);
      setVideoKey((prevKey) => prevKey + 1);
    };

    i18n.on("languageChanged", handleLanguageChange);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n.language, videos]);

  return (
    <Container>
      <Video autoPlay muted loop key={videoKey}>
        <source src={currentVideo} type="video/mp4" />
      </Video>
      <Link to="contact">
        <Button>{t("contactUs")}</Button>
      </Link>
    </Container>
  );
}

export default Main;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3vh;
  height: 85vh;
`;

const Video = styled.video`
  height: 65vh;
`;

const Button = styled.button`
  font-weight: bold;
  font-size: x-large;
  padding: 0.75em 1.5em;
  border-radius: 3em;
  background-color: rgb(255, 175, 0);
  border: 1px solid rgb(255, 175, 0);
  cursor: pointer;
  transition-duration: 0.5s;

  &:hover {
    transform: scale(1.1);
    background-color: black;
    color: rgb(255, 175, 0);
  }
`;
