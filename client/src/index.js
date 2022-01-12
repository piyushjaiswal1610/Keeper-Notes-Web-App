import React from "react";
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import SignupLogin from "./components/SignupLogin";
import App from "./components/App";


const rootElement = document.getElementById("root");

render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignupLogin />} />
        <Route path="/notes" element={<App />} />
      </Routes>
    </BrowserRouter>,
    rootElement
  );
