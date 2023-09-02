import "./App.css";
import Header from "../components/Header.js";
import Main from "../components/Main";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contact from "../components/Contact";
import Coaching from "../components/Coaching";
import Training from "../components/Training";
import Webinars from "../components/Webinars";
import Reservations from "../components/Reservations";
import Login from "../components/Login";
import CoachingManagement from "../components/Coaching-management";
import TrainingManagement from "../components/Training-management";
import Marketing from "../components/Marketing";
import WelcomePage from "../components/WelcomePage";
import Profile from "../components/Profile";
  
function App() {
  const { t, i18n } = useTranslation();

  return (
    <BrowserRouter>
      <Root>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/coaching" element={<Coaching />} />
          <Route path="/coaching-management" element={<CoachingManagement />} />
          <Route path="/training" element={<Training />} />
          <Route path="/training-management" element={<TrainingManagement />} />
          <Route path="/webinars" element={<Webinars />} />
          <Route path="/marketing" element={<Marketing />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/login" element={<Login />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Root>
    </BrowserRouter>
  );
}

const Root = styled.div`
  text-align: center;
  width: 100%;
  height: 100%;
  background-color: black;
  min-height: 100vh;
`;

export default App;
