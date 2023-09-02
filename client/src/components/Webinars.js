import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const Webinars = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Title>{t("webinars")}</Title>
      {/* Add your content here */}
    </div>
  );
};

const Title = styled.h1`
  color: white;
  font-size: xxx-large;
`;

export default Webinars;