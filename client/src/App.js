// import basics
import { Routes, Route } from "react-router-dom";

// import components
import GlobalStyle from "./styles/GlobalStyle";
import Header from "./components/Header";
import Home from "./components/Home";
import NotFound from "./components/NotFound";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;