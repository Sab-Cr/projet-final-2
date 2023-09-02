import { useState, useEffect } from "react";
import { BiWorld } from "react-icons/bi";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
// import { useAuth0 } from "@auth0/auth0-react";
import Cookies from "js-cookie";


const lngs = [
  { code: "en", native: "English" },
  { code: "fr", native: "Français" },
  { code: "es", native: "Español" },
];
// TODO, import d'un autre endroit

function Header() {
  const [isHoveredServices, setIsHoveredServices] = useState(false);
  const [isHoveredHome, setIsHoveredHome] = useState(false);
  const [isHoveredRessources, setIsHoveredRessources] = useState(false);
  const [isHoveredManagement, setIsHoveredManagement] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const cookies = document.cookie.split(";").map(cookie => cookie.trim());
    let userId = null;
    cookies.forEach(cookie => {
      const [name, value] = cookie.split("=");
      if (name === "user") {
        userId = value;
      }
    });
    console.log(userId);

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

  const handleMouseEnter = () => {
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
  };

  const handleHoverServices = () => {
    setIsHoveredServices(true);
  };
  const handleLeaveServices = () => {
    setIsHoveredServices(false);
  };
  const handleHoverHome = () => {
    setIsHoveredHome(true);
  };
  const handleLeaveHome = () => {
    setIsHoveredHome(false);
  };
  const handleHoverRessources = () => {
    setIsHoveredRessources(true);
  };
  const handleLeaveRessources = () => {
    setIsHoveredRessources(false);
  };
  const handleHoverManagement = () => {
    setIsHoveredManagement(true);
  };
  const handleLeaveManagement = () => {
    setIsHoveredManagement(false);
  };

  const handleTrans = (code) => {
    i18n.changeLanguage(code);
  };

  const { t, i18n } = useTranslation();

  return (
    <Container>
      <StyledLogo to={user ? "/welcome" : "/"}>
        <Logo src={require("../assets/logo.png")} alt="LOGO" />
      </StyledLogo>
      <Right>
        <Ul onMouseLeave={handleMouseLeave}>
          <Li onMouseEnter={handleHoverHome} onMouseLeave={handleLeaveHome}>
            <StyledLink to="/">{t("home")}</StyledLink>
            {isHoveredHome && (
              <SubLinks>
                <SubLink onClick={handleLeaveHome} to="/welcome">
                  {t("Welcome")}
                </SubLink>
                <SubLink onClick={handleLeaveHome} to="/Mission">
                  {t("mission")}
                </SubLink>
                <SubLink onClick={handleLeaveHome} to="/Method">
                  {t("method")}
                </SubLink>
              </SubLinks>
            )}
          </Li>
          <Li
            onMouseEnter={handleHoverServices}
            onMouseLeave={handleLeaveServices}
          >
            <StyledLink to="/">{t("services")}</StyledLink>
            {isHoveredServices && (
              <SubLinks>
                <SubLink
                  onMouseEnter={handleHoverManagement}
                  onMouseLeave={handleLeaveManagement}
                  onClick={handleLeaveServices}
                  to="/Management"
                >
                  {t("management")}
                </SubLink>
                {isHoveredManagement && (
                  <SubSubLinks
                    onMouseEnter={handleHoverManagement}
                    onMouseLeave={handleLeaveManagement}
                  >
                    <SubLink
                      onClick={handleLeaveServices}
                      to="/coaching-management"
                    >
                      {t("coaching")}
                    </SubLink>
                    <SubLink
                      onClick={handleLeaveServices}
                      to="/training-management"
                    >
                      {t("training")}
                    </SubLink>
                  </SubSubLinks>
                )}
                <SubLink onClick={handleLeaveServices} to="/marketing">
                  {t("marketing")}
                </SubLink>
                <SubLink onClick={handleLeaveServices} to="/reservation">
                  {t("reservation")}
                </SubLink>
              </SubLinks>
            )}
          </Li>
          <Li
            onMouseEnter={handleHoverRessources}
            onMouseLeave={handleLeaveRessources}
          >
            <StyledLink to="/">{t("Ressources")}</StyledLink>
            {isHoveredRessources && (
              <SubLinks>
                <SubLink onClick={handleLeaveRessources} to="/Training">
                  {t("training")}
                </SubLink>
                <SubLink onClick={handleLeaveRessources} to="Webinars">
                  {t("webinars")}
                </SubLink>
                <SubLink onClick={handleLeaveRessources} to="Blogue">
                  {t("blog")}
                </SubLink>
              </SubLinks>
            )}
          </Li>
          <ExpendUl
            className={isExpanded ? "expanded" : ""}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2em",
              transition: "max-width 5s ease-out",
              maxWidth: isExpanded ? "100em" : "0",
              overflow: "hidden",
            }}
          >
            <Li>
              {user ? (
                <LoginButton onClick={() => navigate("/profile")}>
                  {t("profile")}
                </LoginButton>
              ) : (
                <LoginButton
                  onClick={
                    () => navigate("/login")
                    // {
                    //   const accessToken = localStorage.getItem("access_token");
                    //   const idToken = localStorage.getItem("id_token");
                    //   console.log(accessToken);
                    //   console.log(idToken);
                    // }
                  }
                >
                  {t("login")}
                </LoginButton>
              )}
            </Li>
            <Li>
              <StyledLink to="/contact">{t("contact")}</StyledLink>
            </Li>
            <LanguageSelector
              value={i18n.language}
              onChange={(event) => handleTrans(event.target.value)}
            >
              {lngs.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.native}
                </option>
              ))}
            </LanguageSelector>
          </ExpendUl>

          <GiHamburgerMenu
            size={30}
            onMouseEnter={handleMouseEnter}
            style={{ cursor: "pointer" }}
          ></GiHamburgerMenu>
        </Ul>
      </Right>
    </Container>
  );
}

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: bold;
  margin: 0;
  font-size: x-large;

  &:hover {
    color: rgb(255, 175, 0);
    transform: scale(1.1);
  }
`;

const LoginButton = styled.h3`
  color: white;
  text-decoration: none;
  font-weight: bold;
  margin: 0;
  cursor: pointer;
  font-size: x-large;

  &:hover {
    color: rgb(255, 175, 0);
    transform: scale(1.1);
  }
`;

const ExpendUl = styled.div`
  display: flex;
`;

const StyledLogo = styled(Link)`
  width: 10%;
`;

const LanguageSelector = styled.select`
  height: fit-content;
  align-items: center;
  padding: 0.5em;
  border: none;
  border-radius: 0.5em;
  font-size: medium;
  background-color: rgb(255, 175, 0);
  color: black;

  &:active {
    border: none;
  }
`;

const Right = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 5%;
  margin-top: 1em;
`;

const Logo = styled.img`
  height: 11.4vh;
  width: 12.87vh;
`;

const Container = styled.div`
  padding: 1em 2em;
  background-color: black;
  color: white;
  display: flex;
  justify-content: space-between;
  height: 15vh;
  width: 100%;
  gap: 7%;
  box-sizing: border-box;
`;

const P = styled.p`
  height: 100%;
  transition-duration: 500ms;
  cursor: pointer;
  margin: 0;

  &:hover {
    color: green;
  }
`;

const Ul = styled.ul`
  width: 100%;
  height: fit-content;
  display: flex;
  gap: 2em;
  margin: 0;
  align-items: flex-end;

  justify-content: flex-end;
  // margin: auto;
  // align-items: center;
  // text-align: center;
  padding: 0;
`;

const Li = styled.li`
  // width: calc(100% / 5);
  height: fit-content;
  text-decoration: none;
  list-style: none;
  font-size: x-large;
  align-items: center;
  text-align: center;
  margin: 0;
  position: relative;
`;

const SubLinks = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.5em 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  z-index: 1;
`;
const SubSubLinks = styled.div`
  position: absolute;
  top: 0%;
  left: 90%;
  transform: translate(0%, 0);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.5em 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  z-index: 1;
`;

const SubLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    color: rgb(255, 175, 0);
    transform: scale(1.1);
  }
`;

export default Header;
