import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ReactGA from "react-ga4";

import { GlobalContextProvider } from "context";
import { SimAtlas, FAQ } from "views";
import DisclaimerPopup from "views/DisclaimerPopup";
import "assets/style/App.css";

const App = () => {
  ReactGA.initialize(process.env.REACT_APP_GA_ID);

  return (
    <GlobalContextProvider>
      <BrowserRouter basename={process.env.REACT_APP_BASE_NAME}>
    	<DisclaimerPopup />
        <Routes>
          <Route path="/" exact element={<SimAtlas />} />
          <Route path="/faq" exact element={<FAQ />} />
        </Routes>
      </BrowserRouter>
    </GlobalContextProvider>
  );
};

export default App;
